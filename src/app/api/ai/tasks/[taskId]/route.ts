import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ taskId: string }> },
) {
  const { taskId } = await params;

  const { data, error } = await supabaseServer
    .from("ai_tasks")
    .select("status, result_analysis, reasoning_process, topic_map, temp_case_id, created_at, request_payload")
    .eq("task_id", taskId)
    .single();

  if (error) {
    console.error("查询任务失败:", error);
    return NextResponse.json(
      { success: false, message: "任务不存在" },
      { status: 404 },
    );
  }

  if (!data) {
    return NextResponse.json(
      { success: false, message: "任务不存在" },
      { status: 404 },
    );
  }

  const statusMap: Record<string, string> = {
    pending: "PENDING",
    processing: "RUNNING",
    completed: "SUCCESS",
    failed: "FAILED",
    cancelled: "CANCELLED",
  };

  return NextResponse.json({
    success: data.status === "completed",
    status: statusMap[data.status] || data.status,
    result_analysis: data.result_analysis || "",
    reasoning_process: data.reasoning_process || "",
    topic_map: data.topic_map || {},
    temp_case_id: data.temp_case_id || "",
    created_at: data.created_at,
    request_payload: data.request_payload,
  });
}

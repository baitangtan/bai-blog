import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ taskId: string }> },
) {
  const { taskId } = await params;

  await supabaseServer
    .from("ai_tasks")
    .update({ status: "cancelled", updated_at: new Date().toISOString() })
    .eq("task_id", taskId);

  return NextResponse.json({ success: true, message: "任务已取消" });
}

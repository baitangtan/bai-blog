import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const body = await request.json();
  const taskId = crypto.randomUUID();

  const { error } = await supabaseServer.from("ai_tasks").insert({
    task_id: taskId,
    biz_type: body.biz_type || "liuyao",
    status: "pending",
    request_payload: body,
  });

  if (error) {
    console.error("Create task error:", error);
    return NextResponse.json(
      { success: false, message: "创建任务失败" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, task_id: taskId });
}

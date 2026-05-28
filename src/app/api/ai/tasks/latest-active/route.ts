import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const bizType = url.searchParams.get("biz_type") || "liuyao";

  const { data, error } = await supabaseServer
    .from("ai_tasks")
    .select("*")
    .eq("biz_type", bizType)
    .in("status", ["pending", "processing"])
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return NextResponse.json({ task: null });
  }

  const statusMap: Record<string, string> = {
    pending: "PENDING",
    processing: "RUNNING",
  };

  return NextResponse.json({
    task: {
      ...data,
      status: statusMap[data.status] || data.status,
    },
  });
}

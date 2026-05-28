import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { data, error } = await supabaseServer
    .from("liuyao_cases")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { success: false, message: "卦例不存在" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, case: data });
}

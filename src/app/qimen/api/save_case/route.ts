import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabaseServer
    .from("liuyao_cases")
    .insert({
      question: body.question,
      querent: body.querent,
      created_at: body.created_at || new Date().toISOString(),
      time: body.time,
      reasoning_process: body.reasoning_process,
      result_analysis: body.result_analysis,
      base_guaxiang: body.base_guaxiang,
      markdown_guaxiang: body.markdown_guaxiang,
      topic_map: body.topic_map || {},
      rating: body.rating ?? 8.0,
      is_public: body.is_public ?? false,
      temp_case_id: body.temp_case_id,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json(
      { success: false, message: "保存失败" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, case_id: data.id });
}

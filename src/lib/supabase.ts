import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Message = {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
  is_approved: boolean;
};

export async function getMessages() {
  const { data } = await supabase
    .from("messages")
    .select("id, nickname, content, created_at")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(50);

  return (data ?? []) as Message[];
}

export async function postMessage(nickname: string, content: string) {
  const { error } = await supabase
    .from("messages")
    .insert({ nickname: nickname || "匿名", content, is_approved: false });

  if (error) throw error;
}

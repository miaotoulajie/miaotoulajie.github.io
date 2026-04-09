import { supabaseClient } from "@/infrastructure/supabaseClient";

const MESSAGE_TABLE = "messages";

export async function listMessages({ limit = 50 } = {}) {
  const { data, error } = await supabaseClient
    .from(MESSAGE_TABLE)
    .select("id, username, content, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createMessage({ username, content }) {
  const { data, error } = await supabaseClient
    .from(MESSAGE_TABLE)
    .insert([{ username, content }])
    .select("id, username, content, created_at")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

import type { AppLanguage } from "@/i18n/types";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ApiMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type GroqResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-120b";

export function getGroqConfig() {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
  const model = (import.meta.env.VITE_GROQ_MODEL as string | undefined) || DEFAULT_MODEL;
  return { apiKey, model };
}

function getLanguageInstruction(language: AppLanguage) {
  if (language === "en") {
    return "Always answer in English, regardless of the user's input language.";
  }

  return "Responde siempre en espanol, independientemente del idioma del usuario.";
}

export async function requestGroqReply(messages: ChatMessage[], language: AppLanguage) {
  const { apiKey, model } = getGroqConfig();

  if (!apiKey) {
    throw new Error("Missing VITE_GROQ_API_KEY in .env");
  }

  const apiMessages: ApiMessage[] = [
    {
      role: "system",
      content: getLanguageInstruction(language),
    },
    ...messages,
  ];

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: apiMessages,
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Groq request failed");
  }

  const data = (await response.json()) as GroqResponse;
  const assistantText = data?.choices?.[0]?.message?.content?.trim();

  if (!assistantText) {
    throw new Error("Groq returned no content");
  }

  return assistantText;
}

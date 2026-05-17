import type { AppLanguage } from "@/i18n/types";
import { requestGroqReply } from "@/utils/groq";
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

type RegexPayload = {
  regex: string;
  explanation: {
    summary: string;
    tokenBreakdown: string[];
    anchorsAndFlags: string;
    edgeCases: string[];
    performanceNotes: string;
    redosRisk: string;
  };
  validExamples: string[];
  invalidExamples: string[];
};

export function useRegexGenerator() {
  const { t, locale } = useI18n();

  const prompt = ref("");
  const testInput = ref("dev.engineer@gmail.com");
  const isLoading = ref(false);
  const errorMessage = ref("");

  const generated = reactive<RegexPayload>({
    regex: "/^[a-zA-Z0-9._%+-]+@gmail\\.com$/",
    explanation: {
      summary: t("home.output.logic"),
      tokenBreakdown: [
        "^ and $ anchor the regex to the full input.",
        "[a-zA-Z0-9._%+-]+ matches one or more valid local-part chars.",
        "@gmail\\.com requires the literal gmail.com domain.",
      ],
      anchorsAndFlags: "Uses full-string anchors and no flags.",
      edgeCases: [
        "Rejects empty local parts like @gmail.com.",
        "Rejects non-gmail domains.",
      ],
      performanceNotes: "Linear-time pattern with no nested quantifiers.",
      redosRisk: "Low risk for catastrophic backtracking.",
    },
    validExamples: ["user.name@gmail.com", "regex_pro123@gmail.com"],
    invalidExamples: ["test@outlook.com", "@gmail.com"],
  });

  const compiledRegex = computed(() => {
    const match = generated.regex.match(/^\/(.*)\/([a-z]*)$/);
    if (!match) return null;

    try {
      return new RegExp(match[1], match[2]);
    } catch {
      return null;
    }
  });

const isMatch = computed(() => {
  if (!compiledRegex.value || !testInput.value) return false;

  const flags = compiledRegex.value.flags.replace(/[gy]/g, "");
  const safeRegex = new RegExp(compiledRegex.value.source, flags);
  return safeRegex.test(testInput.value);
});

  function getRequestPrompt(input: string) {
    return [
      "Generate a regex based on the user request.",
      "Explanation style must be mixed: technically precise and easy for intermediate developers.",
      "Return ONLY valid JSON with this exact shape:",
      '{"regex":"/pattern/flags","explanation":{"summary":"string","tokenBreakdown":["string"],"anchorsAndFlags":"string","edgeCases":["string"],"performanceNotes":"string","redosRisk":"string"},"validExamples":["a","b"],"invalidExamples":["x","y"]}',
      "Do not include markdown or extra text.",
      `User request: ${input}`,
    ].join("\n");
  }

  function parsePayload(text: string): RegexPayload {
    const parsed = parseModelJson(text) as Partial<RegexPayload>;
    if (!parsed.regex || !parsed.explanation || typeof parsed.explanation !== "object") {
      throw new Error(t("home.errors.requestFailed"));
    }

    const explanationRaw = parsed.explanation as Partial<RegexPayload["explanation"]>;

    return {
      regex: parsed.regex,
      explanation: {
        summary: explanationRaw.summary || t("home.errors.requestFailed"),
        tokenBreakdown: Array.isArray(explanationRaw.tokenBreakdown) && explanationRaw.tokenBreakdown.length > 0
          ? explanationRaw.tokenBreakdown
          : [t("home.output.defaultTokenBreakdown")],
        anchorsAndFlags: explanationRaw.anchorsAndFlags || t("home.output.defaultAnchorsFlags"),
        edgeCases: Array.isArray(explanationRaw.edgeCases) && explanationRaw.edgeCases.length > 0
          ? explanationRaw.edgeCases
          : [t("home.output.defaultEdgeCases")],
        performanceNotes: explanationRaw.performanceNotes || t("home.output.defaultPerformanceNotes"),
        redosRisk: explanationRaw.redosRisk || t("home.output.defaultRedosRisk"),
      },
      validExamples: Array.isArray(parsed.validExamples) && parsed.validExamples.length > 0 ? parsed.validExamples : ["sample@example.com"],
      invalidExamples: Array.isArray(parsed.invalidExamples) && parsed.invalidExamples.length > 0 ? parsed.invalidExamples : ["invalid"],
    };
  }

  function parseModelJson(text: string) {
    const normalized = text.trim();

    try {
      return JSON.parse(normalized);
    } catch {
      const extracted = extractJsonObject(normalized);
      if (!extracted) {
        throw new Error(t("home.errors.requestFailed"));
      }

      try {
        return JSON.parse(extracted);
      } catch {
        const repaired = repairInvalidEscapes(extracted);
        return JSON.parse(repaired);
      }
    }
  }

  function extractJsonObject(text: string) {
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      return "";
    }

    return text.slice(firstBrace, lastBrace + 1);
  }

  function repairInvalidEscapes(text: string) {
    return text.replace(/(?<!\\)\\(?!["\\/bfnrtu])/g, "\\\\");
  }

async function generateRegex() {
    if (isLoading.value) {
      return;
    }

    const input = prompt.value.trim();
    if (!input) {
      errorMessage.value = t("home.errors.emptyPrompt");
      return;
    }

    errorMessage.value = "";
    isLoading.value = true;

    try {
      const responseText = await requestGroqReply(
        [{ role: "user", content: getRequestPrompt(input) }],
        locale.value as AppLanguage,
      );

      const payload = parsePayload(responseText);
      const match = payload.regex.match(/^\/(.*)\/([a-z]*)$/);
      if (!match) {
        throw new Error(t("home.errors.invalidRegex"));
      }

      generated.regex = payload.regex;
      generated.explanation = payload.explanation;
      generated.validExamples = payload.validExamples;
      generated.invalidExamples = payload.invalidExamples;
      prompt.value = "";
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : t("home.errors.requestFailed");
    } finally {
      isLoading.value = false;
    }
  }

  async function copyRegex() {
    await navigator.clipboard.writeText(generated.regex);
  }

  async function copyJson() {
    await navigator.clipboard.writeText(JSON.stringify(generated, null, 2));
  }

  return {
    prompt,
    testInput,
    isLoading,
    errorMessage,
    generated,
    isMatch,
    generateRegex,
    copyRegex,
    copyJson,
  };
}

<template>
  <div class="glass-card reflective-edge overflow-hidden rounded-xl">
    <div
      class="flex flex-col items-start justify-between gap-sm border-b border-white/10 bg-white/5 px-md py-sm sm:flex-row sm:items-center"
    >
      <span
        class="font-label-mono text-label-mono uppercase tracking-wider text-on-surface-variant"
        >{{ t("home.output.title") }}</span
      >
      <div class="flex gap-sm">
        <button
          class="rounded-md p-1.5 cursor-pointer text-on-surface-variant transition-colors hover:bg-white/10"
          :title="t('home.actions.copyRegex')"
          @click="$emit('copy-regex')"
        >
          <span class="material-symbols-outlined text-[20px]"
            >content_copy</span
          >
        </button>
        <button
          class="rounded-md p-1.5 cursor-pointer text-on-surface-variant transition-colors hover:bg-white/10"
          :title="t('home.actions.copyJson')"
          @click="$emit('copy-json')"
        >
          <span class="material-symbols-outlined text-[20px]">data_object</span>
        </button>
      </div>
    </div>
    <div class="bg-[#020203] p-xl">
      <code class="block break-all font-code-block text-headline-md">{{
        regex
      }}</code>
    </div>
    <div class="space-y-md border-t border-white/5 p-lg">
      <h3 class="font-headline-md text-headline-md text-primary">
        {{ t("home.output.logicTitle") }}
      </h3>
      <p
        class="font-body-md text-body-md leading-relaxed text-on-surface-variant"
      >
        {{ explanation.summary }}
      </p>

      <div
        class="space-y-sm rounded-lg border border-white/10 bg-black/20 p-md"
      >
        <p class="font-label-mono text-label-mono text-on-surface">
          {{ t("home.output.tokenBreakdown") }}
        </p>
        <ul
          class="list-disc space-y-xs pl-lg font-body-md text-body-md text-on-surface-variant"
        >
          <li v-for="item in explanation.tokenBreakdown" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="grid grid-cols-1 gap-md md:grid-cols-2">
        <div class="rounded-lg border border-white/10 bg-black/20 p-md">
          <p class="mb-xs font-label-mono text-label-mono text-on-surface">
            {{ t("home.output.anchorsAndFlags") }}
          </p>
          <p class="font-body-md text-body-md text-on-surface-variant">
            {{ explanation.anchorsAndFlags }}
          </p>
        </div>
        <div class="rounded-lg border border-white/10 bg-black/20 p-md">
          <p class="mb-xs font-label-mono text-label-mono text-on-surface">
            {{ t("home.output.performanceNotes") }}
          </p>
          <p class="font-body-md text-body-md text-on-surface-variant">
            {{ explanation.performanceNotes }}
          </p>
        </div>
      </div>

      <div class="rounded-lg border border-white/10 bg-black/20 p-md">
        <p class="mb-xs font-label-mono text-label-mono text-on-surface">
          {{ t("home.output.edgeCases") }}
        </p>
        <ul
          class="list-disc space-y-xs pl-lg font-body-md text-body-md text-on-surface-variant"
        >
          <li v-for="item in explanation.edgeCases" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div class="rounded-lg border border-white/10 bg-black/20 p-md">
        <p class="mb-xs font-label-mono text-label-mono text-on-surface">
          {{ t("home.output.redosRisk") }}
        </p>
        <p class="font-body-md text-body-md text-on-surface-variant">
          {{ explanation.redosRisk }}
        </p>
      </div>

      <p v-if="errorMessage" class="font-body-md text-body-md text-red-300">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

defineProps<{
  regex: string;
  explanation: {
    summary: string;
    tokenBreakdown: string[];
    anchorsAndFlags: string;
    edgeCases: string[];
    performanceNotes: string;
    redosRisk: string;
  };
  errorMessage: string;
}>();

defineEmits<{
  (e: "copy-regex"): void;
  (e: "copy-json"): void;
}>();

const { t } = useI18n();
</script>

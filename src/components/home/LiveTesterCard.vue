<template>
  <div
    class="glass-card reflective-edge rounded-xl border border-primary/20 bg-primary/5 p-lg"
  >
    <div class="mb-lg flex items-center gap-sm">
      <span class="material-symbols-outlined text-primary">experiment</span>
      <h3 class="font-headline-md text-headline-md">
        {{ t("home.tester.title") }}
      </h3>
    </div>
    <div class="space-y-md">
      <div>
        <label
          class="mb-sm block font-label-mono text-label-mono text-on-surface-variant"
          >{{ t("home.tester.label") }}</label
        >
        <input
          :value="modelValue"
          class="w-full rounded-lg border border-white/10 bg-black/60 px-md py-3 font-code-block text-body-md transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          type="text"
          @input="onInput"
        />
      </div>
      <div
        class="flex flex-col items-start gap-sm rounded-lg border p-md sm:flex-row sm:items-center sm:justify-between"
        :class="
          isMatch
            ? 'border-green-500/20 bg-green-500/10'
            : 'border-red-500/20 bg-red-500/10'
        "
      >
        <div
          class="flex items-center gap-sm font-medium"
          :class="isMatch ? 'text-green-400' : 'text-red-400'"
        >
          <span class="material-symbols-outlined">{{
            isMatch ? "task_alt" : "cancel"
          }}</span>
          {{ isMatch ? t("home.tester.result") : t("home.matches.fail") }}
        </div>
        <span
          class="font-label-mono text-label-mono"
          :class="isMatch ? 'text-green-400' : 'text-red-400'"
          >{{ isMatch ? t("home.tester.count") : "0" }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

defineProps<{
  modelValue: string;
  isMatch: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const { t } = useI18n();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

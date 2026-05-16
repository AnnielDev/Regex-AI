<template>
  <section class="mb-xl text-center">
    <h1
      class="mb-md bg-linear-to-b from-white to-white/60 bg-clip-text font-display text-4xl text-transparent sm:text-display"
    >
      {{ t("home.hero.title") }}
    </h1>
    <p
      class="mx-auto mb-xl max-w-2xl font-body-lg text-body-lg text-on-surface-variant"
    >
      {{ t("home.hero.description") }}
    </p>

    <div class="group relative mx-auto max-w-3xl">
      <div
        class="absolute -inset-1 rounded-xl bg-linear-to-r from-primary/20 to-secondary/20 opacity-50 blur-xl transition duration-500 group-focus-within:opacity-100"
      ></div>
      <div class="glass-card relative rounded-xl p-xs">
        <textarea
          class="min-h-[160px] w-full resize-none rounded-lg border-none bg-black/40 p-md font-body-lg text-body-lg placeholder:text-on-surface-variant/40 focus:ring-0"
          :value="modelValue"
          :placeholder="t('home.hero.placeholder')"
          @input="onInput"
          @keydown="onKeydown"
        ></textarea>
        <div class="flex justify-end border-t border-white/5 p-sm">
          <button
            class="primary-glow flex w-full cursor-pointer items-center justify-center gap-sm rounded-lg bg-primary px-lg py-3 font-label-mono text-label-mono font-bold text-on-primary transition-all disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-xl"
            :disabled="isLoading"
            @click="$emit('submit')"
          >
            <span class="material-symbols-outlined">auto_awesome</span>
            {{
              isLoading ? t("home.hero.generating") : t("home.hero.generate")
            }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{
  modelValue: string;
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "submit"): void;
}>();

const { t } = useI18n();

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
};

const onKeydown = (event: KeyboardEvent) => {
  if (props.isLoading) {
    return;
  }

  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    emit("submit");
  }
};
</script>

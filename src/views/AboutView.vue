<template>
  <main class="mx-auto max-w-container-max px-gutter pb-xl pt-32">
    <section class="glass-card reflective-edge rounded-xl p-xl">
      <h1 class="mb-md font-display text-headline-md font-bold text-on-surface">{{ t("about.title") }}</h1>
      <p class="font-body-md text-body-md text-on-surface-variant">{{ t("about.description") }}</p>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

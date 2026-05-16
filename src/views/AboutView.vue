<template>
  <main class="mx-auto max-w-container-max px-gutter pb-xl pt-32">
    <section class="glass-card reflective-edge rounded-xl p-xl">
      <h1 class="mb-sm font-display text-headline-md font-bold text-on-surface">
        {{ t("about.title") }}
      </h1>
      <p class="mb-lg font-body-md text-body-md text-on-surface-variant">
        {{ t("about.description") }}
      </p>

      <div class="grid grid-cols-1 gap-md md:grid-cols-2">
        <article class="rounded-lg border border-white/10 bg-black/20 p-md">
          <h2 class="mb-xs font-label-mono text-label-mono text-primary">
            {{ t("about.blocks.inputTitle") }}
          </h2>
          <p class="font-body-md text-body-md text-on-surface-variant">
            {{ t("about.blocks.inputBody") }}
          </p>
        </article>

        <article class="rounded-lg border border-white/10 bg-black/20 p-md">
          <h2 class="mb-xs font-label-mono text-label-mono text-primary">
            {{ t("about.blocks.generationTitle") }}
          </h2>
          <p class="font-body-md text-body-md text-on-surface-variant">
            {{ t("about.blocks.generationBody") }}
          </p>
        </article>

        <article class="rounded-lg border border-white/10 bg-black/20 p-md">
          <h2 class="mb-xs font-label-mono text-label-mono text-primary">
            {{ t("about.blocks.validationTitle") }}
          </h2>
          <p class="font-body-md text-body-md text-on-surface-variant">
            {{ t("about.blocks.validationBody") }}
          </p>
        </article>

        <article class="rounded-lg border border-white/10 bg-black/20 p-md">
          <h2 class="mb-xs font-label-mono text-label-mono text-primary">
            {{ t("about.blocks.iterationTitle") }}
          </h2>
          <p class="font-body-md text-body-md text-on-surface-variant">
            {{ t("about.blocks.iterationBody") }}
          </p>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

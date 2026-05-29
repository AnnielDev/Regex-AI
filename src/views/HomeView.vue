<template>
  <div class="selection:bg-primary/30">
    <main
      class="mx-auto max-w-container-max px-4 pb-xl pt-36 sm:px-gutter md:pt-32"
    >
      <!-- Google AdSense Banner -->
      <AdSenseAd slot="8370637289" format="horizontal" placement="home-top" />

      <HeroPrompt
        v-model="prompt"
        :is-loading="isLoading"
        @submit="generateRegex"
      />

      <section class="grid grid-cols-1 gap-xl lg:grid-cols-12">
        <div class="space-y-lg lg:col-span-8">
          <OutputCard
            :regex="generated.regex"
            :explanation="generated.explanation"
            :error-message="errorMessage"
            @copy-regex="copyRegex"
            @copy-json="copyJson"
          />

          <div class="grid grid-cols-1 gap-lg md:grid-cols-2">
            <ExamplesCard
              :title="t('home.matches.valid')"
              icon="check_circle"
              icon-color="text-green-400"
              text-color="text-green-200/70"
              badge-class="border-green-500/20 bg-green-500/10 text-green-400"
              :badge-text="t('home.matches.match')"
              :samples="generated.validExamples"
            />

            <ExamplesCard
              :title="t('home.matches.invalid')"
              icon="cancel"
              icon-color="text-red-400"
              text-color="text-red-200/70"
              badge-class="border-red-500/20 bg-red-500/10 text-red-400"
              :badge-text="t('home.matches.fail')"
              :samples="generated.invalidExamples"
            />
          </div>
        </div>

        <div class="space-y-lg lg:col-span-4">
          <LiveTesterCard v-model="testInput" :is-match="isMatch" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import AdSenseAd from "@/components/AdSenseAd.vue";
import ExamplesCard from "@/components/home/ExamplesCard.vue";
import HeroPrompt from "@/components/home/HeroPrompt.vue";
import LiveTesterCard from "@/components/home/LiveTesterCard.vue";
import OutputCard from "@/components/home/OutputCard.vue";
import { useRegexGenerator } from "@/composables/useRegexGenerator";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const {
  prompt,
  testInput,
  isLoading,
  errorMessage,
  generated,
  isMatch,
  generateRegex,
  copyRegex,
  copyJson,
} = useRegexGenerator();
</script>

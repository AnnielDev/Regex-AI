<template>
  <div class="min-h-screen bg-background text-on-background">
    <nav class="fixed top-0 z-50 w-full border-b border-white/10 bg-surface/60 backdrop-blur-xl">
      <div class="mx-auto flex max-w-container-max items-center justify-between px-gutter py-4">
        <div class="flex items-center gap-md">
          <img :src="logo" alt="RegexAI Logo" class="h-8 w-8 rounded-lg" />
          <span class="font-display text-headline-md font-bold tracking-tight text-on-surface">RegexAI</span>
        </div>

        <div class="hidden items-center gap-xl md:flex">
          <RouterLink
            v-for="route in navRoutes"
            :key="route.to"
            :to="route.to"
            class="font-label-mono text-label-mono text-on-surface-variant transition-colors duration-200 hover:text-on-surface"
            exact-active-class="border-b-2 border-primary pb-1 font-medium text-primary"
          >
            {{ route.label }}
          </RouterLink>
        </div>

        <div class="flex items-center gap-md">
          <button class="material-symbols-outlined rounded-lg p-2 text-on-surface-variant transition-all duration-300 hover:bg-white/5">terminal</button>
          <div class="hidden items-center gap-xs rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:flex">
            <span class="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
            <span class="font-label-mono text-label-mono">{{ t("layout.status") }}</span>
          </div>
          <div class="flex items-center rounded-lg border border-white/10 bg-white/5 p-1">
            <button
              v-for="lang in locales"
              :key="lang"
              class="rounded px-2 py-1 font-label-mono text-label-mono uppercase"
              :class="locale === lang ? 'bg-primary/25 text-primary' : 'text-on-surface-variant'"
              @click="setLocale(lang)"
            >
              {{ lang }}
            </button>
          </div>
          <button class="primary-glow rounded-lg bg-primary px-gutter py-2 font-label-mono text-label-mono font-medium text-on-primary transition-transform active:scale-95">
            {{ t("layout.copyTool") }}
          </button>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import logo from "@/assets/logo.png";
import { LOCALE_STORAGE_KEY, SUPPORTED_LOCALES } from "@/i18n";
import type { AppLanguage } from "@/i18n/types";
import { useI18n } from "vue-i18n";
import { RouterLink, RouterView } from "vue-router";

const { t, locale } = useI18n();

const navRoutes = computed(() => [
  { to: "/", label: t("layout.nav.home") },
  { to: "/about", label: t("layout.nav.about") },
]);

const locales = SUPPORTED_LOCALES;

const setLocale = (nextLocale: AppLanguage) => {
  locale.value = nextLocale;
  window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
};
</script>

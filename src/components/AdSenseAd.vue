<template>
  <div class="mb-lg flex justify-center">
    <ins
      class="adsbygoogle"
      :data-ad-client="`ca-${publisherId}`"
      :data-ad-slot="slot"
      :data-ad-format="format"
      data-full-width-responsive="true"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { initAdSense, pushAd } from "@/composables/useAdSense";

interface Props {
  slot: string;
  format?: string;
  placement?: string;
}

const props = withDefaults(defineProps<Props>(), {
  format: "horizontal",
  placement: "home-top",
});

const publisherId = computed(() => {
  return import.meta.env.VITE_ADSENSE_PUBLISHER_ID as string | undefined;
});

onMounted(() => {
  if (!publisherId.value) {
    console.warn(
      "AdSense Publisher ID not configured. Set VITE_ADSENSE_PUBLISHER_ID in .env",
    );
    return;
  }

  // Initialize AdSense script (lazy load on first mount)
  initAdSense();

  // Push this ad to be processed
  pushAd();
});
</script>

<style scoped>
/* Ensure ad container doesn't break layout */
ins.adsbygoogle {
  display: inline-block;
}
</style>

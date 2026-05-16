<template>
  <div class="glass-card reflective-edge rounded-xl p-lg">
    <h4
      class="mb-md flex items-center gap-sm font-label-mono text-label-mono text-on-surface-variant"
    >
      <span class="material-symbols-outlined" :class="iconColor">{{
        icon
      }}</span>
      {{ title }}
    </h4>
    <ul class="space-y-sm font-code-block text-body-md">
      <li
        v-for="sample in samples"
        :key="sample"
        class="flex items-center justify-between border-b border-white/5 py-1"
        :class="textColor"
      >
        {{ sample }}
        <span
          class="rounded-full border px-2 text-[10px]"
          :class="badgeClass"
          >{{ badgeText }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
  iconColor: string;
  textColor: string;
  badgeClass: string;
  badgeText: string;
  samples: string[];
}>();
</script>

<script setup lang="ts">
  const props = defineProps<{
    title: string
  }>()
</script>

<template>
  <v-row>
    <v-col>
      <h3 class="text-h4 text-teal-lighten-3">{{ props.title }}</h3>
      <hr class="text-teal-lighten-3" />
    </v-col>
  </v-row>
</template>

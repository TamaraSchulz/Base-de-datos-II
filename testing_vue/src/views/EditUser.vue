<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import PageHeader from '@/components/PageHeader.vue'

  const route = useRoute()
</script>

<template>
  <v-container>
    <PageHeader title="Editar Usuario" />
  </v-container>
</template>

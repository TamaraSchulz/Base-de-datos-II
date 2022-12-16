<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useTokenStore } from '@/stores/token'
  import { checkRoutePermission } from '@/utilities'

  const tokenStore = useTokenStore()
  const router = useRouter()

  async function logout() {
    tokenStore.clearData()
    await router.push({ name: 'Login' })
  }

  async function changePassword() {
    await router.push({ name: 'ChangePassword' })
  }

  console.log(checkRoutePermission('ListUsers'))
</script>

<template>
  <v-app>
    <v-app-bar v-if="tokenStore.isAuthenticated" class="bg-teal-darken-1">
      <v-toolbar-title>
        <span class="mr-12">MyApp</span>
        <v-btn :to="{ name: 'Home' }">Inicio</v-btn>
        <v-btn
          v-show="checkRoutePermission('ListUsers')"
          :to="{ name: 'ListUsers' }"
          >Usuarios</v-btn
        >
        <v-btn
          v-show="checkRoutePermission('ChangePassword')"
          :to="{ name: 'ChangePassword' }"
          >Cambiar Contraseña</v-btn
        >
      </v-toolbar-title>
      <span class="mx-3">Hola, {{ tokenStore.user?.fullname }}</span>
      <v-btn variant="tonal" @click="logout">Cerrar sesion</v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-5">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped></style>

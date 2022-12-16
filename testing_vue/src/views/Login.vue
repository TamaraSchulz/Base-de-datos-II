<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { login } from '@/api/auth'
  import { useTokenStore } from '@/stores/token'
  import { useRouter } from 'vue-router'
  import { getUserMe } from '@/api/users'

  const tokenStore = useTokenStore()
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const loading = ref(false)

  const router = useRouter()

  const loginEnabled = computed(() => {
    return username.value.length > 0 && password.value.length > 0
  })

  async function sendLogin() {
    try {
      errorMessage.value = ''
      loading.value = true
      const token = await login(username.value, password.value)
      tokenStore.setToken(token.accessToken, token.tokenType)

      const user = await getUserMe()
      tokenStore.setUser(user)

      router.push({ name: 'Home' })
    } catch (error: any) {
      errorMessage.value = `ERROR: ${error.message}`
    } finally {
      loading.value = false
    }
  }

  // logouts to clear user data
  tokenStore.clearData()
</script>

<template>
  <v-container fluid class="d-flex fill-height bg-teal-lighten-3">
    <v-row align="center" justify="center">
      <v-col cols="3">
        <v-card class="px-6 py-8">
          <v-form>
            <v-text-field
              prepend-inner-icon="mdi-account"
              label="Usuario"
              v-model="username"
            >
            </v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-lock"
              type="password"
              label="Contraseña"
              v-model="password"
            >
            </v-text-field>
          </v-form>
          <div v-if="errorMessage">
            <v-alert
              type="error"
              density="compact"
              variant="tonal"
              class="mb-2"
            >
              {{ errorMessage }}
            </v-alert>
          </div>
          <v-card-actions class="pa-0">
            <v-btn
              block
              variant="flat"
              color="teal"
              size="large"
              :loading="loading"
              :disabled="!loginEnabled"
              @click="sendLogin"
            >
              Ingresar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

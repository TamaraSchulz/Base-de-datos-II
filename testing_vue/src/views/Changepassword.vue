<script setup lang="ts">
  import { changePasswordMe } from '../api/users'
  import { Ref, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ChangePassword } from '../interfaces'
  import PageHeader from '../components/PageHeader.vue'

  const router = useRouter()
  const passwordForm: ChangePassword = {} as ChangePassword
  const confirmPassword = ref('')
  const errorMessage = ref('')
  const loading = ref(false)
  const showPassword: Ref<boolean> = ref(false)

  async function changePassword() 
  {
    loading.value = true
    if (passwordForm.oldPassword === passwordForm.newPassword) 
    {
      errorMessage.value = 'La contraseña antigua y la nueva son las mismas, por favor cambie la contraseña'
    } 
        else if (passwordForm.newPassword !== confirmPassword.value) 
        {
            errorMessage.value = 'Las contraseñas no coinciden, intente de nuevo'
        } else 
            {
                try
                {
                    loading.value = true
                    const changePassword = await changePasswordMe(passwordForm)
                    router.push({ name: 'Home' })
                }
                catch (error: any) 
                {
                    errorMessage.value = 'La contraseña no es la correcta'
                    console.error(error)
                }
                finally 
                {
                    loading.value = false
                }
            }
    }    
      
    
</script>

<template>
  <v-container>
    <PageHeader title="Cambiar Contraseña" />
    <v-row justify="center" class="mt-6">
      <v-col cols="6">
        <v-form ref="form">
          <v-text-field
            v-model="passwordForm.oldPassword"
            label="Contraseña Antigua"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            v-model="passwordForm.newPassword"
            label="Contraseña Nueva"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            label="Confirmar Contraseña"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            prepend-inner-icon="mdi-lock"
            @click:append-inner="showPassword = !showPassword"
          ></v-text-field>

          <div v-if="errorMessage">
            <v-alert
                type="error"
                class="mb-2"
                density="compact"
                variant="tonal"
            >
                {{ errorMessage }}
            </v-alert>
        </div>
          <v-btn
            color="primary"
            class="mr-4"
            :loading="loading"
            @click="changePassword"
          >
            Guardar Contraseña
          </v-btn>

          <v-btn :to="{name: 'Home' }" color="black" class="mr-4">
            Cancelar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

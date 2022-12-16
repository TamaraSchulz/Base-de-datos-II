<script setup lang="ts">
  import PageHeader from '@/components/PageHeader.vue'
  import { reactive, Ref, ref } from 'vue'
  import { getGroups, postUser, getUsers } from '@/api/users'
  import { Group, NewUser, User } from '@/interfaces'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const newUserData: NewUser = reactive({
    username: '',
    fullname: '',
    password: '',
    age: null,
    groupIds: [],
  })
  const groups: Ref<Group[]> = ref([])
  const showPassword: Ref<boolean> = ref(false)

  const form: Ref<any> = ref(null)
  const valid: Ref<boolean> = ref(false)
  const errorMessage = ref('')
  const rules = {
    user: [(v: string) => !!v || 'El usuario es requerido'],
    fullname: [(v: string) => !!v || 'El nombre es requerido'],
    password: [(v: string) => !!v || 'La contraseña es requerida'],
  }

  async function fetchGroups() {
    groups.value = await getGroups()
  }

  async function submitNewUser() {
    const { valid } = await form.value.validate()

    if (valid) {
      try {
        const createdUser = await postUser(newUserData)
        console.info('Created user', createdUser)
        router.push({ name: 'ListUsers' })
      } catch (error: any) {
        errorMessage.value = 'Usuario ya existe'
        console.error(error)
      }
    }
  }

  fetchGroups()
</script>

<template>
  <v-container>
    <PageHeader title="Nuevo Usuario" />
    <v-row justify="center" class="mt-6">
      <v-col cols="6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="newUserData.username"
            label="Usuario"
            :rules="rules.user"
          ></v-text-field>
          <v-text-field
            v-model="newUserData.fullname"
            label="Nombre"
            :rules="rules.fullname"
          ></v-text-field>
          <v-text-field
            v-model="newUserData.password"
            label="Contraseña"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="rules.password"
            @click:append-inner="showPassword = !showPassword"
          ></v-text-field>
          <v-text-field
            v-model="newUserData.age"
            label="Edad"
            type="number"
          ></v-text-field>
          <v-select
            v-model="newUserData.groupIds"
            :items="groups"
            item-title="name"
            item-value="id"
            multiple
            chips
            label="Grupos"
          >
          </v-select>

          <div v-if="errorMessage">
            <v-alert
              type="error"
              density="compact"
              variant="tonal"
              class="mb-2"
            >
              {{errorMessage}}
            </v-alert>
          </div>

          <v-btn color="teal" class="mr-4" @click="submitNewUser">
            Guardar
          </v-btn>

          <v-btn :to="{ name: 'ListUsers' }" color="grey" class="mr-4">
            Cancelar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

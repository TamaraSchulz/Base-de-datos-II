import { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ListUsers from '@/views/ListUsers.vue'
import NewUser from '@/views/NewUser.vue'
import EditUser from '@/views/EditUser.vue'
import ChangePassword from '@/views/ChangePassword.vue'

const routes: RouteRecordRaw[] = [
  { path: '', component: Home, name: 'Home', meta: { requiresAuth: true } },
  { path: '/login', component: Login, name: 'Login' },
  {
    path: '/users',
    component: ListUsers,
    name: 'ListUsers',
    meta: { requiresAuth: true, allowedGroups: ['user_manager'] },
  },
  {
    path: '/users/new',
    component: NewUser,
    name: 'NewUser',
    meta: { requiresAuth: true, allowedGroups: ['user_manager'] },
  },
  {
    path: '/users/:id/edit',
    component: EditUser,
    name: 'EditUser',
    meta: { requiresAuth: true, allowedGroups: ['user_manager'] },
  },
  {
    path: '/change_password',
    component: ChangePassword,
    name: 'ChangePassword',
    meta: { requiresAuth: true, allowedGroups: ['user_manager'] },
  },
]

export default routes

<template>
  <q-page padding>
      <q-form class="row justify-center" @submit.prevent="handleLogin">
        <p class="col-12 text-h5 text-center"> Login </p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input
            label="Email"
            v-model="form.email"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Email is required !']"
            type="email"
          />
          <q-input
            label="Password"
            v-model="form.password"
            lazy-rules
            :rules="[val => (val && val.length >= 6) || 'Password is required !']"
          />
        
          <div class="full-width q-pt-md q-gutter-y-sm">
            <q-btn
              label="Login"
              color="secondary"
              class="full-width"
              type="submit"
            >
            </q-btn>
          </div>
          <div class="full-width">
            <q-btn
              label="Register"
              color="primary"
              class="full-width"
              flat
              size="sm"
              :to="{ name: 'register' }"
            >
            </q-btn>
            <q-btn
              label="Forgot Password ?"
              color="primary"
              class="full-width"
              flat
              size="sm"
              :to="{ name: 'forgot-password' }"
            >
            </q-btn>
          </div>
        </div>
      </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
// import composable e router
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageLogin',
  setup () {

    const router = useRouter()

    const { login, isLoggedIn } = useAuthUser()

    const { notifySuccess, notifyError } = useNotify()

    const form = ref({
      email: '',
      password: ''
    })

    // Força a página de login se usuário logado, regra criada em 30/ago.
    
    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })
    
    // HandleLogin
    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySuccess('Login successfully')
        router.push({ name: 'me' })
      } catch (error) {
        notifyError(error.message)
      }
    }
    
    return {
      form,
      handleLogin
    }
  }
})
</script>

<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleResetPassword">
      <p class="col-12 text-h5 text-center"> Reset Password </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New Password"
          v-model="password"
          lazy-rules
          :rules="[val => (val && val.length >= 6) || 'Password is required !']"
        />
      
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Send New Password"
            color="secondary"
            class="full-width"
            type="submit"
          >
          </q-btn>
        </div>
      </div>
    </q-form>  
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue"
import useAuthUser from "src/composables/UseAuthUser"
import { useRouter, useRoute } from "vue-router"
import useNotify from "src/composables/UseNotify"

export default defineComponent({
    name: 'PageResetPassword',
    setup () {

      const {resetPassword } = useAuthUser()
      const route = useRoute()                  /** Rota atual */
      const router = useRouter()                /** Rota a ser direcionada */
      const { notifySuccess, notifyError} = useNotify()
      const token = route.query.token
      const password = ref('')

      const handleResetPassword = async () => {
        try {
          await resetPassword(token, password.value)
          notifySuccess('New Password Sent')
          router.push({ name: 'login' })          
        } catch (error) {
          notifyError(error.message)
        }
      }
        
      return {
      password,
      handleResetPassword
      }
    }
})
</script>
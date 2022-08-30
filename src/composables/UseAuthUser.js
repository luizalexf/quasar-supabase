
// import ref of vue3 to keep global state
import { ref } from 'vue'

//  import supabase
import useSupabase from 'src/boot/supabase'

const user = ref(null)

//  export composable função com metodos de autenticação
export default function useAuthUser () {

    const { supabase } = useSupabase()

    /**
        * Login with email and password
        */
    const login = async ({ email, password }) => {
        const { user, error } = await supabase.auth.signIn({ email, password })
        if (error) throw error
        return user
    }

    // login social provider
    const loginWithSocialProvider = async (provider) => {
        const { user, error } = await supabase.auth.signIn({ provider })
        if (error) throw error
        return user 
    }

    // logout
    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    }

    /**
        * Check if the user is logged in or not
        */
    const isLoggedIn = () => {
        return !!user.value
    }

    // 
    const register = async ({ email, password, ...meta }) => {
        const { user, error } = await supabase.auth.signUp(
            { email, password },
            { 
                data: meta, 
                redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
            }
        )
        if (error) throw error
        return user
    }

    // update
    const update = async (data) => {
        const { user, error } = await supabase.auth.update(data)
        if (error) throw error
        return user
    }

    // sendpassword
    const sendPasswordRestEmail = async (email) => {
        const { user, error } = await supabase.auth.api.resetPasswordForEmail(email)
        if (error) throw error
        return user
    }

    /**
     * Reset password
     */
    const resetPassword = async (accessToken, newPassword) => {
        const { user, error } = await supabase.auth.api.updateUser(
            accessToken,
            { password: newPassword }
        )
        if (error) throw error
        return user
    }

    // return
    return {
        user,
        login, 
        loginWithSocialProvider,
        logout,
        isLoggedIn,
        register,
        update,
        sendPasswordRestEmail,
        resetPassword
    }
}

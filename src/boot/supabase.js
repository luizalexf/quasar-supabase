import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseURL = process.supabase.supabaseURL
const supabaseKey = process.supabase.supabaseKey
const supabase = createClient(supabaseURL, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
    const {user } = useAuthUser()

    user.value = session?.user || null
    
}) 

export default function UseSupabase() {
    return { supabase }
}
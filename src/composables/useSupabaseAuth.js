import { ref } from 'vue'
import { supabase } from '../lib/supabase.js'

const user = ref(null)
const session = ref(null)
const loading = ref(true)

// NEW (non-breaking)
const profile = ref(null)
const wallet = ref(null)

let initialized = false

export function useSupabaseAuth() {
  const loadUserData = async () => {
    if (!user.value) {
      profile.value = null
      wallet.value = null
      return
    }

    const userId = user.value.id

    const [{ data: p, error: pErr }, { data: w, error: wErr }] =
      await Promise.all([
        supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single(),

        supabase
          .from('wallets')
          .select('*')
          .eq('user_id', userId)
          .single()
      ])

    if (pErr) console.error(pErr)
    if (wErr) console.error(wErr)

    profile.value = p || null
    wallet.value = w || null
  }

  const init = async () => {
    if (initialized) return
    initialized = true

    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error(error)
    }

    session.value = data.session
    user.value = data.session?.user || null
    loading.value = false

    // LOAD DATA ON INIT
    await loadUserData()

    supabase.auth.onAuthStateChange(async (_event, newSession) => {
      session.value = newSession
      user.value = newSession?.user || null

      // RELOAD DATA ON LOGIN / LOGOUT
      await loadUserData()
    })
  }

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    user.value = null
    session.value = null
    profile.value = null
    wallet.value = null
  }

  const getAccessToken = () => session.value?.access_token || null

  return {
    // existing (unchanged)
    user,
    session,
    loading,
    init,
    signUp,
    signIn,
    signOut,
    getAccessToken,

    // NEW (safe additions)
    profile,
    wallet,
    loadUserData
  }
}

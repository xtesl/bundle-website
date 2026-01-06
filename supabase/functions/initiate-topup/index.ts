import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

console.log('Function "initiate-topup" up and running!')

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Only allow POST
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // // Get the token from the Authorization header
    // const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    
    // if (!token) {
    //   return new Response(
    //     JSON.stringify({ error: 'Missing authorization token' }),
    //     { 
    //       status: 401,
    //       headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    //     }
    //   )
    // }

    // Get the user object
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()

    if (authError || !user) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ 
          error: 'Unauthorized',
          details: authError?.message 
        }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Parse and validate request body
    const body = await req.json()
    const { amount } = body

    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Paystack transaction
    const PAYSTACK_SECRET = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!PAYSTACK_SECRET) {
      throw new Error('PAYSTACK_SECRET_KEY not configured')
    }

    const paystackRes = await fetch(
      'https://api.paystack.co/transaction/initialize',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          amount: Math.round(amount * 100),
        }),
      }
    )

    if (!paystackRes.ok) {
      throw new Error(`Paystack API error: ${paystackRes.status}`)
    }

    const paystackData = await paystackRes.json()

    if (!paystackData.status) {
      return new Response(
        JSON.stringify({ error: paystackData.message || 'Paystack initialization failed' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const { reference, access_code } = paystackData.data

    // Create admin client for database insert (to bypass RLS if needed)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Insert transaction record
    const { error: insertError } = await supabaseAdmin
      .from('paystack_transactions')
      .insert({
        user_id: user.id,
        reference,
        access_code,
        amount,
      })

    if (insertError) {
      console.error('Database insert error:', insertError)
      return new Response(
        JSON.stringify({ error: 'Failed to save transaction', details: insertError.message }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Success response
    return new Response(
      JSON.stringify({ access_code, reference }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
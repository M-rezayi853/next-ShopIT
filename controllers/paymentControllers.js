const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Process stripe payment  =>  /api/payment/process
const processPayment = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' },
    })

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Send stripe API key  =>  /api/payment/stripeapi
const sendStripeApi = async (req, res, next) => {
  try {
    res.status(200).json({
      stripeApiKey: process.env.STRIPE_API_KEY,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export { processPayment, sendStripeApi }

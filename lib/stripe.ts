// Stripe-hosted ticket sales. The product name, price and inventory all live in
// the Stripe dashboard, not here — renaming the event means editing the Stripe
// product (or creating a new buy button and swapping these IDs).
// The publishable key is public by design and safe to ship in the bundle.

export const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/3cI4gz7SjaO41XPcCU0Ny02'

export const STRIPE_BUY_BUTTON_ID = 'buy_btn_1TP7H7FdDoxRxsAYF7KeQaRw'

export const STRIPE_PUBLISHABLE_KEY =
  'pk_live_51RO3OrFdDoxRxsAY2pPb00TiTpJO4hN9085dvvNsS1HCPlgi2v9qdt38C68LYJyRs0F3bNlj002A73AQKWwLLo1400C657xe4B'

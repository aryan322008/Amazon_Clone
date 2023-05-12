import userModal from "../models/userModal.js";
import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51Mwm2gSJK14c2UQ1jmO9q0FHB1nPZCL3uCzVaNe9HUn128fAgRzi49QFq6y98xcbH7ETmzILQ3e6R6MKnSgrx4pt003EAXM91G")

const payment = async (req, res) => {
   
    const total = req.query.total
    console.log(total)
    
    if(total>100){
      console.log(total)
      const paymentIntent = await stripe.paymentIntents.create({
          amount: total,
          currency: "inr",
          automatic_payment_methods: {
            enabled: true,
          },
        });
      
        res.send({
          clientSecret: paymentIntent.client_secret,
        });
    }

}


export { payment }

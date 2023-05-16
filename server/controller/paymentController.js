import userModal from "../models/userModal.js";
import itemModal from "../models/itemModel.js";
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51Mwm2gSJK14c2UQ1jmO9q0FHB1nPZCL3uCzVaNe9HUn128fAgRzi49QFq6y98xcbH7ETmzILQ3e6R6MKnSgrx4pt003EAXM91G");

const payment = async (req, res) => {
  const total = req.query.total;

  if (total > 100) {
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
};

const prebuiltPayment = async (req, res) => {
  const { id, qty } = req.body;

  try {
    const user = await userModal.findById(req.user);

    if (!user) {
      return res.status(404).json({ errors: [{ msg: "user not found" }] });
    }

    const item = await itemModal.findById(id);

    if (!item) {
      return res.status(404).json({ message: "item not found" });
    }

    const total_PriceIn_Unit_Amount = Number(item.price * qty) * 100;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: item.title,
              metadata: {
                id: item.id,
              },
            },
            unit_amount: total_PriceIn_Unit_Amount,
          },
          quantity: qty,
        },
      ],
      mode: "payment",
      success_url: `${process.env.YOUR_DOMAIN}/message/${id}?qty=${qty}&type=success`,
      cancel_url: `${process.env.YOUR_DOMAIN}/message/${id}?type=canceled`,
    });

    res.send({ url: session.url });
  } catch (error) {
    return res.status(404).send({ error: error });
  }
};

export { payment, prebuiltPayment };

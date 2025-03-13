import midtransClient from "midtrans-client";
const createTransaction = async (req, res, next) => {
  const core = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
  });

  try {
    const parameter = {
      transaction_details: {
        order_id: `order-${Math.floor(Math.random() * 1000000)}`,
        gross_amount: req.body.amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
      },
    };
    const transaction = await core.createTransaction(parameter);
    res.json({ token: transaction.token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createTransaction,
};

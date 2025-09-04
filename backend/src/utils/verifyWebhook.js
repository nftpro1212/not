// Placeholder: If you integrate a payment gateway webhook (e.g. Cryptomus/NowPayments),
// verify signature here. For pure on-chain TON verify, you may not need this.
module.exports = function verifyWebhook(req) {
  // e.g., const signature = req.headers['x-nowpayments-sig'];
  // return validate(signature, req.body, process.env.WEBHOOK_SECRET);
  return true;
};

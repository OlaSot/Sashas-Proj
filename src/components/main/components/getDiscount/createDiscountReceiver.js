let discountReceiver = {};

function generateDiscountReceiver({
  name = "Unknown",
  phone = "",
  email = "",
} = {}) {
  const id = Math.floor(Math.random() * 999);
  discountReceiver = { id, name, phone, email };
  return discountReceiver;
}

export { generateDiscountReceiver, discountReceiver };

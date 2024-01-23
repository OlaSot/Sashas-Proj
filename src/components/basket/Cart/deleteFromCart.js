function deleteFromCart(id) {
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];

  if (!Array.isArray(productsInCart)) {
    console.error("Invalid data format in localStorage");
    return;
  }

  const index = productsInCart.findIndex((prod) => prod.id === id);

  if (index !== -1) {
    // Использую деструктуризацию для удаления элемента массива
    productsInCart = [
      ...productsInCart.slice(0, index),
      ...productsInCart.slice(index + 1),
    ];

    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  } else {
    console.warn(`Product with ID ${id} not found in the cart`);
  }
}

export default deleteFromCart;

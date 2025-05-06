const db = require("../config/db");
const jwt = require("jsonwebtoken");

//Add Item to Cart
exports.addToCart = async (req, res) => {
  const user_id = req.user.user_id; // verified from the token

  const { product_id, quantity } = req.body;

  try {
    // Check if item already exists
    const [existingItem] = await db.execute(
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
      [user_id, product_id]
    );

    if (existingItem.length > 0) {
      // Update quantity if product exists
      const newQuantity = existingItem[0].quantity + quantity;

      await db.execute(
        "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
        [newQuantity, user_id, product_id]
      );
    } else {
      // Insert new product in cart
      await db.execute(
        "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [user_id, product_id, quantity]
      );
    }
// Return updated full cart
const [updatedCart] = await db.execute(
    `SELECT cart.cart_id, cart.quantity, products.name, products.price, products.image
     FROM cart
     JOIN products ON cart.product_id = products.product_id
     WHERE cart.user_id = ?`,
    [user_id]
  );

    res.status(200).json({ cart: updatedCart});
  } catch (error) {
    console.error("Error in addToCart:", error.message);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Get Cart Items for a User
exports.getCart = async (req, res) => {
  const { user_id } = req.params; // extracts user_id from the URL parameters(like /cart/:user_id)

  try {
    //For every item in the cart, find the matching product in the products table where the product_id in cart matches the id in products.
    const [cartItems] = await db.execute(
      `SELECT cart.cart_id, cart.quantity, products.name, products.price, products.image
       FROM cart
       JOIN products ON cart.product_id = products.product_id
       WHERE cart.user_id = ?`,
      [user_id]
    );
    console.log("Cart items fetched from DB:", cartItems);
    res.status(200).json({ cart: cartItems });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

//Get a single product by ID
exports.getProduct = async (req, res) => {
  const { product_id } = req.params;

  try {
    const [product] = await db.execute(
      "SELECT * FROM products WHERE product_id = ?",
      [product_id]
    );

    if (product.length === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json(product[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fectching product", error });
  }
};

//Update Quantity in Cart
exports.updateCart = async (req, res) => {
  const { cart_id, quantity } = req.body;

  try {
    await db.execute("UPDATE cart SET quantity = ? WHERE cart_id = ?", [
      quantity,
      cart_id,
    ]);

    // Get user_id based on cart_id
    const [[user]] = await db.execute(
      "SELECT user_id FROM cart WHERE cart_id = ?",
      [cart_id]
    );

    const [updatedCart] = await db.execute(
      `SELECT cart.cart_id, cart.quantity, products.name, products.price, products.image
       FROM cart
       JOIN products ON cart.product_id = products.product_id
       WHERE cart.user_id = ?`,
      [user.user_id]
    );
    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

// Remove Item from Cart
exports.removeFromCart = async (req, res) => {
  const { cart_id } = req.params;

   try {
    // Get user_id first
    const [[user]] = await db.execute(
      "SELECT user_id FROM cart WHERE cart_id = ?",
      [cart_id]
    );

    const user_id = user?.user_id;

    await db.execute("DELETE FROM cart WHERE cart_id = ?", [cart_id]);

    if (user_id) {
      const [updatedCart] = await db.execute(
        `SELECT cart.cart_id, cart.quantity, products.name, products.price, products.image
         FROM cart
         JOIN products ON cart.product_id = products.product_id
         WHERE cart.user_id = ?`,
        [user_id]
      );

      res.status(200).json({ cart: updatedCart });
    } else {
      res.status(404).json({ message: "User/cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};

// Clear Entire Cart
exports.clearCart = async (req, res) => {
  const { user_id } = req.params;

  try {
    await db.execute("DELETE FROM cart WHERE user_id = ?", [user_id]);
    res.status(200).json({ cart: [] });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};

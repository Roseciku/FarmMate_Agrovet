const db = require("../config/db");
const jwt = require("jsonwebtoken")

//Add Item to Cart
exports.addToCart = async (req, res) => {

    const authHeader = req.headers["authorization"]

    if(!authHeader){
        return res.status(401).json({message: "unauthorized"})
    }

    
    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded.user_id

        const { product_id, quantity } = req.body
        
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

        res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
};

// Get Cart Items for a User
exports.getCart = async (req, res) => {
    const { user_id } = req.params; // extracts user_id from the URL parameters(like /cart/:user_id)
    try {
        //For every item in the cart, find the matching product in the products table where the product_id in cart matches the id in products.
        const [cartItems] = await db.execute(`
            SELECT c.id, c.quantity, p.name, p.image, p.price 
            FROM cart c 
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?`, 
            [user_id]
        );

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
};

//Get a single product by ID
exports.getProduct = async(req, res) =>{
    const {id} = req.params;

    try {
        const [product] = await db.execute("SELECT * FROM products WHERE product_id = ?", [id])

        if (product.length === 0) return res.status(404).json({message:"Product not found"})
        res.json(product[0]);
    } catch (error) {
        res.status(500).json({message: "Error fectching product", error})
    }
}

//Update Quantity in Cart
exports.updateCart = async (req, res) => {
    const { cart_id, quantity } = req.body;

    try {

        await db.execute(
            "UPDATE cart SET quantity = ? WHERE id = ?",
            [quantity, cart_id]
        );

        res.status(200).json({ message: "Cart updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error });
    }
};

// Remove Item from Cart
exports.removeFromCart = async (req, res) => {
    const { cart_id } = req.params;

    try {
        await db.execute("DELETE FROM cart WHERE id = ?", [cart_id]);
        res.status(200).json({ message: "Item removed from cart" });

    } catch (error) {
        res.status(500).json({ message: "Error removing item", error });
    }
};

// Clear Entire Cart
exports.clearCart = async (req, res) => {
    const { user_id } = req.params;

    try {
        await db.execute("DELETE FROM cart WHERE user_id = ?", [user_id]);
        res.status(200).json({ message: "Cart cleared" });
        
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart", error });
    }
};

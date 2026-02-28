import express from 'express';
import cart from "../cartModel.js"

const cartRouter = express.Router();

cartRouter.post("/add_to_cart", async (req, res) => {
    try {
        const { product_id, quantity, user_id } = req.body;

        let existing = await cart.findOne({ product_id, user_id })
        if (existing) {
            existing.quantity += quantity;
            await existing.save();
            console.log("items saved to cart", existing);
            return res.status(200).json(existing)
        }

        const newCartItem = new cart({ product_id, quantity, user_id })

        const saved = await newCartItem.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("error in saving cart items", error)
        res.status(400).json({ message: error.message })
    }
})

cartRouter.get("/get_cart/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        console.log("found", user_id)

        const cartItems = await cart.find({ user_id: user_id });
        console.log("found", cartItems)
        return res.status(200).json(cartItems);

    } catch (error) {
        console.error("error fetching cart", error);
        return res.status(500).json({ message: "server error" });
    }
});
export default cartRouter;
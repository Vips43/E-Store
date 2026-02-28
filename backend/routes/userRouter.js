import express from 'express';
import User from '../users.js';

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        console.log("user added", savedUser)
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.password !== password)
            return res.status(401).json({ message: "wrong password" });
        console.log("User logged in:", user.username);
        res.status(200).json({ message: "Login successful", user: { username: user.username, email: user.email,_id: user._id } })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get("/getUser", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        console.error("error in get user", error)
    }
})
router.delete("/remove/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId)
        const result = await User.deleteOne({ _id: userId });
        if (result.deletedCount === 0)
            return res.status(404).json({ message: "User not found" })
        res.status(200).json({ message: "User deleted successfully", result })
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "internal server error" })
    }
})


export default router;
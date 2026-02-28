import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRouter.js';
import cartRouter from './routes/cartRouter.js';

// dotenv.config();

const PORT = process.env.LOCAL_PORT;

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = `https://dummyjson.com`

// user routes
app.use('/api/users', userRoutes);
// cart routes
app.use('/api/cart', cartRouter);
// monggose setup
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("mongoDB connected"))
    .catch(err => console.error("MongoDB connect error:", err))


app.get("/search", async (req, res) => {
    const { q: query } = req.query;
    try {
        const respose = await fetch(`${BASE_URL}/products/search?q=${query || ""}`);
        const data = await respose.json();
        console.log("fetched search")
        res.json(data)
    } catch (error) {
        console.log("serach fetch Error: ", error)
        res.status(500).json({ eoor: error.message })
    }
})
let cache = {};
app.get("/products", async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const cacheKey = `cat-${category || "all"}-p${page}-l${limit}`

    if (cache[cacheKey]) {
        console.log("serving from cache", cacheKey)
        return res.json(cache[cacheKey])
    }
    try {
        const url = category ? `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}` : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
        const response = await fetch(url);
        const data = await response.json();
        const resData = { products: data.products, totalProducts: data.total, page: parseInt(page), limit: parseInt(limit) }

        console.log("fetched products")
        cache[cacheKey] = resData;
        res.json(resData)
    } catch (error) {
        console.log("serach fetch Error: ", error)
        res.status(500).json({ eoor: error.message })
    }
})
const idcache = {}
app.get("/product/:id", async (req, res) => {
    const { id } = req.params
    if (idcache[id]) {
        console.log("returned from cacheid");
        return idcache[id]
    }
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();

        idcache[id] = data
        res.status(200).json(data);

    } catch (error) {
        console.error("error in getting data", error)
    }
})

app.get("/users", async (req, res) => {
    try {
        const url = `${BASE_URL}/users`
        const response = await fetch(url);
        const users = await response.json();
        res.json(users)
    } catch (error) {
        console.log("user fetch error:", error)
        res.status(500).json({ eoor: error.message })
    }

})

app.listen(PORT, () => {
    console.log("server started on port:", PORT)
})
import express from 'express'
import mongoConnect from "./mongoConnect.js"
import bodyParser from 'body-parser'
import cors from "cors"
import router from "./routes/itemsRouter.js"
import authRouter from "./routes/authRouter.js"
import paymentrouter from "./routes/paymentRouter.js"
import ordersRouter from "./routes/ordersRouter.js"
import searchRouter from "./routes/searchRouter.js"
import ProductDetails from "./routes/ProductDetails.js"

const app = express()
const port = 5000

mongoConnect().then(()=> console.log("connected") )

app.use(bodyParser.json({limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }))

app.use(cors())

app.use("/payments",paymentrouter)
app.use("/items", router)
app.use("/auth", authRouter)
app.use("/orders", ordersRouter) 
app.use("/search", searchRouter) 
app.use("/product_details", ProductDetails) 

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
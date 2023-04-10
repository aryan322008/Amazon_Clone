import express from 'express'
import router from "./routes/itemsRouter.js"
import mongoConnect from "./mongoConnect.js"
import bodyParser from 'body-parser'
import cors from "cors"

const app = express()
const port = 5000

mongoConnect().then(()=> console.log("connected") )

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use("/items", router)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
import express from 'express';
import listEndpoints from "express-list-endpoints";
import authorRouter from "./services/authors/index.js"

const server = express()

server.use(express.json())   // this! specify before ENDPOINTS, else all will be UNDEFINED

server.use("/authors", authorRouter)

const port = 3001

console.table(listEndpoints(server)) // usage of express-list-endpoints



server.listen(port, () => {
    console.log('listening on port:', port)
})


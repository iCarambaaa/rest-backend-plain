import express from 'express';
import listEndpoints from "express-list-endpoints";

const server = express()

server.use(express.json())   // this! specify before ENDPOINTS, else all will be UNDEFINED

const port = 3001

console.table(listEndpoints(server)) // usage of express-list-endpoints



server.listen(port, () => {
    console.log('listening on port:', port)
})


import express from 'express';
import listEndpoints from "express-list-endpoints";
import authorRouter from "./services/authors/index.js";
import postsRouter from "./services/posts/index.js";
import filesRouter from "./services/files/index.js";
import cors from "cors";
import { genericErrorHandler, badRequestHandler, unauthorizedHandler, notFoundHandler } from "./errorHandlers.js";
import { join } from "path"

const server = express()

export const publicFolderPath = join(process.cwd(), "./public") //process.cwd() gives the root folder

server.use(cors()) // this! for FE & BE communication
server.use(express.json())   // this! specify before ENDPOINTS, else all will be UNDEFINED

server.use(express.static(publicFolderPath)) // Folder declared as static (serving content)

// ************************ ENDPOINTS **********************

server.use("/authors", authorRouter)
server.use("/posts", postsRouter)
server.use("/", filesRouter)

// *********************** ERROR MIDDLEWARES ***************************

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)



const port = 3001

console.table(listEndpoints(server)) // usage of express-list-endpoints

server.listen(port, () => {
    console.log('✅ listening on port:', port)
})

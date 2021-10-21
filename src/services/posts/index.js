import express from "express"
// import { fileURLToPath } from "url"
// import { dirname, join } from "path"
// import fs from "fs-extra"
import {nanoid }from "nanoid"
import createHttpError from "http-errors"
import { validationResult } from "express-validator"
import { postsValidationMiddlewares } from "./validation.js"
import {getPosts, writePosts} from "../../lib/fs-tools.js"

const postsRouter = express.Router()

const postsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "posts.json")

const getPosts = () => JSON.parse(fs.readFileSync(postsJSONPath)) //transform twice
const writePosts = (content) => fs.writeFileSync(postsJSONPath, JSON.stringify(content))



// GET /blogPosts => returns the list of blogposts
// USE TRY & CATCH

postsRouter.get("/", (req, res, next) => {
    try {   
      const posts = getPosts()
      if (req.query && req.query.title) {
        const filteredPosts = posts.filter(post => post.title === req.query.title)
        res.send(filteredPosts)
      } else {
        res.send(posts)
    }
    } catch (error) {   // Errors that happen here need to be 500 errors (Generic Server Error)
      next(error)
    }
  })

// GET /blogPosts /123 => returns a single blogpost

postsRouter.get("/:id", (req, res, next) => {

  try {
    const posts = getPosts()
    
    const post = posts.find(b => b._id == req.params.id)
    if (post) {

      res.send(post) // send if found
    
    } else {
  
      next(createHttpError(404, `Post with id ${req.params.id} not found!`)) // return error build with "http-errors" f(404, [msg])
    
    }} catch (error) {
    // Errors that happen here need to be 500 errors (Generic Server Error)
    next(error) 
    
  }
})

// POST /blogPosts => create a new blogpost

postsRouter.post("/", postsValidationMiddlewares, (req, res, next) => {     //Validati0n MIDDLEWARE goes here
  try {
    const errorsList = validationResult(req)

    if (!errorsList.isEmpty()) {
      // If we had validation errors --> we need to trigger Bad Request Error Handler
      next(createHttpError(400, { errorsList }))
    } else {
      const newPost = { _id: nanoid(), ...req.body, createdAt: new Date() }
      const posts = getPosts()

      posts.push(newPost)

      writePosts(posts)

      res.status(201).send(newPost)
    }
  } catch (error) {

    next(error)
  }
})

// PUT /blogPosts /123 => edit the blogpost with the given id

postsRouter.put("/:id", (req, res, next) => {
  try {
    const posts = getPosts()

    const index = posts.findIndex(post => post._id === req.params.id)

    const postToModify = posts[index]
    const updatedFields = req.body

    const updatedPost = { ...postToModify, ...updatedFields }

    posts[index] = updatedPost

    writePosts(posts)

    res.send(updatedPost)
  } catch (error) {

    next(error)
  }
})


// DELETE /blogPosts /123 => delete the blogpost with the given id

postsRouter.delete("/:id", (req, res, next) => {
  try {
    const posts = getPosts()

    const remainingPosts = posts.filter(post => post._id !== req.params.id)

    writePosts(remainingPosts)

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})



export default postsRouter
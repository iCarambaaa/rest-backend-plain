import express from "express"
import multer from "multer"

import { savePostPicture, saveAuthorsAvatar } from "../../lib/fs-tools.js"

const filesRouter = express.Router()

filesRouter.post("/authors/:id/avatar", multer().single("avatar"), async (req, res, next) => {
  try {
    console.log(req.file)
    const extension = extname(originalname)
    const fileName = `${req.params.id}${extension}`
    const link = `http://localhost:3001/${fileName}`
    await saveAuthorsAvatar(req.file.originalname, req.file.buffer)
    res.send("ok")
  } catch (error) {
    next(error)
  }
})

filesRouter.post("/blogPosts/:id/cover", multer().array("cover"), async (req, res, next) => {
  try {
    console.log(req.files)

    await savePostPictures(req.file.originalname, req.file.buffer)
    res.send("ok")
  } catch (error) {
    next(error)
  }
})


export default filesRouter
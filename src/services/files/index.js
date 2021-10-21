import express from "express"
import multer from "multer"

import { savePostPicture, saveAuthorsAvatar } from "../../lib/fs-tools.js"

const filesRouter = express.Router()

filesRouter.post("/authors/:id/uploadAvatar", multer().single("profilePic"), async (req, res, next) => {
  try {
    console.log(req.file)

    await saveAuthorsAvatar(req.file.originalname, req.file.buffer)
    res.send("ok")
  } catch (error) {
    next(error)
  }
})

filesRouter.post("/blogPosts/:id/uploadCover", multer().array("coverPic"), async (req, res, next) => {
  try {
    console.log(req.files)

    await savePostPictures(req.file.originalname, req.file.buffer)
    res.send("ok")
  } catch (error) {
    next(error)
  }
})


export default filesRouter
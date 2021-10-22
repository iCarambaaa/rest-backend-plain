import {path, dirname, join} from 'path';
import { fileURLToPath } from 'url'
import multer from "multer"


export const publicFolderPath = join(process.cwd(), "./public")

const parseFile = multer()

const uploadFile = (req, res, next) => {
    try {
        console.log(req.file)
        res.send("ok")
    } catch (error) {
        next(error)
    }
}
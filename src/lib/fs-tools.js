import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const {readJSON, writeJSON} = fs //readJSON and writeJSON are not part of the "normal" fs module

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")     //join

const postsJSONPath = join(dataFolderPath, "posts.json")                            //join
const authorsJSONPath = join(dataFolderPath, "authors.json")
// const commentsJSONPath = join(dataFolderPath, "comments.json")
const publicFolderPathAvatar = join(process.cwd(), "./public/img/authors")
const publicFolderPathPostImg = join(process.cwd(), "./public/img/posts")

export const getPosts = () => readJSON(postsJSONPath)
export const writePosts = (content) =>  writeJSON(postsJSONPath, content)
export const getAuthors = () => readJSON(authorsJSONPath)
export const writeAuthors = (content) => writeJSON(authorsJSONPath, content)
// export const getComments = () => readJSON(commentsJSONPath)
// export const writeComments = (content) => writeJSON(commentsJSONPath, content)
// export const 
export const saveAuthorsAvatar = (fileName, contentAsBuffer) => writeFile(join(publicFolderPathAvatar, fileName), contentAsBuffer)
export const savePostPicture = (fileName, contentAsBuffer) => writeFile(join(publicFolderPathPostImg, fileName), contentAsBuffer)
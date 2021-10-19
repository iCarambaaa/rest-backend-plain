import express from 'express';
import fs from 'fs';
import {fileURLToPath} from "url";
import {dirname, join} from "path";
// import nanoid from "nanoid";

const authorRouter = express.Router()

// locate authors.json

const currentFilePath = fileURLToPath(import.meta.url)
const parentPath = dirname(currentFilePath)
const authorJSONPath = join(parentPath, "authors.json")

// ***APIs***
// GET /authors => returns the list of authors

authorRouter.get("/", (req, res) => {
const content = JSON.parse(fs.readFileSync(authorJSONPath)); //transform twice 
res.send(content);
})

// GET /authors/123 => returns a single author

authorRouter.get("/:id", (req, res) => {
    const content = JSON.parse(fs.readFileSync(authorJSONPath)); //transform twice

    const author = content.find(a => a.id.toString() === req.params.id)

    res.send(author);
})

// POST /authors => create a new author

// authorRouter.post("/", (req, res) => {})

// PUT /authors/123 => edit the author with the given id

// authorRouter.put("/:id", (req, res) => {})

// DELETE /authors/123 => delete the author with the given id

// authorRouter.delete("/:id", (req, res) => {})


export default authorRouter
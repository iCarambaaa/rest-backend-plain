import express from 'express';
import fs from 'fs';
import {fileURLToPath} from "url";
import {dirname, join} from "path";
import {nanoid} from "nanoid";
// import flatten from 'flat';


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

    const author = content.find(a => a.id == req.params.id)

    res.send(author);
})

// POST /authors => create a new author

authorRouter.post("/", (req, res) => {

    const newAuthor = { id: nanoid(), ...req.body }

    const authors = JSON.parse(fs.readFileSync(authorJSONPath))
    
    const yes = authors.find(a => a.email == req.body.email) // restrict same email
    if(yes){

        res.status(200).send("sorry pls try again with another email")

    } else {

    authors.push(newAuthor)

    fs.writeFileSync(authorJSONPath, JSON.stringify(authors))

    res.status(201).send({newAuthor})
}})

// PUT /authors/123 => edit the author with the given id

authorRouter.put("/:id", (req, res) => {
    const content = JSON.parse(fs.readFileSync(authorJSONPath)); //transform twice
    const index = content.findIndex(a => a.id == req.params.id)
    const update = {...content[index], ...req.body}

    content[index] = update

    fs.writeFileSync(authorJSONPath, JSON.stringify(content))

    res.send({update})
})

// DELETE /authors/123 => delete the author with the given id

authorRouter.delete("/:id", (req, res) => {
    const content = JSON.parse(fs.readFileSync(authorJSONPath)); //transform twice
    const remaining = content.filter(a => a.id != req.params.id)
    fs.writeFileSync(authorJSONPath, JSON.stringify(remaining))
    res.status(204).send()
})


export default authorRouter
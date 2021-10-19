import express from 'express';
import fs from 'fs';
import {fileURLToPath} from "url";
import {dirname, join} from "path";
import nanoid from "nanoid";

const authorRouter = express.Router()


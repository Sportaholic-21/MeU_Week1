import express from "express";
import bodyParser from "body-parser";
import path from "path"
import { productRouter } from "./api/routes/apiProductRoute";
import { webRouter } from "./api/routes/webRoute";

const server = express();

server.use(express.static(`${__dirname}/public`));
server.set("views", path.join(__dirname, 'views'));

server.set("view engine", "ejs");

server.use(bodyParser.json())

server.use('/', webRouter)
server.use("/api/products", productRouter)

export default server

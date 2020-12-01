import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";

export const app = express();

import routes from "./routes";
//conecta ao banco de dados
import "./connection";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.listen(3333);

app;

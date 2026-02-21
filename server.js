const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Mongo conectado"))
    .catch((err) => console.log(err));


const Project = require("./models/Project");

app.get("/", (req, res) => {
    res.json({ message: "Backend funcionando " });
});

app.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erro ao buscar projetos" });
    }

});

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
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
        const projects = await Project.find().select({"title": 1, "_id": 1});
        res.status(200).json({ success: true, projects });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Erro ao buscar projetos" });
    }

});

app.get("/projects/:id", async (req, res) => {
    const id = req.params.id;
    
    try {
        const projects = await Project.findById(id);
        res.status(200).json({ success: true, projects });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Erro ao buscar dados do projeto" });
    }

});

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
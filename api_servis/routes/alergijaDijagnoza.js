const express = require("express");
const { sequelize, AlergijaDijagnoza, Kategorija, Narudzbina, Proizvod, ProizvodAlergijaDijagnoza, StavkaNarudzbine } = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

route.get("/", async (req, res) => {
    try {
        const alergijaDijagnoza = await AlergijaDijagnoza.findAll();
        return res.json(alergijaDijagnoza);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try {
        const alergijaDijagnoza = await AlergijaDijagnoza.findByPk(req.params.id);
        if (alergijaDijagnoza) {
            return res.json(alergijaDijagnoza);
        } else {
            return res.status(404).json({ error: "AlergijaDijagnoza nije pronađena" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.post("/", async (req, res) => {
    try {
        const novaAlergijaDijagnoza = await AlergijaDijagnoza.create(req.body);
        return res.status(201).json(novaAlergijaDijagnoza);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

// PUT /jelo/:id
route.put("/:id", async (req, res) => {
    try {
        const alergijaDijagnoza = await AlergijaDijagnoza.findByPk(req.params.id);
        if (alergijaDijagnoza) {
            await alergijaDijagnoza.update(req.body);
            return res.json(alergijaDijagnoza);
        } else {
            return res.status(404).json({ error: "AlergijaDijagnoza nije pronađena" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.delete("/:id", async (req, res) => {
    try {
        const alergijaDijagnoza = await AlergijaDijagnoza.findByPk(req.params.id);
        if (alergijaDijagnoza) {
            await alergijaDijagnoza.destroy();
            return res.status(204).send();
        } else {
            return res.status(404).json({ error: "AlergijaDijagnoza nije pronađena" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

module.exports = route;

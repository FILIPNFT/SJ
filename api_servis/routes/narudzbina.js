const express = require("express");
const { sequelize, AlergijaDijagnoza, Kategorija, Narudzbina, Proizvod, ProizvodAlergijaDijagnoza, StavkaNarudzbine } = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

route.get("/", async (req, res) => {
    try {
        const narudzvine = await Narudzbina.findAll();
        return res.json(narudzvine);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try {
        const narudzbina = await Narudzbina.findByPk(req.params.id);
        if (narudzbina) {
            return res.json(narudzbina);
        } else {
            return res.status(404).json({ error: "Narudzbina nije pronađena" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.post("/", async (req, res) => {
    try {
        const novaNarudzbina = await Narudzbina.create(req.body);
        return res.status(201).json(novaNarudzbina);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try {
        const narudzbina = await Narudzbina.findByPk(req.params.id);
        if (narudzbina) {
            await narudzbina.update(req.body);
            return res.json(narudzbina);
        } else {
            return res.status(404).json({ error: "Narudzbina nije pronađena" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.delete("/:id", async (req, res) => {
    try {
        const narudzbina = await Narudzbina.findByPk(req.params.id);
        if (narudzbina) {
            await narudzbina.destroy();
            return res.status(204).send();
        } else {
            return res.status(404).json({ error: "Narudzbina nije pronađena" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

module.exports = route;

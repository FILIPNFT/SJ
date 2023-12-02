const express = require("express");
const { sequelize, AlergijaDijagnoza, Kategorija, Narudzbina, Proizvod, ProizvodAlergijaDijagnoza, StavkaNarudzbine } = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

route.get("/", async (req, res) => {
    try {
        const kategorije = await Kategorija.findAll();
        return res.json(kategorije);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try {
        const kategorija = await Kategorija.findByPk(req.params.id);
        if (kategorija) {
            return res.json(kategorija);
        } else {
            return res.status(404).json({ error: "Kategorija nije pronađena" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.post("/", async (req, res) => {
    try {
        const novaKategorija = await Kategorija.create(req.body);
        return res.status(201).json(novaKategorija);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try {
        const kategorija = await Kategorija.findByPk(req.params.id);
        if (kategorija) {
            await kategorija.update(req.body);
            return res.json(kategorija);
        } else {
            return res.status(404).json({ error: "Kategorija nije pronađena" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.delete("/:id", async (req, res) => {
    try {
        const kategorija = await Kategorija.findByPk(req.params.id);
        if (kategorija) {
            await kategorija.destroy();
            return res.status(204).send();
        } else {
            return res.status(404).json({ error: "Kategorija nije pronađena" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

module.exports = route;

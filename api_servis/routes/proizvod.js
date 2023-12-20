const express = require("express");
const { sequelize, AlergijaDijagnoza, Kategorija, Narudzbina, Proizvod, ProizvodAlergijaDijagnoza, StavkaNarudzbine } = require("../models");
const {router} = require("express/lib/application");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

route.get("/", async (req, res) => {
    try {
        const proizvodi = await Proizvod.findAll();
        return res.json(proizvodi);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try {
        const proizvod = await Proizvod.findByPk(req.params.id);
        if (proizvod) {
            return res.json(proizvod);
        } else {
            return res.status(404).json({ error: "Proizvod nije pronađen" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.post("/", async (req, res) => {
    try {
        const noviProizvod = {
            naziv: req.body.naziv,
            opis: req.body.opis,
            cena: req.body.cena,
            kategorija_id: req.body.kategorija_id
        };

        const kreiranProizvod = await Proizvod.create(noviProizvod);
        return res.status(201).json(kreiranProizvod);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});


route.put("/:id", async (req, res) => {
    try {
        const proizvod = await Proizvod.findByPk(req.params.id);
        if (proizvod) {
            proizvod.naziv = req.body.naziv;
            proizvod.opis = req.body.opis;
            proizvod.cena = req.body.cena;
            proizvod.kategorija_id = req.body.kategorija_id;
            await proizvod.save();
            return res.json(proizvod);
        } else {
            return res.status(404).json({ error: "Proizvod nije pronađen" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.delete("/:id", async (req, res) => {
    try {
        const proizvod = await Proizvod.findByPk(req.params.id);
        if (proizvod) {
            await proizvod.destroy();
            return res.status(204).send();
        } else {
            return res.status(404).json({ error: "Proizvod nije pronađen" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

module.exports = route;
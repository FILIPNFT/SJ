const express = require("express");
const { sequelize, AlergijaDijagnoza, Kategorija, Narudzbina, Proizvod, ProizvodAlergijaDijagnoza, StavkaNarudzbine } = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

route.get("/", async (req, res) => {
    try {
        const proizvodAlergijaDijagnoza = await ProizvodAlergijaDijagnoza.findAll();
        return res.json(proizvodAlergijaDijagnoza);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try {
        const proizvodAlergijaDijagnoza = await ProizvodAlergijaDijagnoza.findByPk(req.params.id);
        if (proizvodAlergijaDijagnoza) {
            return res.json(proizvodAlergijaDijagnoza);
        } else {
            return res.status(404).json({ error: "ProizvodAlergijaDijagnoza nije pronađena" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.post("/", async (req, res) => {
    try {
        const novaProizvodAlergijaDijagnoza = await ProizvodAlergijaDijagnoza.create(req.body);
        return res.status(201).json(novaProizvodAlergijaDijagnoza);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try {
        const proizvodAlergijaDijagnoza = await ProizvodAlergijaDijagnoza.findByPk(req.params.id);
        if (proizvodAlergijaDijagnoza) {
            await proizvodAlergijaDijagnoza.update(req.body);
            return res.json(proizvodAlergijaDijagnoza);
        } else {
            return res.status(404).json({ error: "ProizvodAlergijaDijagnoza nije pronađena" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});
route.post("/:productId/alergijeDijagnoze", async (req, res) => {
    try {
        const { alergijaDijagnoza_id } = req.body;
        const productId = req.params.productId;

        const novaVeza = await ProizvodAlergijaDijagnoza.create({
            proizvod_id: productId,
            alergijaDijagnoza_id
        });

        return res.status(201).json(novaVeza);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Greška pri dodavanju veze", data: err });
    }
});

route.delete("/:productId/:allergyDiagnosisId", async (req, res) => {
    try {
        const result = await ProizvodAlergijaDijagnoza.destroy({
            where: {
                proizvod_id: req.params.productId,
                alergijaDijagnoza_id: req.params.allergyDiagnosisId
            }
        });

        if (result === 0) {
            return res.status(404).json({ error: "Veza nije pronađena" });
        }

        return res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});
module.exports = route;

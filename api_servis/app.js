const express = require('express');
const cors = require("cors");
const { sequelize, AlergijaDijagnoza, Kategorija, Narudzbina, Proizvod, ProizvodAlergijaDijagnoza, StavkaNarudzbine } = require("./models");

const app = express();

const corsOptions = {
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000']
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

app.put("/promeni-cenu/:id", async (req, res) => {
    try {
        const proizvod = await Proizvod.findByPk(req.params.id);

        if (!proizvod) {
            return res.status(404).json({ error: "Proizvod nije pronađen" });
        }

        proizvod.cena = req.body.cena;
        await proizvod.save();

        return res.json(proizvod);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});
app.post("/proizvod/novi-proizvod", async (req, res) => {
    try {
        const { naziv, opis, kategorija_id, cena } = req.body;
        const noviProizvod = await Proizvod.create({
            naziv,
            opis,
            kategorija_id,
            cena
        });

        return res.status(201).json(noviProizvod);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška pri dodavanju proizvoda", data: err });
    }
});

const proizvodRoutes = require("./routes/proizvod.js");
app.use("/proizvod", proizvodRoutes);

const kategorijaRoutes = require("./routes/kategorija.js");
app.use("/kategorija", kategorijaRoutes);

const narudzbinaRoutes = require("./routes/narudzbina.js");
app.use("/narudzbina", narudzbinaRoutes);

const alergijaDijagnozaRoutes = require("./routes/alergijaDijagnoza.js");
app.use("/alergijaDijagnoza", alergijaDijagnozaRoutes);

app.listen({ port: 9000 }, async () => {
    console.log('Started API server on http://localhost:9000');
    try {
        await sequelize.sync({ force: false });
        console.log('Database synced');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

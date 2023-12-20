const express = require('express');
const cors = require("cors");
const { sequelize, AlergijaDijagnoza, Kategorija, Narudzbina, Proizvod, ProizvodAlergijaDijagnoza, StavkaNarudzbine } = require("./models");

const app = express();

const corsOptions = {
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000']
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/proizvod/alergijeDijagnoze/:productId', async (req, res) => {
    try {
        const proizvodId = req.params.productId;

        const alergijeDijagnoze = await ProizvodAlergijaDijagnoza.findAll({
            where: { proizvod_id: proizvodId },
            include: [{
                model: AlergijaDijagnoza,
                as: 'alergijaDijagnoza'
            }]
        });

        const rezultati = alergijeDijagnoze.map(veza => veza.alergijaDijagnoza);
        return res.json(rezultati);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Greška", data: err });
    }
});
app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

app.get('/proizvod/', async (req, res) => {
    try {
        const proizvod = await Proizvod.findAll({
            include: [{
                model: Kategorija,
                as: 'kategorija'
            }]
        });
        res.json(proizvod);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
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
app.put("/promeni-naziv/:id", async (req, res) => {
    const { id } = req.params;
    const { naziv, tip } = req.body;

    let model;
    switch (tip) {
        case 'kategorija':
            model = Kategorija;
            break;
        case 'alergijaDijagnoza':
            model = AlergijaDijagnoza;
            break;
        default:
            return res.status(400).json({ error: "Nepoznat tip entiteta." });
    }

    try {
        const instance = await model.findByPk(id);
        if (!instance) {
            return res.status(404).json({ error: "Entitet nije pronađen." });
        }

        instance.naziv = naziv;
        await instance.save();

        return res.json(instance);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška na serveru.", data: err });
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
app.post("/kategorija/nova-kategorija", async (req, res) => {
    try {
        const {naziv} = req.body;
        const novaKategorija = await Kategorija.create({
            naziv
        });

        return res.status(201).json(novaKategorija);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška pri dodavanju kategorija", data: err });
    }
});
app.post("/alergijaDijagnoza/nova-alergijaDijagnoza", async (req, res) => {
    try {
        const {naziv} = req.body;
        const novaADijagnoza = await AlergijaDijagnoza.create({
            naziv
        });

        return res.status(201).json(novaADijagnoza);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greška pri dodavanju AD", data: err });
    }
});
app.post('/proizvodAlergijaDijagnoza', async (req, res) => {
    const { proizvod_id, alergijaDijagnoza_id } = req.body;

    try {
        const newLink = await ProizvodAlergijaDijagnoza.create({
            proizvod_id: proizvod_id,
            alergijaDijagnoza_id: alergijaDijagnoza_id
        });
        return res.status(201).json(newLink);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Došlo je do server greške');
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

const proizvodAlergijaDijagnozaRoutes = require("./routes/proizvodAlergijaDijagnoza.js");
app.use("/proizvodAlergijaDijagnoza", proizvodAlergijaDijagnozaRoutes);

app.listen({ port: 9000 }, async () => {
    console.log('Started API server on http://localhost:9000');
    try {
        await sequelize.sync({ force: false });
        console.log('Database synced');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }``
});

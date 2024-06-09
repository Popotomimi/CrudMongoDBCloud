// config inicial
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(cors());

// Rotas da API
const personRoutes = require("./routes/personRoutes");

app.use("/person", personRoutes);

// Rota inicial / endpoint
app.get('/', (req, res) => {

    res.json({message: `Oi Express!`});
});

// entregar uma porta
mongoose.connect('mongodb+srv://popotomimi:popoto100200300@apicluster.tierms1.mongodb.net/?retryWrites=true&w=majority&appName=APIcLUSTER')
.then(() => {
    console.log("Conectamos ao mongoDB!");
    app.listen(8800);
})
.catch((err) => console.log(err));


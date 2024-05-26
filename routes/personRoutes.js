const router = require('express').Router();

const { application } = require('express');
const Person = require("../models/Person");

// Create - Criação de dados
router.post('/', async (req, res) => {

    // req.body
    const {name, salary, approved} = req.body;

    if(!name || !salary || !approved) {
        res.status(422).json({error: "Todos os campos são obrigatórios!"});
        return;
    }

    const person = {
        name,
        salary,
        approved
    }

    // Create do mongoose

    try {
       
        await Person.create(person);

        res.status(201).json({ message: "Pessoa inserida no sistema com sucesso!" });

    } catch (error) {
        res.status(500).json({error: error});
    }

});

// Read - Leitura de dados
router.get("/", async (req, res) => {

    try {
       
        const people = await Person.find();

        res.status(200).json(people);

    } catch (error) {
        res.status(500).json({error: error});
    }

});

router.get("/:id", async (req, res) => {

    // Extrair o dado da requisição, pela URL = req.params
    const id = req.params.id;

    try {
        
        const person = await Person.findOne({ _id: id });

        if(!person) {
            res.status(422).json({ message: "Usuário não encontrado chapa!" });
            return;
        }

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({error: error});
    }

});

// Update - atualização de dados (PUT, PATCH) PUT para atualizar tudo e PATCH para alterar só um parametro como o nome
router.patch("/:id", async (req, res) => {

    const id = req.params.id;

    const {name, salary, approved} = req.body;

    const person = {
        name, 
        salary,
        approved,
    }

    try {

        const updatedPerson = await Person.updateOne({_id: id}, person);

        if(updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: "Usuário não encontrado chapa!" });
            return;
        }

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({ error: error});
    }

});

// Delete - Deletar dados
router.delete("/:id", async (req, res) => {

    const id = req.params.id;

    const person = await Person.findOne({ _id: id });

        if(!person) {
            res.status(422).json({ message: "Usuário não encontrado chapa!" });
            return;
        }

        try {
            
            await Person.deleteOne({ _id: id });

            res.status(200).json({ message: "Usuário excluido com sucesso chapa quente" })

        } catch (error) {
            res.status(500).json({ error: error}); 
        }

});

module.exports = router;
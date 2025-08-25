import express from "express";
import princesas from "./src/data/princesas.js";

let nomeProjeto = "Reino mágico das Princesas da Disney"

const app = express();
app.get("/", (req, res) => {
    res.send(`Bem-vindos(as) ao ${nomeProjeto}!`);
})

app.get("/princesas", (req, res) => {
    res.json(princesas)
})

app.get("/princesas/:id", (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    const princesasEncontrada = princesas.find(p => p.id === id);

    if(princesasEncontrada){
        res.status(200).json(princesasEncontrada);
    }else{
        res.status(404).json({
            erro: "Princesa não encontrada com esse id"
        });
    }
});

app.get("/princesas/nome/:nome", (req, res) => {
    let nome = req.params.nome.toLowerCase();
    const princesasEncontrada = princesas.filter(p => p.nome.toLowerCase().includes(nome));

    if(princesasEncontrada.length > 0){
        res.status(200).json(princesasEncontrada);
    }else{
        res.status(404).json({
            erro: "Princesa não encontrada com esse nome"
        });
    }
})

app.get("/princesas/reino/:reino", (req, res) => {
    let reino = req.params.reino.toLowerCase();
    const reinoEncontrado = princesas.filter(p => p.reino.toLowerCase().includes(reino));
    if(reinoEncontrado.length > 0){
        res.status(200).json(reinoEncontrado);
    }else{
        res.status(404).json({
            erro: "Princesa não encontrada nesse reino"
        })
    }
})

app.get("/princesas/ativas/sim", (req, res) => {
    const resultado = princesas.filter(princesa => princesa.ativa === true);

    if (resultado.length > 0){
        res.status(200).json(resultado);
    }else{
        res.status(404).json({
            erro: "Nenhuma princesa ativa encontrada"
        })
    } 
})


app.listen(3000, () => {
    console.log('Rodando a API das princesas na porta 3000! Acesse http:localhost:3000')
})



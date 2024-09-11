var express = require("express");
var app = express();
var cors = require("cors");
var fs = require("fs")

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization']}));

    app.use(express.static('public'));
    var dataFile = "db.json"

    function lerArquivo() {
        if (!fs.existsSync(dataFile)){
            return [];
        }
        try {
            let dados = fs.readFileSync(dataFile)
            if (dados.length === 0) {
                return [];
            }
            return JSON.parse(dados);
        } catch (err) {
            console.error("Erro ao ler o arquivo", err);
            return[];
        }
    }

    app.get("/listaVideos", function (req, res) {
       var dados = lerArquivo()
       return res.status(200).json(dados) 
    })



    app.listen(8000, function () {
        console.log("Rodando na porta 8000")
    });
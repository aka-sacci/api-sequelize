import 'reflect-metadata'
const express = require('express')
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser")
const port = 6061;
import {router} from "./routes"



//Config
    //CORS
    app.use(cors())

    //Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    

//ROTAS
    //Router
    app.use(router)

app.listen(port, () => {
    console.log("Servidor rodando na porta " + port)
})

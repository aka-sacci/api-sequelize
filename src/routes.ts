import { Router, Request, Response } from "express";
import { body, param } from 'express-validator';



    //Tabelas
    const imcData = require("./database/models").ImcData
    

    //Importação dos controllers rotas:
        //calcImc
        const CalculateImcController = require('./controller/CalcImc/CalculateImcController')
        const calculateImcController = new CalculateImcController

        //getResult
        const GetResultController = require('./controller/GetResult/getResultController')
        const getResultController = new GetResultController

        //Chama o router
        const router = Router()

    //Rotas
        //Rota principal
        router.get("/", (req: Request, res: Response) => {
          imcData.findAll().then((data) => {
               res.send(data)
           })
        })

    //Rota IMC
        //Rota de calculo do IMC
        router.post("/calcImc", 
        body('weight').notEmpty().isDecimal(),
        body('height').notEmpty().isDecimal(),
        body('wantToRegister').notEmpty().isBoolean(),
        body('email').isEmail().optional(), calculateImcController.handle)
    
        //Rota que pega os resultados do IMC por email
        router.get("/getResult/:email",
        param('email').isEmail(),
        getResultController.handle)

export {router}
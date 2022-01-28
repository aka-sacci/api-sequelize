import { Request, Response } from 'express'
import { validationResult } from 'express-validator';
const GetResultService = require("../../services/getResultService")
const getResultService = new GetResultService

//Functions
    //Checa qual o status code correto ao ser usado
    const checkStatusCode = (success: boolean, blank: boolean) => {
        if(success == false){
            return 500
        }

        if(blank == true){
            return 404
        }

        return 200
    }

class getResultController {
    async handle(req: Request, res: Response){

        //Consulta se realmente é um email
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const email = req.params.email
        const response = await getResultService.do({email})
        const statusCode = checkStatusCode(response.success, response.blank)
        return res.status(statusCode).json(response)
        
    }
}

module.exports = getResultController
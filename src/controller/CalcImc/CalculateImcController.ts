import { Request, Response } from 'express'
import { validationResult } from 'express-validator';
const CalculateImcService = require("../../services/CalculateImcService")
const calculateImcService = new CalculateImcService

//Functions
    //
    const checkStatusCode = (ImcMessageSuccess: boolean, ImcRegisterSucess: boolean = null) => {
      if(ImcMessageSuccess == false || ImcRegisterSucess == false){
        return 206
      }
      else
      {
        return 200
      }
    }

class CalculateImcController {
  async handle(req: Request, res: Response){

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        const weight = req.body.weight
        const height = req.body.height
        const calculatedAt = Date.now()
        const email = req.body.email
        const wantToRegister = req.body.wantToRegister
        const newCalc = await calculateImcService.do({weight, height, calculatedAt, wantToRegister, email})
        const StatusCode = checkStatusCode(newCalc.ImcMessage.success, newCalc.ImcRegister.success)
        res.status(StatusCode).json(newCalc)
  }
}

module.exports = CalculateImcController

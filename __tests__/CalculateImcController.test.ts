const controller = require('../src/controller/CalcImc/CalculateImcController')
import { Request } from 'express'
const { Sequelize } = require('sequelize');
import db from "../src/database/models"
const seeder = require('../src/database/seeders/20220123170650-imc-data.js')
import { makeMockResponse } from "../src/utils/mocks/MockResponse"


describe("CalculateImcController", () => {
    const CalculateImcController = new controller()
    const res = makeMockResponse()

    beforeAll(async () => {
        await db.sequelize.sync({force:true})
        await seeder.up(db.sequelize.getQueryInterface(), Sequelize)
    })

    it("Deve retornar o IMC e registrar no banco de dados, retornando status 200", async () => {
        const reqNoRegister = {
            body: {
            weight: 70.5,
            height: 1.78,
            wantToRegister: 0
            }
        } as Request
        const resultNoRegister = await CalculateImcController.handle(reqNoRegister, res)
        expect(resultNoRegister.state.status).toBe(200)

        const reqRegister = {
            body: {
            weight: 70.5,
            height: 1.78,
            wantToRegister: 1,
            email: "test@mail.com"
            }
        } as Request

        const resultRegister = await CalculateImcController.handle(reqRegister, res)
        expect(resultRegister.state.status).toBe(200)
        expect(resultRegister.state.json.ImcMessage.success).toBe(true)
        expect(resultRegister.state.json.ImcRegister.success).toBe(true)
    })

    it("Deve retornar o IMC, sem mensagem e com o status 206", async () => {
        db.sequelize.close()
        const req = {
            body: {
            weight: 70.5,
            height: 1.78,
            wantToRegister: 1,
            email: "test@mail.com"
            }
        } as Request

        const result = await CalculateImcController.handle(req, res)

        expect(result.state.status).toBe(206)
        expect(result.state.json.ImcMessage.success).toBe(false)
        expect(result.state.json.ImcRegister.success).toBe(false)
    })


})
const { Sequelize } = require('sequelize');
import db from "../src/database/models"
const seeder = require('../src/database/seeders/20220123170650-imc-data.js')
const service = require('../src/services/CalculateImcService')

describe("CalculateImcService", () => {

    const CalculateImcService = new service()

    beforeAll(async () => {
        await db.sequelize.sync({force:true})
        await seeder.up(db.sequelize.getQueryInterface(), Sequelize)
    })

    it("Deve retornar os dados de IMC, sem efetuar o cadastro do usuário no banco de dados",async () => {
        const calculatedAt = Date.now()
        const result = await CalculateImcService.do({
            weight: 70.5,
            height: 1.78,
            calculatedAt: calculatedAt,
            wantToRegister: 0
        })
        expect(result.imc).toBe(22.25097841181669)
        expect(result.calculatedAt).toBe(calculatedAt)
        expect(result.ImcMessage.success).toBe(true)
        expect(result.ImcRegister.success).toBe(null)
    })

    it("Deve retornar os dados de IMC, efetuando o cadastro de usuário", async () => {
        const calculatedAt = Date.now()
        const result = await CalculateImcService.do({
            weight: 70.5,
            height: 1.78,
            calculatedAt: calculatedAt,
            wantToRegister: 1,
            email: "test@mail.com"
        })

        expect(result.imc).toBe(22.25097841181669)
        expect(result.calculatedAt).toBe(calculatedAt)
        expect(result.ImcMessage.success).toBe(true)
        expect(result.ImcRegister.success).toBe(true)
    })

    it("Deve retornar erro ao tentar consultar a descrição do IMC e ao tentar se cadastrar, porém retornar o IMC normalmente", async () => {
        
        db.sequelize.close()
        const calculatedAt = Date.now()
        const result = await CalculateImcService.do({
            weight: 70.5,
            height: 1.78,
            calculatedAt: calculatedAt,
            wantToRegister: 1,
            email: "test@mail.com"
        })
        expect(result.imc).toBe(22.25097841181669)
        expect(result.calculatedAt).toBe(calculatedAt)
        expect(result.ImcMessage.success).toBe(false)
        expect(result.ImcRegister.success).toBe(false)
    })

})
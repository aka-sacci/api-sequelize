const service = require('../src/services/getResultService')
const { Sequelize } = require('sequelize');
import db from "../src/database/models"
const seeder = require('../src/database/seeders/20220123170650-imc-data.js')
const usersToInsert = require('../src/utils/mocks/UsersToInsert')

describe("getResultService", () => {
    const GetResultService = new service()
    const UsersToInsert = new usersToInsert()

    beforeAll(async () => {
        await db.sequelize.sync({force:true})
        await seeder.up(db.sequelize.getQueryInterface(), Sequelize)
        const UsersTest = UsersToInsert.get()
        UsersTest.forEach(element => {
           db.ImcResults.create({
               email: element.email,
               value: element.value
           })
        });

    })

    it("Deve retornar os dados referentes ao IMC do usuário com o email 'userTest1@mail.com'", async () => {
        const result = await GetResultService.do({email: "userTest1@mail.com"})
        expect(result.success).toBe(true)
        expect(result.blank).toBe(false)
        expect(result.data.length).toBe(2)

    })

    it("Deve retornar que não há dados relativos ao email 'userTest5@mail.com'",async () => {
        const result = await GetResultService.do({email: "userTest5@mail.com"})
        expect(result.success).toBe(true)
        expect(result.blank).toBe(true)
        expect(result.data).toBe("Não há dados relativos a esse email!")
    })

    it("Deve retornar erro ao recuperar os dados do IMC do usuário", async () => {
        db.sequelize.close()
        const result = await GetResultService.do({email: "userTest1@mail.com"})
        expect(result).toHaveProperty('err')
        expect(result.success).toBe(false)
        expect(result.blank).toBe(false)
        expect(result.data).toBe("Erro ao recuperar os dados do IMC do usuário!")
    })
})
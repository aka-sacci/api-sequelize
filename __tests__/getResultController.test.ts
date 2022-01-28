import db from "../src/database/models"
const { Sequelize } = require("sequelize")
const controller = require('../src/controller/GetResult/getResultController')
import { makeMockResponse } from '../src/utils/mocks/MockResponse' 
const seeder = require('../src/database/seeders/20220123170650-imc-data.js')
const usersToInsert = require('../src/utils/mocks/UsersToInsert')

describe('getResultController', () => {
    const res = makeMockResponse()
    const GetResultController = new controller()
    const UsersToInsert = new usersToInsert()

    beforeAll(async () => {
        await db.sequelize.sync({force: true})
        await seeder.up(db.sequelize.getQueryInterface(), Sequelize)
        const UsersTest = UsersToInsert.get()
        UsersTest.forEach(element => {
            db.ImcResults.create({
                email: element.email,
                value: element.value
            })
         });
    })

    it("Deve retornar os dados referentes ao usuário com o email 'userTest1@mail.com' com status 200", async () => {
        const req = {
            params: {
                email: "userTest1@mail.com"
            }
        }
        const result = await GetResultController.handle(req, res)
        expect(result.state.status).toBe(200)
        expect(result.state.json.success).toBe(true)
        expect(result.state.json.blank).toBe(false)
    })

    it("Deve retornar status 404, pois não foi achado o email 'userTest5@mail.com'", async () => {
        const req = {
            params: {
                email: "userTest5@mail.com"
            }
        }

        const result = await GetResultController.handle(req, res)
        expect(result.state.status).toBe(404)
        expect(result.state.json.success).toBe(true)
        expect(result.state.json.blank).toBe(true)

    })

    it("Deve retornar status 500",async () => {
        db.sequelize.close()
        const req = {
            params: {
                email: "userTest5@mail.com"
            }
        }
        const result = await GetResultController.handle(req, res)
        expect(result.state.status).toBe(500)
        expect(result.state.json.success).toBe(false)
        expect(result.state.json.blank).toBe(false)
        expect(result.state.json).toHaveProperty("err")
    })
})
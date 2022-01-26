//DB
const imcResults = require('../database/models/').ImcResults

interface iDataGetImcResults {
    email: string
}

//Functions
    //
    var isEmpty = (response: string) => {
        return response.length
    }

class getResultService {

    async do({email}: iDataGetImcResults){
        var emptyResponse = {
            data: "Não há dados relativos a esse email!",
            success: true,
            blank: true
        }

        const nonEmptyResponse = await imcResults.findAll({
            where: {
                email: email
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then((data) => {
            return {
                data: data,
                success: true,
                blank: false
            }
        })
        .catch((err) => {
            return {
                data: "Erro ao recuperar os dados do IMC do usuário!",
                err: err,
                success: false,
                blank: false
            }
        })
        
        const finalResponse = isEmpty(nonEmptyResponse.data) ? nonEmptyResponse : emptyResponse
        return finalResponse

    }

}

module.exports = getResultService
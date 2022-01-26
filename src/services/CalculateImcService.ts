//Dependencies
const { Op } = require("sequelize");

//DB
const ImcResults = require("../database/models").ImcResults
const ImcData = require("../database/models").ImcData

//Interfacce
interface iDataImcCalc {
    weight: number,
    height: number,
    calculatedAt: Date,
    wantToRegister: Boolean,
    email?: string,
}

//Functions
    //Cálculo do IMC
    const calcIMC = (weight: number, height: number) => {
        return weight/(height*height)
    }

    //Pega a descrição do IMC: se é magro, normal, obeso, etc
    async function getImcDescription (imc: number) {
        const result = await ImcData.findOne({
            where: {
                start: {
                    [Op.lte]: imc
                }
            },
            order: [
                ['start', 'DESC']
            ]
        }).then((result) => {
            return {message: "Seu IMC é de " + imc.toFixed(2) + ": " + result.description + ".",
                    rawMessage: result.description,
                    success: true        
            }
        }).catch((err) => {
            return {message: "Houve um erro ao consultar a descrição do IMC: " + err,
                    success: false  
            }
        })
        return result

    }

//Classe principal
class CalculateImcService{
    async do({weight, height, calculatedAt, wantToRegister, email}: iDataImcCalc){

        const imc = calcIMC(weight, height)
        const resultGetImcDescription = await getImcDescription(imc)

        if(wantToRegister == false){
            return {
            imc: imc,
            calculatedAt: calculatedAt,
            ImcMessage: resultGetImcDescription,
            ImcRegister: {
                success: null
            }
            }  
        }
        else {

            //faz cad no DB
            const ImcRegister = await ImcResults.create({ email: email, value: imc })
            .then(() => {
                return {
                    message: "IMC registrado no banco de dados com sucesso!",
                    success: true        
                }
            })
            .catch((err) => {
                return {
                    message: "Erro ao criar o usuário!: " + err,
                    success: false
                }
            });
            
            //Retorna tudo
            return {
                imc: imc,
                calculatedAt: calculatedAt,
                ImcMessage: resultGetImcDescription,
                ImcRegister: ImcRegister
                }  
        }

    }
}

module.exports = CalculateImcService
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    var date = new Date(Date.now());
    date = date.toISOString().slice(0, 19).replace('T', ' ');

      await queryInterface.bulkInsert('ImcData', [{
        start: 0,
        end: 18.4,
        description: "Abaixo do peso",
        createdAt: date,
        updatedAt: date
      },
      {
        start: 18.5,
        end: 24.9,
        description: "Peso normal",
        createdAt: date,
        updatedAt: date
      },
      {
        start: 25,
        end: 29.9,
        description: "Sobrepeso",
        createdAt: date,
        updatedAt: date
      },
      {
        start: 30,
        end: 34.9,
        description: "Obesidade Grau I",
        createdAt: date,
        updatedAt: date
      },
      {
        start: 35,
        end: 39.9,
        description: "Obesidade Grau II",
        createdAt: date,
        updatedAt: date
      },
      {
        start: 40,
        end: 1000,
        description: "Obesidade Mórbida",
        createdAt: date,
        updatedAt: date
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('ImcData', null, {});
     
  }
};

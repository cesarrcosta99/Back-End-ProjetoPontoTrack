'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('vehicle_locations', { 
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      vehicle_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'vehicles',
					key: 'id',
				},
				onDelete: 'CASCADE',
        onUpdate:'CASCADE',
				allowNull: false,
			},
      latitude:{
        type:Sequelize.DECIMAL(9,6),
        allowNull:false,
      },
      longitude:{
        type:Sequelize.DECIMAL(9,6),
        allowNull:false,
      },
      city:{
        type:Sequelize.STRING,
        allowNull:false
      },
      state:{
        type:Sequelize.STRING,
        allowNull:false
      },
      created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
    });
    
  },

  async down (queryInterface) {
     await queryInterface.dropTable('vehicle_locations');
     
  }
};

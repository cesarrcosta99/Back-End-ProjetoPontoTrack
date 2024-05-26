'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('vehicles', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			plate: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			brand: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			model: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			year: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			color: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			chassis_number: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			vehicle_type: {
				type: Sequelize.STRING,
				allowNull: false,
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

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('vehicles');
	},
};

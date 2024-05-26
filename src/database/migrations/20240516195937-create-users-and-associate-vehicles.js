'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
			password_hash: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			address: {
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

    await queryInterface.addColumn('vehicles', 'user_id', {
			type: Sequelize.UUID,
			references: {
				model: 'users',
				key: 'id',
			},
			onDelete: 'CASCADE',
			allowNull: false,
		});
	},

 

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('vehicles', 'user_id');
		await queryInterface.dropTable('users');
	},
};

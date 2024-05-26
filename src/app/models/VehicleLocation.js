import Sequelize, { Model } from 'sequelize';

class VehicleLocation extends Model {
	static init(sequelize) {
		super.init(
			{
				latitude: Sequelize.DECIMAL(9, 6),
				longitude: Sequelize.DECIMAL(9, 6),
				city: Sequelize.STRING,
				state: Sequelize.STRING,
			},
			{
				sequelize,
			},
		);
		return this;
	}

	static associate(models) {
		this.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });
	}
}

export default VehicleLocation;

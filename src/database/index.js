import Sequelize from 'sequelize';
import User from '../app/models/User';
import Vehicle from '../app/models/Vehicle';
import Location from '../app/models/VehicleLocation';
import ConfigDatabase from '../config/database';


const models = [User, Vehicle,Location];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(ConfigDatabase);
		models
			.map((model) => model.init(this.connection))
			.map((model) => model.associate && model.associate(this.connection.models));
	}
}

export default new Database();

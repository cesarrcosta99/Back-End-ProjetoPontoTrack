import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
	static init(sequelize) {
				super.init(
			{
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				password: Sequelize.VIRTUAL,
				password_hash: Sequelize.STRING,
				phone: Sequelize.STRING,
				address: Sequelize.STRING,
			},
			{
				sequelize,
			},
		);

		this.addHook('beforeSave', async (user) => {
			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 10);
			}
		});
		return this;
	}

	async verificationSenha(password) {
		return await bcrypt.compare(password, this.password_hash);
	}

	static associate(models) {
		this.hasMany(models.Vehicle, { foreignKey: 'user_id', as: 'vehicles' });
	}
}

export default User;



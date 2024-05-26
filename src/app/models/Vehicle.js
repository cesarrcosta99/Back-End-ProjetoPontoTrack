import Sequelize,{Model} from 'sequelize'

class Vehicle extends Model{
    static init(sequelize){
        super.init({
            plate:Sequelize.STRING,
            brand:Sequelize.STRING,
            model:Sequelize.STRING,
            year:Sequelize.INTEGER,
            color:Sequelize.STRING,
            chassis_number: Sequelize.STRING,
            vehicle_type: Sequelize.STRING,
        },{
            sequelize,
        })
        return this
    }

    static associate(models){
    this.belongsTo(models.User,{foreignKey:'user_id',as:'user'})
    this.hasMany(models.VehicleLocation, { foreignKey: 'vehicle_id', as: 'locations' });
    }
}

export default Vehicle

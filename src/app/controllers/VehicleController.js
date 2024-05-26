import * as Yup from 'yup';
import Vehicle from '../models/Vehicle';
import User from '../models/User';
import Location from '../models/VehicleLocation';

class VehicleController {
	async store(request, response) {
		const schema = Yup.object({
			plate: Yup.string().required(),
			brand: Yup.string().required(),
			model: Yup.string().required(),
			year: Yup.number().required(),
			color: Yup.string().required(),
			chassis_number: Yup.string().required(),
			vehicle_type: Yup.string().required(),
		});

		try {
			await schema.validate(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { plate, brand, model, year, color, chassis_number, vehicle_type } =
			request.body;
		const { userId } = request;

		const vehicleExist = await Vehicle.findOne({
			where: { plate },
		});
		const chassiUnique = await Vehicle.findOne({
			where: { chassis_number },
		});

		if (vehicleExist || chassiUnique) {
			return response.status(409).json({ error: 'Vehicle already exists' });
		}

		const vehicle = await Vehicle.create({
			user_id: userId,
			plate,
			brand,
			model,
			year,
			color,
			chassis_number,
			vehicle_type,
		});

		return response.status(201).json(vehicle)
	}

	async index(request, response) {
		const { userId } = request;

		const vehicles = await Vehicle.findAll({
			where: { user_id: userId },
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['name', 'email'],
				},
				{
					model: Location,
					as: 'locations',
				  },
			],
		});

		return response.json(vehicles);
	}

	async update(request, response) {
		const schema = Yup.object({
		  plate: Yup.string().required(),
		  brand: Yup.string().required(),
		  model: Yup.string().required(),
		  year: Yup.number().required(),
		  color: Yup.string().required(),
		  chassis_number: Yup.string().required(),
		  vehicle_type: Yup.string().required(),
		});
	
		try {
		  await schema.validate(request.body, { abortEarly: false });
		} catch (err) {
		  return response.status(400).json({ error: err.errors });
		}
	
		const { id } = request.params;
		const { plate, brand, model, year, color, chassis_number, vehicle_type } = request.body;
	
		const vehicle = await Vehicle.findByPk(id);
	
		if (!vehicle) {
		  return response.status(404).json({ error: 'Vehicle not found' });
		}
	
		await vehicle.update({
		  plate,
		  brand,
		  model,
		  year,
		  color,
		  chassis_number,
		  vehicle_type,
		});
	
		return response.json(vehicle);
	  }
}

export default new VehicleController();

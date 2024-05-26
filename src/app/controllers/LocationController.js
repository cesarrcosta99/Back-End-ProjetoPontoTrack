import * as Yup from 'yup';
import Location from '../models/VehicleLocation';
import Vehicle from '../models/Vehicle';
import { geocode, reverseGeocode } from '../services/geocoding';

class LocationController {
	async store(request, response) {
		const schema = Yup.object({
			vehicle_id: Yup.string().required(),
			latitude: Yup.number().required(),
			longitude: Yup.number().required(),
		});

		try {
			await schema.validate(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { vehicle_id, latitude, longitude } = request.body;

		const vehicle = await Vehicle.findByPk(vehicle_id);

		if (!vehicle) {
			return response.status(400).json({ error: 'Vehicle not found' });
		}

		const existingLocation = await Location.findOne({ where: { vehicle_id } });

		if (existingLocation) {
			return response
				.status(400)
				.json({ error: 'Location already exists for this vehicle' });
		}

		const { city, state } = await reverseGeocode(latitude, longitude);

		const location = await Location.create({
			vehicle_id,
			latitude,
			longitude,
			city,
			state,
		});

		const io = request.app.get('io');
		if (io) {
			io.emit('locationUpdate', {
				vehicle_id,
				latitude,
				longitude,
				city,
				state,
			});
		}

		return response.status(201).json(location);
	}

	async index(request, response) {
    const { vehicle_id } = request.params;
    const location = await Location.findOne({ where: { vehicle_id } });

    if (!location) {
      return response.status(404).json({ error: 'Location not found' });
    }

    return response.json(location);
  }

	async update(request, response) {
		const schema = Yup.object({
			city: Yup.string().required(),
			state: Yup.string().required(),
		});

		try {
			await schema.validate(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { vehicle_id } = request.params;
		const { city, state } = request.body;

		const vehicle = await Vehicle.findByPk(vehicle_id);

		if (!vehicle) {
			return response.status(400).json({ error: 'Vehicle not found' });
		}

		try {
			const { latitude, longitude } = await geocode(city, state);

			const location = await Location.update(
				{ latitude, longitude, city, state },
				{ where: { vehicle_id }, returning: true, plain: true },
			);

			const io = request.app.get('io');
			if (io) {
				io.emit('locationUpdate', {
					vehicle_id,
					latitude,
					longitude,
					city,
					state,
				});
			}

			return response.json(location[1]);
		} catch (error) {
			return response.status(500).json({ error: 'Error updating location' });
		}
	}
}

export default new LocationController();

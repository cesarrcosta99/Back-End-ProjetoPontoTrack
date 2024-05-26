import axios from 'axios';

export const geocode = async (city, state) => {
	const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
		city,
	)}&state=${encodeURIComponent(state)}&format=json&limit=1`;
	try {
		const response = await axios.get(url);
		if (response.data && response.data.length > 0) {
			const { lat, lon } = response.data[0];
			return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
		} else {
			throw new Error('No results found');
		}
	} catch (error) {
		throw new Error('Error in geocoding');
	}
};

export const reverseGeocode = async (latitude, longitude) => {
	const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
	try {
		const response = await axios.get(url);
		const address = response.data.address;
		return {
			city: address.city || '',
			state: address.state || '',
		};
	} catch (error) {
		throw new Error('Error in reverse geocoding');
	}
};

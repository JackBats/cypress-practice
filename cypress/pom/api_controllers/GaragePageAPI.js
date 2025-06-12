class GaragePageAPI {
	getCars() {
		return cy.request({
			method: 'GET',
			url: '/api/cars',
		});
	}

	addCar(carBrandId, carModelId, mileage) {
		return cy.request({
			method: 'POST',
			url: '/api/cars',
			body: {
				carBrandId,
				carModelId,
				mileage,
			},
		});
	}

	deleteCar(carId) {
		return cy.request({
			method: 'DELETE',
			url: `/api/cars/${carId}`,
		});
	}

	getCarById(carId) {
		return cy.request('GET', `/api/cars/${carId}`);
	}

	updateCar(carId, carBrandId, carModelId, mileage) {
		return cy.request({
			method: 'PUT',
			url: `/api/cars/${carId}`,
			body: {
				carBrandId: carBrandId,
				carModelId: carModelId,
				mileage: mileage
			},
		});
	}
}

export default new GaragePageAPI();

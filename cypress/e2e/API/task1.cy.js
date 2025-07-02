import GaragePageAPI from '../../pom/api_controllers/GaragePageAPI';
import HomePageAPI from '../../pom/api_controllers/HomePageAPI';

// Add car - POST
// Get list of added cars - GET
// Gwt car by ID - GET
// Edit added car - PUT
// Remove added car - DELETE

let addedCarIds = [];
const car = {
	carBrandId: 1,
	carModelId: 2,
	mileage: 123,
};

describe('Test Garage page API', () => {
	beforeEach(() => {
		HomePageAPI.login();
	});

	afterEach(() => {
		addedCarIds.forEach((id) => {
			GaragePageAPI.deleteCar(id);
		});
		addedCarIds = []; // очищення після кожного тесту
	});

	it('POST Add a car - POST and verify response', () => {
		const testcCar = {
			carBrandId: 2,
			carModelId: 8,
			mileage: 23000,
		};
		GaragePageAPI.addCar(testcCar.carBrandId, testcCar.carModelId, testcCar.mileage).then((response) => {
			const responseBody = response.body;
			expect(response.status).to.eq(201);
			expect(responseBody.status).to.eq('ok');

			const data = response.body.data;
			expect(data).to.have.property('id');
			expect(data.carBrandId).to.eq(testcCar.carBrandId);
			expect(data.carModelId).to.eq(testcCar.carModelId);
			expect(data.initialMileage).to.eq(testcCar.mileage);
			expect(data).to.have.property('updatedMileageAt');
			expect(data).to.have.property('mileage').to.eq(testcCar.mileage);
			expect(data).to.have.property('brand').to.eq('BMW');
			expect(data).to.have.property('model').to.eq('X5');
			expect(data).to.have.property('logo').to.contain('bmw');

			addedCarIds.push(data.id);
		});
	});

	it('GET list of added cars - GET and verify response', () => {
		GaragePageAPI.addCar(car.carBrandId, car.carModelId, car.mileage);

		cy.request('GET', '/api/cars').then((response) => {
			const responseBody = response.body.data;
			expect(response.status).to.eq(200);
			expect(response.body.status).to.eq('ok');
			expect(responseBody).to.be.an('array');
			expect(responseBody.length).to.be.greaterThan(0);
			responseBody.forEach((car) => {
				expect(car).to.have.property('id');
				expect(car).to.have.property('carBrandId');
				expect(car).to.have.property('carModelId');
				expect(car).to.have.property('initialMileage');
				expect(car).to.have.property('updatedMileageAt');
				expect(car).to.have.property('carCreatedAt');
				expect(car).to.have.property('mileage');
				expect(car).to.have.property('brand');
				expect(car).to.have.property('model');
				expect(car).to.have.property('logo');

				addedCarIds.push(car.id);
			});
		});
	});

	it('DELETE added car  - DELETE and verify response', () => {
		GaragePageAPI.addCar(car.carBrandId, car.carModelId, car.mileage).then((response) => {
			const addedCarID = response.body.data.id;

			GaragePageAPI.deleteCar(addedCarID).then((deleteResponse) => {
				expect(deleteResponse.status).to.eq(200);
				expect(deleteResponse.body.status).to.eq('ok');
				expect(deleteResponse.body.data.carId).to.eq(addedCarID);
			});
		});
	});

	it('GET car info by ID - GET and verfy response', () => {
		GaragePageAPI.addCar(car.carBrandId, car.carModelId, car.mileage).then((response) => {
			const addedCarID = response.body.data.id;

			GaragePageAPI.getCarById(addedCarID).then((response) => {
				const responseBody = response.body.data;
				expect(response.status).to.eq(200);
				expect(response.body.status).to.eq('ok');
				expect(responseBody).to.have.property('id').to.eq(addedCarID);
				expect(responseBody).to.have.property('carBrandId').to.eq(car.carBrandId);
				expect(responseBody).to.have.property('carModelId').to.eq(car.carModelId);
				expect(responseBody).to.have.property('initialMileage').to.eq(car.mileage);
				expect(responseBody).to.have.property('updatedMileageAt');
				expect(responseBody).to.have.property('carCreatedAt');
				expect(responseBody).to.have.property('mileage');
				expect(responseBody).to.have.property('brand').to.eq('Audi');
				expect(responseBody).to.have.property('model').to.eq('R8');
				expect(responseBody).to.have.property('logo').contain('audi');

				addedCarIds.push(responseBody.id);
			});
		});
	});

	it('Update car info - PUT and verify response', () => {
		GaragePageAPI.addCar(car.carBrandId, car.carModelId, car.mileage).then((response) => {
			const addedCarID = response.body.data.id;
			const updateCarInfo = {
				carBrandId: 3,
				carModelId: 11,
				mileage: 13000,
			};

			GaragePageAPI.updateCar(
				addedCarID,
				updateCarInfo.carBrandId,
				updateCarInfo.carModelId,
				updateCarInfo.mileage,
			).then((updatedResponse) => {
				const responseBody = updatedResponse.body.data;

				cy.log(JSON.stringify(responseBody));

				expect(updatedResponse.status).to.eq(200);
				expect(updatedResponse.body.status).to.eq('ok');
				expect(responseBody).to.have.property('id').to.eq(addedCarID);
				expect(responseBody).to.have.property('carBrandId').to.eq(updateCarInfo.carBrandId);
				expect(responseBody).to.have.property('carModelId').to.eq(updateCarInfo.carModelId);
				expect(responseBody).to.have.property('initialMileage').to.eq(car.mileage);
				expect(responseBody).to.have.property('updatedMileageAt');
				expect(responseBody).to.have.property('carCreatedAt');
				expect(responseBody).to.have.property('mileage').to.eq(updateCarInfo.mileage);
				expect(responseBody).to.have.property('brand').to.eq('Ford');
				expect(responseBody).to.have.property('model').to.eq('Fiesta');
				expect(responseBody).to.have.property('logo').contain('ford');

				addedCarIds.push(responseBody.id);
			});
		});
	});
});

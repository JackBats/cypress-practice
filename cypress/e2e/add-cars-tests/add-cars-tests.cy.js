import SignInFom from '../../pom/forms/SignInFom';
import HomePage from '../../pom/pages/HomePage';
import GaragePage from '../../pom/pages/GaragePage';
import AddCarForm from '../../pom/forms/AddCarForm';


describe('Add Cars Tests', () => {
	beforeEach(() => {
		GaragePage.visitPageAsLoggedInUser();
		cy.fixture('cars').as('carsData');
	});


	
	describe('Add a car form tests', () => {
		context('Negative tests', () => {
			it('Verify the Mileage input field error message [empty state]', () => {
				GaragePage.addCarButton.click();
				AddCarForm.mileageInput.should('be.visible');
				AddCarForm.mileageInput.focus().blur();
				AddCarForm.mileageError().should('be.visible');
				AddCarForm.mileageError().should('have.text', 'Mileage cost required');
			});

			it('Verify the Mileage input field error message [>=0]', () => {
				const negativeMileage = [-1, -100, -999999];
				GaragePage.addCarButton.click();
				AddCarForm.mileageInput.should('be.visible');
				negativeMileage.forEach((mileage) => {
					AddCarForm.mileageInput.clear().type(mileage).blur();
					AddCarForm.mileageError().should('be.visible');
					AddCarForm.mileageError().should('have.text', 'Mileage has to be from 0 to 999999');
					AddCarForm.addButton.should('be.disabled');
				});
			});

			it('Verify the Mileage input field error message [<=999999]', () => {
				const negativeMileage = [1000000, 1000001, 9999999];
				GaragePage.addCarButton.click();
				AddCarForm.mileageInput.should('be.visible');
				negativeMileage.forEach((mileage) => {
					AddCarForm.mileageInput.clear().type(mileage).blur();
					AddCarForm.mileageError().should('be.visible');
					AddCarForm.mileageError().should('have.text', 'Mileage has to be from 0 to 999999');
					AddCarForm.addButton.should('be.disabled');
				});
			});

			it('Verify a car cannot be added without entering mileage', () => {
				GaragePage.addCarButton.click();
				AddCarForm.mileageInput.clear().type(' ').blur();
				AddCarForm.mileageError().should('be.visible');
				AddCarForm.mileageError().should('have.text', 'Mileage cost required');
				AddCarForm.addButton.should('be.disabled');
			});
		});

		context('Positive tests', () => {
			it('Veify the Add a car form ', () => {
				GaragePage.garageTitle.should('be.visible');
				GaragePage.addCarButton.click();
				AddCarForm.title.should('have.text', 'Add a car');
				AddCarForm.closeButton.should('be.visible');
				AddCarForm.brandDropdown.should('be.visible');
				AddCarForm.modelDropdown.should('be.visible');
				AddCarForm.mileageInput.should('be.visible');
				AddCarForm.cancelButton.should('be.visible');
				AddCarForm.addButton.should('be.visible');
				AddCarForm.addButton.should('be.disabled');
			});

			it('Verify closing the Add a car form', () => {
				GaragePage.addCarButton.click();
				AddCarForm.closeButton.click();
				AddCarForm.addCarForm.should('not.exist');
			});

			it('Verify canceling the Add a car form', () => {
				GaragePage.addCarButton.click();
				AddCarForm.cancelButton.click();
				AddCarForm.addCarForm.should('not.exist');
			});
		});
	});

	describe('Adding and verifying cars', () => {
		// it('Add [Audi] [Q7] car', () => {
		// 	GaragePage.addNewCar('Audi', 'Q7', 10000);
		// 	GaragePage.verifyLastAddedCar('Audi', 'Q7', 10000);
		// });

		// it('Add [BMW] [X5] car', () => {
		// 	GaragePage.addNewCar('BMW', 'X5', 7500);
		// 	GaragePage.verifyLastAddedCar('BMW', 'X5', 7500);
		// });

		// it('Add [Ford] [Fusion] car', () => {
		// 	GaragePage.addNewCar('Ford', 'Fusion', 3244);
		// 	GaragePage.verifyLastAddedCar('Ford', 'Fusion', 3244);
		// });

		// it('Add [Porsche] [911] car', () => {
		// 	GaragePage.addNewCar('Porsche', '911', 23560);
		// 	GaragePage.verifyLastAddedCar('Porsche', '911', 23560);
		// });

		// it('Add [Fiat] [Ducato] car', () => {
		// 	GaragePage.addNewCar('Fiat', 'Ducato', 17300);
		// 	GaragePage.verifyLastAddedCar('Fiat', 'Ducato', 17300);
		// });

		it('should add all cars by brand and model', function () {
			Object.entries(this.carsData).forEach(([brand, models]) => {
				models.forEach((model) => {
					const mileage = Math.floor(Math.random() * 100000);
					GaragePage.addNewCar(brand, model, mileage);
					GaragePage.verifyLastAddedCar(brand, model, mileage);
				});
			});
		});
	});
});


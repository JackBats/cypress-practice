import HomePage from './HomePage';
import SignInFom from '../../pom/forms/SignInFom';
import AddCarForm from '../forms/AddCarForm';
import { faker } from '@faker-js/faker';
import AddExpensesForm from '../forms/AddExpensesForm';


class Garage {
	visit() {
		cy.visit('/panel/garage');
	}

	get garageTitle() {
		return cy.contains('h1', 'Garage');
	}

	get addCarButton() {
		return cy.get('div.panel-page_heading .btn-primary');
	}

	get carsList() {
		return cy.get('.car-item');
	}

	get carsNames() {
		return cy.get('.car_name');
	}

	get carsMileage() {
		return cy.get('input[formcontrolname="miles"]');
	}

  get addExpenseButton() {
    return cy.get('div.panel-page_content .car_add-expense');
  }

  get editCarButton() {
    return cy.get('div.panel-page_content .car_edit');
  }

  get removeCarButton() {
    return cy.contains('button', 'Remove car');
  }

  get deleteCarButton() {
    return cy.get('.car-remove');
  }

  get noCarMessage() {
    return cy.get('p.panel-empty_message');
  }

  clickAddExpenseButtonByCarName(brand, model) {
        cy.get('.car-item').contains('.car_name', `${brand} ${model}`)
      .parents('.car-item')
      .find('.car_add-expense')
      .click();
  }

	visitPageAsLoggedInUser() {
		HomePage.visit();
		HomePage.openSignInModal();
		// Using credentials from cypress.config.js
		SignInFom.signIn(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
		this.garageTitle.should('be.visible');
	}

	addNewCar(brand, model, mileage) {
		this.addCarButton.click();
		AddCarForm.brandDropdown.select(brand);
		AddCarForm.modelDropdown.select(model);
		AddCarForm.mileageInput.type(mileage);
		AddCarForm.addButton.click();
	}

	verifyLastAddedCar(brand, model, mileage) {
		this.carsList.first().within(() => {
			this.carsNames.should('contain', `${brand} ${model}`);
			this.carsMileage.should('have.value', mileage.toString());
		});
	}

	addRandomCar() {
		return cy.fixture('cars').then((carsData) => {
			const brands = Object.keys(carsData);
			const randomBrand = brands[Math.floor(Math.random() * brands.length)];
			const randomModel = carsData[randomBrand][Math.floor(Math.random() * carsData[randomBrand].length)];
			const mileage = Math.floor(Math.random() * 100000);


			const selectedCar = { brand: randomBrand, model: randomModel, mileage };
			this.addNewCar(selectedCar.brand, selectedCar.model, selectedCar.mileage);

			cy.wrap(selectedCar).as('selectedCar');
      return cy.wrap(selectedCar);
  	});
	}

  removeCar(){
    this.visit();
    this.carsList.first()
      this.editCarButton.click();
      this.removeCarButton.click();
      cy.get('button.btn-danger').contains('Remove').click();
      this.carsList.should('not.exist');
      this.noCarMessage.should('be.visible').and('contain', 'You don’t have any cars in your garage');
  }
}
export default new Garage();



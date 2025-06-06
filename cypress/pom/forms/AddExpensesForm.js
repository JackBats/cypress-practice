class AddExpensesForm {

    get addexpenseForm() {
        return cy.get('.modal-content');
    }

    get title() {
        return cy.get('.modal-header');
    }

    get vehicleDropdown() {
        return cy.get('#addExpenseCar');
    }

    get dateInput() {
        return cy.get('#addExpenseDate');
    }

    get mileageInput() {
        return cy.get('#addExpenseMileage');
    }

    get mileageErrorMessage() {
        return cy.get('div.invalid-feedback p');
    }
    
    get litersInput() {
        return cy.get('#addExpenseLiters');
    }

    get litersErrorMessage() {
        return cy.get('div.invalid-feedback p');
    }

    get totalCostInput() {
        return cy.get('#addExpenseTotalCost');
    }

    get totalCostErrorMessage() {
        return cy.get('div.invalid-feedback p');
    }

    get cancelButton() {
    return cy.contains('button', 'Cancel');
  }

  get addButton() {
    return cy.get('div.modal-footer .btn-primary');
  }

  get errorMessage() {
        return cy.get('form > p.alert-danger');
    }

    verifyMileageInputErrorState() {
        this.mileageInput.should ('have.css', 'border-color', 'rgb(220, 53, 69)');
    }


    selectVehicle(vehicle) {
        this.vehicleDropdown.select(vehicle);
    }

    enterDate(date) {
        this.dateInput.clear().type(date);
    }

    enterMileage(mileage) {
        this.mileageInput.clear().type(mileage);
    }

    enterLiters(liters) {
        this.litersInput.clear().type(liters);
    }

    enterTotalCost(totalCost) {
        this.totalCostInput.clear().type(totalCost);
    }

    cancelForm() {
        this.cancelButton.click();
    }

    submitForm() {
        this.addButton.click();
    }

    fillForm(vehicle, date, mileage, liters, totalCost) {
        this.selectVehicle(vehicle);
        this.enterDate(date);
        this.enterMileage(mileage);
        this.enterLiters(liters);
        this.enterTotalCost(totalCost);
        this.addButton.click();
    }

    verifyErrorMessage(expectedMessage) {
        this.errorMessage.should('be.visible').and('have.text', expectedMessage);
    }

    getFutureDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return (
            ('0' + tomorrow.getDate()).slice(-2) + '.' +
            ('0' + (tomorrow.getMonth() + 1)).slice(-2) + '.' +
            tomorrow.getFullYear()
        );
    }

    getPastDate() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    ('0' + yesterday.getDate()).slice(-2) + '.' +
    ('0' + (yesterday.getMonth() + 1)).slice(-2) + '.' +
    yesterday.getFullYear()
  );
}
    
}

export default new AddExpensesForm();
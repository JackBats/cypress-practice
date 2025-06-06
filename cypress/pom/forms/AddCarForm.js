import GaragePage from "../pages/GaragePage";

class AddCarForm {

    get addCarForm(){
    return cy.get('div.modal-content');
    }
  get title() {
    return cy.get('.modal-title');
  }

  get closeButton() {
    return cy.get('.close');
  }

  get brandDropdown() {
    return cy.get('#addCarBrand');
  }

  get modelDropdown() {
    return cy.get('#addCarModel');
  }

  get mileageInput() {
    return cy.get('#addCarMileage');
 }

  get cancelButton() {
    return cy.contains('button', 'Cancel');
  }

  get addButton() {
    return cy.get('div.modal-footer .btn-primary');
  }

  selectBrand(brand) {
    this.brandDropdown.select(brand);
  }

  selectModel(model) {
    this.modelDropdown.select(model);
  }

  enterMileage(mileage) {
    this.mileageInput.type(mileage);
  }

  mileageError() {
    return cy.get('.invalid-feedback > p');
  }

  fillForm(brand, model, mileage) {
    GaragePage.addCarButton.click();
    this.selectBrand(brand);
    this.selectModel(model);
    this.enterMileage(mileage);
    this.addButton.click();
  }

  submitForm() {
    this.addButton.click();
  }

  cancelForm() {
    this.cancelButton.click();
  } 

  closeForm() {
    this.closeButton.click();
  }
}

export default new AddCarForm();
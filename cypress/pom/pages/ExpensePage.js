import AddExpensesForm from '../../pom/forms/AddExpensesForm';

class ExpensePage {

     visit() {
        cy.visit('/panel/expenses');
    }

    get expensesTitle() {
        return cy.contains('h1', 'Fuel expenses');
    }

    get vehiclesDropdown() {
        return cy.get('#carSelectDropdown');
    }

    get addExpenseButton() {
        return cy.get('div.panel-page_heading .btn-primary');
    }

    get expenseDate() {
        return cy.get('tbody td:nth-child(1)');
    }

    get expenseMileage() {
        return cy.get('tbody td:nth-child(2)');
    }

    get expenseLiters() {
        return cy.get('tbody td:nth-child(3)');
    }

    get expenseTotalCost() {
        return cy.get('tbody td:nth-child(4)');
    }

    clickAddExpenseButton() {
        this.addExpenseButton.click();
    }

    verifyLatestExpense({ vehicle, date, mileage, liters, totalCost }) {
  this.vehiclesDropdown.should('contain', vehicle);
        this.expenseDate.first().should('contain', date);
  this.expenseMileage.first().should('contain', mileage);
  this.expenseLiters.first().should('contain', `${liters}L`);
  this.expenseTotalCost.first().should('contain', `${totalCost} USD`);
}

    getTodayFormatted() {
  const today = new Date();
  return today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).split('/').join('.');
}

    // addExpenseForCar(car) {
    //     // const expenseData = {
    //     //     mileage: Number(car.mileage) + 10,
    //     //     liters: '50',
    //     //     totalCost: '15.50'
    //     // };

    //     this.visit();
    //     this.expensesTitle.should('be.visible');
    //     this.clickAddExpenseButton();
    //     AddExpensesForm.fillForm(expenseData.mileage, expenseData.liters, expenseData.totalCost);

    //     this.verifyLatestExpense({
    //         date: this.getTodayFormatted(),
    //         ...expenseData
    //     });
    // }

    // addExpenseForCurrentCar() {
    //     cy.get('@selectedCar').then(car => {
    //         this.addExpenseForCar(car);
    //     });
    // }

}

export default new ExpensePage();
import GaragePage from '../../pom/pages/GaragePage';
import AddExpensesForm from '../../pom/forms/AddExpensesForm';
import ExpensePage from '../../pom/pages/ExpensePage';

describe('Add an expense tests', () => {
	beforeEach(() => {
		GaragePage.visitPageAsLoggedInUser();
	});

	afterEach(() => {
		GaragePage.removeCar();
	});

	context('Add an expense for the car', () => {
		it('Add an expense from the Garage page', () => {
			GaragePage.addRandomCar().then((car) => {
				const expenseData = {
					mileage: Number(car.mileage) + 10,
					liters: '50',
					totalCost: '25.50',
					date: ExpensePage.getTodayFormatted(),
				};

				GaragePage.clickAddExpenseButtonByCarName(car.brand, car.model);
				AddExpensesForm.fillForm(`${car.brand} ${car.model}`,expenseData.date,expenseData.mileage,expenseData.liters,expenseData.totalCost,);
				ExpensePage.verifyLatestExpense({vehicle: `${car.brand} ${car.model}`,date: expenseData.date,mileage: expenseData.mileage,liters: expenseData.liters,totalCost: expenseData.totalCost,});
			});
		});

		it('Add an expense from the Expense page', () => {
			GaragePage.addRandomCar().then((car) => {
				const expenseData = {
					mileage: Number(car.mileage) + 10,
					liters: '50',
					totalCost: '25.50',
					date: ExpensePage.getTodayFormatted(),
				};

				ExpensePage.visit();
				ExpensePage.clickAddExpenseButton();
				AddExpensesForm.fillForm(`${car.brand} ${car.model}`,expenseData.date,expenseData.mileage,expenseData.liters,expenseData.totalCost,
				);
				ExpensePage.verifyLatestExpense({vehicle: `${car.brand} ${car.model}`,date: expenseData.date,mileage: expenseData.mileage,liters: expenseData.liters,totalCost: expenseData.totalCost,});
			});
		});
	});
});

describe('Add an expense form tests', () => {
	beforeEach(() => {
		GaragePage.visitPageAsLoggedInUser();
	});

	afterEach(() => {
		GaragePage.removeCar();
	});

	context('Negative tests', () => {
		it('Check the form elements', () => {
			GaragePage.addRandomCar().then((car) => {
				GaragePage.clickAddExpenseButtonByCarName(car.brand, car.model);
				AddExpensesForm.vehicleDropdown.should('be.visible');
				AddExpensesForm.dateInput.should('be.visible');
				AddExpensesForm.mileageInput.should('be.visible');
				AddExpensesForm.litersInput.should('be.visible');
				AddExpensesForm.totalCostInput.should('be.visible');
				AddExpensesForm.cancelButton.should('be.visible');
				AddExpensesForm.addButton.should('be.visible');
			});
		});

		it('Check the error message for Mileage input field', () => {
			GaragePage.addRandomCar().then((car) => {
				GaragePage.clickAddExpenseButtonByCarName(car.brand, car.model);

				AddExpensesForm.mileageInput.clear().blur();
				AddExpensesForm.verifyMileageInputErrorState();
				AddExpensesForm.mileageErrorMessage.should('be.visible').and('contain', 'Mileage required');

				const invalidMileage = ['-1', '-1000000', '1000000'];
				invalidMileage.forEach((mileage) => {
					AddExpensesForm.enterMileage(mileage);
					AddExpensesForm.verifyMileageInputErrorState();
					AddExpensesForm.mileageErrorMessage.should('be.visible').and('contain', 'Mileage has to be from 0 to 999999');
                    AddExpensesForm.addButton.should('be.disabled');
				});
			});
		});

		it('Check the error message for Liters input field', () => {
			GaragePage.addRandomCar().then((car) => {
				GaragePage.clickAddExpenseButtonByCarName(car.brand, car.model);

				AddExpensesForm.litersInput.clear().blur();
				AddExpensesForm.litersErrorMessage.should('be.visible').and('contain', 'Liters required');

				const invalidLiters = ['0.001', '-1', '-1000000', '10000'];
				invalidLiters.forEach((liters) => {
					AddExpensesForm.enterLiters(liters);
					AddExpensesForm.litersErrorMessage.should('be.visible').and('contain', 'Liters has to be from 0.01 to 9999');
                    AddExpensesForm.addButton.should('be.disabled');

				});
			});
		});

		it('Check the error message for Total Cost input field', () => {
			GaragePage.addRandomCar().then((car) => {
				GaragePage.clickAddExpenseButtonByCarName(car.brand, car.model);

				AddExpensesForm.totalCostInput.clear().blur();
				AddExpensesForm.totalCostErrorMessage.should('be.visible').and('contain', 'Total cost required');

				const invalidTotalCost = ['0.001', '-1', '-1000000', '1000001'];
				invalidTotalCost.forEach((totalCost) => {
					AddExpensesForm.enterTotalCost(totalCost);
					AddExpensesForm.totalCostErrorMessage
						.should('be.visible')
						.and('contain', 'Total cost has to be from 0.01 to 1000000');
                    AddExpensesForm.addButton.should('be.disabled');

				});
			});
		});

		it('Verify the future date error message', () => {
			GaragePage.addRandomCar().then((car) => {

                const expenseData = {
					mileage: Number(car.mileage) + 10,
					liters: '50',
					totalCost: '25.50',
					date: AddExpensesForm.getFutureDate(),
				};

				GaragePage.clickAddExpenseButtonByCarName(car.brand, car.model);
				AddExpensesForm.fillForm(`${car.brand} ${car.model}`,expenseData.date,expenseData.mileage,expenseData.liters,expenseData.totalCost,);
				AddExpensesForm.errorMessage.should('be.visible').and('contain', 'Report date has to be less than tomorrow');
			});
		});

        it('Verify the future date error message', () => {
			GaragePage.addRandomCar().then((car) => {

                const expenseData = {
					mileage: Number(car.mileage) + 10,
					liters: '50',
					totalCost: '25.50',
					date: AddExpensesForm.getPastDate(),
				};

				GaragePage.clickAddExpenseButtonByCarName(car.brand, car.model);
				AddExpensesForm.fillForm(`${car.brand} ${car.model}`,expenseData.date,expenseData.mileage,expenseData.liters,expenseData.totalCost,);
				AddExpensesForm.errorMessage.should('be.visible').and('contain', 'New expense date must not be less than car creation date.');
			});
		});

        it('Verify the error message when adding an expense with a mileage equal to car initial mileage', () => {
            GaragePage.addRandomCar().then((car) => {
                const expenseData = {
                    mileage: Number(car.mileage),
                    liters: '50',
                    totalCost: '25.50',
                    date: ExpensePage.getTodayFormatted(),
                };

                GaragePage.clickAddExpenseButtonByCarName(car.brand, car.model);
                AddExpensesForm.fillForm(`${car.brand} ${car.model}`,expenseData.date,expenseData.mileage,expenseData.liters,expenseData.totalCost,);
                AddExpensesForm.errorMessage.should('be.visible').and('contain', `First expense mileage must not be less or equal to car initial mileage. Car initial mileage is ${car.mileage}`);
            });
        });
	});
});

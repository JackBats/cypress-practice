/// <reference types="cypress" />

beforeEach(() => {
	cy.visit('/', {
		auth: {
			username: 'guest',
			password: 'welcome2qauto',
		},
	});
	cy.get('button.hero-descriptor_btn').click();
});

describe('Name Field tests', () => {
	context('Negative tests', () => {
		it('Check the Name field is requiered - "Name required" error message', () => {
			cy.get('#signupName').focus().blur();
			cy.get('.invalid-feedback > p')
				.should('contain', 'Name required')
				.should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});

		it('Check the Last Name field is filled with invalid data - "Name is invalid" error message', () => {
			const invalidNames = ['123', '  John  ', 'Yevhen!@#$', 'Євген'];
			invalidNames.forEach((Name) => {
				cy.get('#signupName').clear().type(Name).blur();
				cy.get('.invalid-feedback > p')
					.should('contain', 'Name is invalid')
					.should('have.css', 'border-color', 'rgb(220, 53, 69)');
			});
		});

		it('Length validation - should show error for less than 2 characters', () => {
			cy.get('#signupName').clear().type('A').blur();
			cy.get('.invalid-feedback > p')
				.should('contain', 'Name has to be from 2 to 20 characters long')
				.should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});

		it('Length validation - should show error for more than 20 characters', () => {
			cy.get('#signupName').clear().type('A'.repeat(21)).blur();
			cy.get('.invalid-feedback > p')
				.should('contain', 'Name has to be from 2 to 20 characters long')
				.should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
	});

	context('Positive tests', () => {
		it('Check the Name field is filled with valid data', () => {
			const validNames = ['Valera', 'Misha', 'Yevhen'];
			validNames.forEach((Name) => {
				cy.get('#signupName').clear().type(Name).blur();
				cy.get('.invalid-feedback > p').should('not.exist');
				cy.get('#signupName').should('have.css', 'border-color').and('not.eq', 'rgb(220, 53, 69)');
			});
		});
	});
});

describe('Last Name Field tests', () => {
	context('Negative tests', () => {
		it('Check the Last Name field is required - "Last name required" error message', () => {
			cy.get('#signupLastName').focus().blur();
			cy.get('.invalid-feedback > p')
				.should('contain', 'Last name required')
				.should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});

		it('Check the Last Name field is filled with invalid data - "Last name is invalid" error message', () => {
			const invalidLastNames = ['123', '  Doe  ', 'Yevhen!@#$', 'Євген'];
			invalidLastNames.forEach((lastName) => {
				cy.get('#signupLastName').clear().type(lastName).blur();
				cy.get('.invalid-feedback > p')
					.should('contain', 'Last name is invalid')
					.should('have.css', 'border-color', 'rgb(220, 53, 69)');
			});
		});

		it('Length validation - should show error for less than 2 characters', () => {
			cy.get('#signupLastName').clear().type('A').blur();
			cy.get('.invalid-feedback > p')
				.should('contain', 'Last name has to be from 2 to 20 characters long')
				.should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});

		it('Length validation - should show error for more than 20 characters', () => {
			cy.get('#signupLastName').clear().type('A'.repeat(21)).blur();
			cy.get('.invalid-feedback > p')
				.should('contain', 'Last name has to be from 2 to 20 characters long')
				.should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
	});

	context('Positive tests', () => {
		it('Check the Last Name field is filled with valid data', () => {
			const validLastNames = ['Doe', 'Smith', 'Johnson'];
			validLastNames.forEach((lastName) => {
				cy.get('#signupLastName').clear().type(lastName).blur();
				cy.get('.invalid-feedback > p').should('not.exist');
				cy.get('#signupLastName').should('have.css', 'border-color').and('not.eq', 'rgb(220, 53, 69)');
			});
		});
	});
});

describe('Email Field tests', () => {
	context('Negative tests', () => {
		it('Check the Email field is required - "Email required" error message', () => {
			cy.get('#signupEmail').focus().blur();
			cy.get('.invalid-feedback > p')
				.should('contain', 'Email required')
				.should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});

		it('Check the Email field is filled with invalid data - "Email is incorrect" error message', () => {
			const invalidEmails = [
				'plainaddress',
				'@missingusername.com',
				'username@.com',
				'username@domain..com',
				'username@domain,com',
				'username@domain com',

				'username@domain.c',
			];
			invalidEmails.forEach((email) => {
				cy.get('input[name="email"]').clear().type(email).blur();
				cy.get('.invalid-feedback > p')
					.should('contain', 'Email is incorrect')
					.should('have.css', 'border-color', 'rgb(220, 53, 69)');
			});
		});
	});

	context('Positive tests', () => {
		it('Check the Email field is filled with valid data', () => {
			const validEmails = ['test@mail.com', 'test1234@mail.com', '1234Test@gmail.com'];
			validEmails.forEach((email) => {
				cy.get('#signupEmail').clear().type(email).blur();
				cy.get('.invalid-feedback > p').should('not.exist');
				cy.get('#signupEmail').should('have.css', 'border-color').and('not.eq', 'rgb(220, 53, 69)');
			});
		});
	});

	describe('Password Field tests', () => {
		context('Negative tests', () => {
			it('Check the Password field is required - "Password required" error message', () => {
				cy.get('#signupPassword').focus().blur();
				cy.get('.invalid-feedback > p')
					.should('contain', 'Password required')
					.should('have.css', 'border-color', 'rgb(220, 53, 69)');
			});

			it('Check the Password field is filled with invalid data - "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" error message', () => {
				const invalidPasswords = [
					'A1bc',
					'Ab1defghijklmnop',
					'Abcdefgh',
					'abc12345',
					'abc12345',
					'12345678',
					'AbcDefGhi',
				];
				invalidPasswords.forEach((password) => {
					cy.get('#signupPassword').clear().type(password).blur();
					cy.get('.invalid-feedback > p')
						.should(
							'contain',
							'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
						)
						.should('have.css', 'border-color', 'rgb(220, 53, 69)');
				});
			});
		});
	});

	describe('Re-enter Password Field tests', () => {
		context('Negative tests', () => {
			it('Check the Password field is filled with invalid data - "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" error message', () => {
				cy.get('#signupRepeatPassword').focus().blur();
				cy.get('.invalid-feedback > p')
					.should('contain', 'Re-enter password required')
					.should('have.css', 'border-color', 'rgb(220, 53, 69)');
			});

			it('Check the Re-enter Password field is filled with invalid data - "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" error message', () => {
				const invalidPasswords = [
					'A1bc',
					'Ab1defghijklmnop',
					'Abcdefgh',
					'abc12345',
					'abc12345',
					'12345678',
					'AbcDefGhi',
				];
				invalidPasswords.forEach((password) => {
					cy.get('#signupRepeatPassword').clear().type(password).blur();
					cy.get('.invalid-feedback > p')
						.should(
							'contain',
							'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
						)
						.should('have.css', 'border-color', 'rgb(220, 53, 69)');
				});
			});
		});
	});

	context('Positive tests', () => {
		it('Check the Re-enter Password field matches the Password field', () => {
			const validPassword = 'Test1234';

			cy.get('#signupPassword').clear().type(validPassword);
			cy.get('#signupRepeatPassword').clear().type(validPassword).blur();

			cy.get('#signupRepeatPassword').should('have.css', 'border-color').and('not.eq', 'rgb(220, 53, 69)');

			cy.get('.invalid-feedback > p').should('not.exist');
		});
	});
});

describe('Register Button tests', () => {
	context('Negative tests', () => {
		it('Check the Register button is disabled when all fields are empty', () => {
			cy.get('.modal-footer > .btn.btn-primary').should('be.disabled');
		});

		it('Check the Register button is disabled when some fields are filled with invalid data', () => {
			cy.get('#signupName').type('John');
			cy.get('#signupLastName').type('Doe');
			cy.get('#signupEmail').type('test@mail.com');
			cy.get('.modal-footer > .btn.btn-primary').should('be.disabled');
		});

		it('Check the Register button is disabled when at least one field is empty', () => {
			cy.get('#signupName').type('John');
			cy.get('#signupEmail').type('test@test.com');
			cy.get('#signupPassword').type('Test1234');
			cy.get('#signupRepeatPassword').type('Test1234');
			cy.get('.modal-footer > .btn.btn-primary').should('be.disabled');
		});

		it('Check the Register button is disabled when any field is filled with invalid data', () => {
			cy.get('#signupPassword').type('short');
			cy.get('#signupRepeatPassword').type('short');
			cy.get('.invalid-feedback > p')
				.should(
					'contain',
					'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
				)
				.should('have.css', 'border-color', 'rgb(220, 53, 69)');
			cy.get('.modal-footer > .btn.btn-primary').should('be.disabled');
		});
	});

	context('Positive tests', () => {
		it('Check the Register button is enabled when all fields are filled with valid data', () => {
			const email = `qa1.tester.001+test${Date.now()}@gmail.com`;
			cy.get('#signupName').type('Tester');
			cy.get('#signupLastName').type('Toster');
			cy.get('#signupEmail').type(email);
			cy.get('#signupPassword').type('Test1234');
			cy.get('#signupRepeatPassword').type('Test1234');
			cy.get('.modal-footer > .btn.btn-primary').should('be.enabled');
		});

		it('User Registration', () => {
			const email = `qa1.tester.001+test${Date.now()}@gmail.com`;
			cy.get('#signupName').type('Tester');
			cy.get('#signupLastName').type('Toster');
			cy.get('#signupEmail').type(email);
			cy.get('#signupPassword').type('Test1234');
			cy.get('#signupRepeatPassword').type('Test1234');
			cy.get('.modal-footer > .btn.btn-primary').click();

			// Verify successful registration
			cy.url().should('include', '/panel/garage');
			cy.get('.alert-wrap').should('be.visible').should('contain', 'Registration complete');
			cy.get('h1').should('contain', 'Garage');
		});
	});
});

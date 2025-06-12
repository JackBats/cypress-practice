import 'cypress-plugin-api';
class HomePageAPI {
	login() {
		return cy.request('POST', '/api/auth/signin', {
			email: Cypress.env('TEST_USER_EMAIL'),
			password: Cypress.env('TEST_USER_PASSWORD'),
			remember: false,
		});
	}
	signUp(data) {
		return cy.api('POST', '/api/auth/signup', {
			
				name: data.name,
				lastName: data.lastName,
				email: data.email,
				password: data.password,
				repeatPassword: data.repeatPassword,
			
		});
	}

	
}

export default new HomePageAPI();

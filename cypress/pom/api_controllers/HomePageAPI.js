class HomePageAPI {

    login(){
        cy.request('POST', '/api/auth/signin', {
			email: Cypress.env('TEST_USER_EMAIL'),
			password: Cypress.env('TEST_USER_PASSWORD'),
			remember: false,
		});
    }
}

export default new HomePageAPI();
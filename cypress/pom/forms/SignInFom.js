class SignInForm {
	visit() {
		cy.visit('/');
	}

	get modalWindow() {
		return cy.get('modal-content');
	}

	get emailInput() {
		return cy.get('#signinEmail');
	}

	get passwordInput() {
		return cy.get('#signinPassword');
	}

	get signInButton() {
		return cy.get('app-signin-modal .btn-primary');
	}

	enterEmail(email) {
		this.emailInput.type(email);
	}

	enterPassword(password) {
		this.passwordInput.type(password);
	}

    clickSignInButton() {
        this.signInButton.click();
    }

	signIn(email, password) {
		this.emailInput.clear().type(email);
		this.passwordInput.clear().type(password);
		this.signInButton.click();
	}
}

export default new SignInForm();

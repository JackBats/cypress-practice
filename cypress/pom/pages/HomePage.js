class HomePage {

  visit() {
    cy.visit('/');
  }

  get signInButton() {
    return cy.get('.header_signin');
  }

  openSignInModal() {
    this.signInButton.click();
  }

  signIn(username, password) {
    this.openSignInModal();
    SignInForm.emailInput.type(username);
    SignInForm.passwordInput.type(password);
    SignInForm.signInButton.click();
  }
}

export default new HomePage();
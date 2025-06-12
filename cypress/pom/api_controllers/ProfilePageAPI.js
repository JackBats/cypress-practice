import 'cypress-plugin-api';

class ProfilePageAPI {
    getUserInfo(){
       return cy.api('GET', 'api/users/profile')
    }

    logOut() {
		return cy.api('Get', '/api/auth/logout')
	}

	resetPassword(email){
		return cy.api('POST','/api/auth/resetPassword', {
			email: email
		})
	}

    deleteUser(){
        return cy.api('DELETE', '/api/users')
    }
}

export default new ProfilePageAPI();
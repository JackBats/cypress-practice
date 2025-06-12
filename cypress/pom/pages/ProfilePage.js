class ProfilePage{
    visit() {
		cy.visit('/panel/profile');
	}

    get pageTitle() {
        return cy.contains('h1', 'Profile');
    }

    get editButton() {
        return cy.get('div.panel-page .btn-primary')
    }

    get userName(){
        return cy.get('div.panel-page_content .profile_name')
    }
}

export default new ProfilePage();
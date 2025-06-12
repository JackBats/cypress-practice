import ProfilePage from '../../pom/pages/ProfilePage'
import GaragePage from '../../pom/pages/GaragePage';

describe('INTERCEPT user name parameters', () => {
	it('shows mocked name Polar Bear in Profile page', () => {
		const fakeResponseBody = {
			status: 'ok',
			data: {
				userId: 226542,
				photoFilename: 'default-user.png',
				name: 'Polar',
				lastName: 'Bear',
			},
		};

		cy.intercept('GET', '/api/users/profile', fakeResponseBody);
		GaragePage.visitPageAsLoggedInUser();
		ProfilePage.visit();

ProfilePage.userName.should('have.text', `${fakeResponseBody.data.name} ${fakeResponseBody.data.lastName}`);	});
});

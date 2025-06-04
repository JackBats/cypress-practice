/// <reference types="cypress" />

beforeEach(() => {
	cy.visit('/', {
		auth: {
			username: 'guest',
			password: 'welcome2qauto',
		},
	});
});
describe('Search Header Elements', () => {
	it('should find logo element by class name', () => {
		cy.get('.header_logo');
	});

	it('should find Home button element by Text (contains)', () => {
		cy.contains('Home');
	});

	it('should find About button element by Tag+contains', () => {
		cy.get('button').contains('About');
	});

	it('should find Contacts button element by tag+text', () => {
		cy.contains('button', 'Contacts');
	});

	it('should find Guest log in button element by children', () => {
		cy.get('.header_right').children('.-guest');
	});
});

describe('Search Do More section Elements', () => {
	it('should find H1 title element by tag', () => {
		cy.get('h1');
	});

	it('should find paragraph inside Do More section', () => {
		cy.get('section.section.hero').find('p');
	});

	it('should find Sign In button element by children', () => {
		cy.get('.header_right').children('.header_signin');
	});

	it('should find Sign Up button element by within method', () => {
		cy.get('section.section.hero').within(() => {
			cy.get('button');
		});
	});

	it('should find YouTube element by within method', () => {
		cy.get('section.section.hero').within(() => {
			cy.get('.hero-video');
		});
	});
});

describe('Search About Section Elements', () => {
	it('shoukd find First img element by first', () => {
		cy.get('.about-picture_img').first('img');
	});

	it('shoukd find First img element by last', () => {
		cy.get('.about-picture_img').last('img');
	});

	it('shoukd find First img element by eq', () => {
		cy.get('.about-picture_img').eq('1');
	});
});

describe('Search Contacts section Elements', () => {
    it('should find Contacts title h2 element by id + tag', () => {
        cy.get('#contactsSection').find('h2');
    });

    it('should find ithillel.ua title element by atribute + filter', () => {
        cy.get('a[target="_blank"]').filter('[href="https://ithillel.ua"]');
    });

    it('should find support@ithillel.ua title element by tag + class', () => {
        cy.get('a.contacts_link.h4');
    });

    it('should find social media icons by class', () => {
        cy.get('.contacts_socials');
    });     
});
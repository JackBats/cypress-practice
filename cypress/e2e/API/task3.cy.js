import GaragePageAPI from '../../pom/api_controllers/GaragePageAPI';
import HomePageAPI from '../../pom/api_controllers/HomePageAPI';
import 'cypress-plugin-api';
import ProfilePage from '../../pom/pages/ProfilePage';
import ProfilePageAPI from '../../pom/api_controllers/ProfilePageAPI';

describe('Tests with plugin-api', () => {
    afterEach(() => {
        ProfilePageAPI.logOut();
    })
	it('Sign up test', () => {
		const newUser = {
			name: 'Yevhen',
			lastName: 'Bat',
			email:  `qa1.tester.001+test${Date.now()}@gmail.com`,
			password: '0xVTSKre18n4C2Y',
			repeatPassword: '0xVTSKre18n4C2Y',
		};

		HomePageAPI.signUp(newUser).then((response) => {
            const responseBody = response.body;
			expect(response.status).to.eq(201);
			expect(responseBody.status).to.eq('ok');
        })

        ProfilePageAPI.getUserInfo().then((response) => {
            const responseBody = response.body;
			expect(response.status).to.eq(200);
			expect(responseBody.status).to.eq('ok');
            expect(responseBody.data).to.have.property('name').to.eq(newUser.name);
            expect(responseBody.data).to.have.property('lastName').to.eq(newUser.lastName);

        })
	});

    it('Log Out test', ()=>{
        HomePageAPI.login().then((response) => {
            const responseBody = response.body;
			expect(response.status).to.eq(200);
            expect(responseBody.status).to.eq('ok');
        })

        ProfilePageAPI.logOut().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('ok');
        })
    })

    it('Delete user test', () => {
        const newUser = {
			name: 'Yevhen',
			lastName: 'Bat',
			email:  `qa1.tester.001+test${Date.now()}@gmail.com`,
			password: '0xVTSKre18n4C2Y',
			repeatPassword: '0xVTSKre18n4C2Y',
		};

		HomePageAPI.signUp(newUser).then((response) => {
            const responseBody = response.body;
			expect(response.status).to.eq(201);
			expect(responseBody.status).to.eq('ok');
        })

        ProfilePageAPI.deleteUser().then((response) => {
            const responseBody = response.body;
			expect(response.status).to.eq(200);
            expect(responseBody.status).to.eq('ok');
        })
    })


});

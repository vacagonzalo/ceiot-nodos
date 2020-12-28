// run 'npm run dev' before testing!
const PORT = process.env.PORT;
const url = `http://localhost:${PORT}/users`;
const fetch = require('node-fetch');
const chai = require('chai');
const expect = chai.expect;

describe(`GET on ${url}`, () => {
    let data = [
        { name: "Bob", email: "bob@gador.com", password: "1234", rank: 3 },
        { name: "Margaret", email: "margaret@gador.com", password: "password", rank: 2 },
        { name: "John", email: "john@gador.com", password: "superSecret", rank: 1 },
    ];
    data = JSON.stringify(data);
    it('should return a list of all users', async () => {
        let response = await fetch(url)
        let status = response.status;
        let text = await response.text();
        expect(status).to.be.equal(200);
        expect(text).to.be.equal(data);
    });
});

describe(`POST on ${url}`, () => {
    let data = [
        { name: "Bob", email: "bob@gador.com", password: "1234", rank: 3 },
        { name: "Margaret", email: "margaret@gador.com", password: "password", rank: 2 },
        { name: "John", email: "john@gador.com", password: "superSecret", rank: 1 },
        { name: "new", email: "new@gador.com", password: "new", rank: 1 }
    ];
    data = JSON.stringify(data);
    it('should return status 201', async () => {
        const body = { name: "new", email: "new@gador.com", password: "new", rank: 1 };
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        let status = response.status;
        expect(status).to.be.equal(201);
    });
    it('should create a new user', async () => {
        let response = await fetch(url)
        let text = await response.text();
        expect(text).to.be.equal(data);
    });
});

describe(`POST on ${url} with an existing user`, () => {
    let data = [
        { name: "Bob", email: "bob@gador.com", password: "1234", rank: 3 },
        { name: "Margaret", email: "margaret@gador.com", password: "password", rank: 2 },
        { name: "John", email: "john@gador.com", password: "superSecret", rank: 1 },
        { name: "new", email: "new@gador.com", password: "new", rank: 1 }
    ];
    data = JSON.stringify(data);
    it('should not create a dupplicated user', async () => {
        const body = { name: "new", email: "new@gador.com", password: "new", rank: 1 };
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        let status = response.status;
        expect(status).to.be.equal(403);
        response = await fetch(url);
        let text = await response.text();
        expect(text).to.be.equal(data);
    });
});

describe(`PUT on ${url} with an existing user`, () => {
    let data = [
        { name: "Bob", email: "bob@gador.com", password: "1234", rank: 3 },
        { name: "Margaret", email: "margaret@gador.com", password: "password", rank: 2 },
        { name: "John", email: "john@gador.com", password: "superSecret", rank: 1 },
        { name: "new", email: "new2@gador.com", password: "new2", rank: 1 }
    ];
    data = JSON.stringify(data);
    it('should change the user', async () => {
        const body = { name: "new", email: "new2@gador.com", password: "new2", rank: 1 };
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        let status = response.status;
        expect(status).to.be.equal(200);
        response = await fetch(url);
        let text = await response.text();
        expect(text).to.be.equal(data);
    });
});

describe(`PUT on ${url} with a non-existing user`, () => {
    it('should return status 403', async () => {
        const body = { name: "new3", email: "new3@gador.com", password: "new3", rank: 1 };
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        let status = response.status;
        expect(status).to.be.equal(403);
    });
});

describe(`DELETE on ${url} with an existing user`, () => {
    let data = [
        { name: "Bob", email: "bob@gador.com", password: "1234", rank: 3 },
        { name: "Margaret", email: "margaret@gador.com", password: "password", rank: 2 },
        { name: "John", email: "john@gador.com", password: "superSecret", rank: 1 },
    ];
    data = JSON.stringify(data);
    it('should return "status 202"', async () => {
        const body = { name: "new" };
        let response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        let status = response.status;
        expect(status).to.be.equal(202);
    });
    it('should delete the user', async () => {
        let response = await fetch(`${url}`);
        let text = await response.text();
        expect(text).to.be.equal(data);
    })
});

describe(`DELETE on ${url} on a non-existing user`, () => {
    it('should return status 403', async () => {
        const body = { name: "new2" };
        let response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        let status = response.status;
        expect(status).to.be.equal(403);
    });
});
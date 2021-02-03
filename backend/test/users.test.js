// run 'npm run dev' before testing!
const PORT = process.env.PORT;
const url = `http://localhost:${PORT}/users`;
const fetch = require('node-fetch');
const chai = require('chai');
const expect = chai.expect;
const validToken = 'xxxx.yyyy.zzzz';
const invalidToken = 'zzzz.yyyy.xxxx';

describe(`GET on ${url} without a JWT`, () => {
    it('should return STATUS 401', async () => {
        let response = await fetch(url);
        let status = response.status;
        expect(status).to.be.equal(401);
    });
});


describe(`GET on ${url} with an INVALID JWT`, () => {
    it('should return STATUS 401', async () => {
        let response = await fetch(url, {
            headers: { 'authorization': invalidToken }
        });
        let status = response.status;
        expect(status).to.be.equal(401);
    });
});

describe(`GET on ${url} with an VALID JWT`, () => {
    let data = [
        { name: "Bob", email: "bob@gador.com", rank: 3 },
        { name: "Margaret", email: "margaret@gador.com", rank: 2 },
        { name: "John", email: "john@gador.com", rank: 1 },
    ];
    data = JSON.stringify(data);
    it('should return a list of all users', async () => {
        let response = await fetch(url, {
            headers: { 'authorization': validToken }
        });
        let text = await response.text();
        expect(response.status).to.be.equal(200);
        expect(text).to.be.equal(data);
    });
});

describe(`POST on ${url} without JWT`, () => {
    it('should return status 401', async () => {
        const body = { name: "new", email: "new@gador.com", password: "new", rank: 1 };
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json', }
        });
        expect(response.status).to.be.equal(401);
    });
});

describe(`POST on ${url} with a VALID JWT`, () => {
    let data = [
        { name: "Bob", email: "bob@gador.com", rank: 3 },
        { name: "Margaret", email: "margaret@gador.com", rank: 2 },
        { name: "John", email: "john@gador.com", rank: 1 },
        { name: "new", email: "new@gador.com", rank: 1 }
    ];
    data = JSON.stringify(data);
    it('should return status 201', async () => {
        const body = { name: "new", email: "new@gador.com", password: "new", rank: 1 };
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'authorization': validToken
            }
        });
        let status = response.status;
        expect(status).to.be.equal(201);
    });
    it('should create a new user', async () => {
        let response = await fetch(url, {
            headers: { 'authorization': validToken }
        });
        let text = await response.text();
        expect(text).to.be.equal(data);
    });
});

describe(`POST on ${url} with an existing user`, () => {
    it('should not create a dupplicated user', async () => {
        const body = { name: "new", email: "new@gador.com", password: "new", rank: 1 };
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'authorization': validToken
            }
        });
        expect(response.status).to.be.equal(403);
    });
});

describe(`PUT on ${url} without a valid JWT`, () => {
    it('should return status 403', async () => {
        const body = { name: "new3", email: "new3@gador.com", password: "new3", rank: 1 };
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        let status = response.status;
        expect(status).to.be.equal(401);
    });
});

describe(`PUT on ${url} with a non-existing user`, () => {
    it('should return status 403', async () => {
        const body = { name: "new3", email: "new3@gador.com", password: "new3", rank: 1 };
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'authorization': validToken
            }
        });
        let status = response.status;
        expect(status).to.be.equal(403);
    });
});

describe(`PUT on ${url} with an existing user`, () => {
    let data = [
        { name: "Bob", email: "bob@gador.com", rank: 3 },
        { name: "Margaret", email: "margaret@gador.com", rank: 2 },
        { name: "John", email: "john@gador.com", rank: 1 },
        { name: "new", email: "new2@gador.com", rank: 1 }
    ];
    data = JSON.stringify(data);
    it('should change the user', async () => {
        const body = { name: "new", email: "new2@gador.com", password: "new2", rank: 1 };
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'authorization': validToken
            }
        });
        let status = response.status;
        expect(status).to.be.equal(200);
        response = await fetch(url, {
            headers: {
                'authorization': validToken
            }
        });
        let text = await response.text();
        expect(text).to.be.equal(data);
    });
});

describe(`DELETE on ${url} with an existing user but NO JWT`, () => {
    it('should return "status 401"', async () => {
        const body = { name: "new" };
        let response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        expect(response.status).to.be.equal(401);
    });
});

describe(`DELETE on ${url} with an existing user but INVALID JWT`, () => {
    it('should return "status 401"', async () => {
        const body = { name: "new" };
        let response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'authorization': invalidToken
            }
        });
        expect(response.status).to.be.equal(401);
    });
});

describe(`DELETE on ${url} with an existing user and VALID JWT`, () => {
    let data = [
        { name: "Bob", email: "bob@gador.com", rank: 3 },
        { name: "Margaret", email: "margaret@gador.com", rank: 2 },
        { name: "John", email: "john@gador.com", rank: 1 },
    ];
    data = JSON.stringify(data);
    it('should return "status 202"', async () => {
        const body = { name: "new" };
        let response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'authorization': validToken
            }
        });
        let status = response.status;
        expect(status).to.be.equal(202);
    });
    it('should delete the user', async () => {
        let response = await fetch(`${url}`, {
            headers: {
                'authorization': validToken
            }
        });
        let text = await response.text();
        expect(text).to.be.equal(data);
    })
});

describe(`DELETE on ${url} on a non-existing user and VALID JWT`, () => {
    it('should return status 403', async () => {
        const body = { name: "new2" };
        let response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'authorization': validToken
            }
        });
        let status = response.status;
        expect(status).to.be.equal(403);
    });
});
const PORT = process.env.PORT || 8080;
const url = `http://localhost:${PORT}`;
const fetch = require('node-fetch');
const chai = require('chai');
chai.use(require('chai-match'));
const expect = chai.expect;

describe('Sending a valid POST', () => {
    const body = { name: "Bob", password: "1234" };
    it('should return a new and valid JWT', async () => {
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        text = await response.text();
        expect(response.status).to.be.equal(201);
        expect(text).to.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
    });
});
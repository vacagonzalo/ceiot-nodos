// run 'npm run dev' before testing!
const PORT = process.env.PORT;
const url = `http://localhost:${PORT}/devices`;
const fetch = require('node-fetch');
const chai = require('chai');
const expect = chai.expect;

describe(`GET on ${url}`, () => {
    let data = [
        { serial: 123, tag: "esp32", modbus: 0, frec: 60, unit: "t" },
        { serial: 124, tag: "raspberry", modbus: 1, frec: 60, unit: "t" },
        { serial: 125, tag: "edu-ciaa", modbus: 2, frec: 60, unit: "t" }
    ];
    data = JSON.stringify(data);
    it('should return a list of all devices', async () => {
        let response = await fetch(url)
        let status = response.status;
        let text = await response.text();
        expect(status).to.be.equal(200);
        expect(text).to.be.equal(data);
    });
});

describe(`GET on ${url}/<device tag>`, () => {
    let data = { serial: 123, tag: "esp32", modbus: 0, frec: 60, unit: "t" };
    data = JSON.stringify(data);
    it('should return "status 204"', async () => {
        let response = await fetch(`${url}/esp32`);
        let status = response.status;
        let text = await response.text();
        expect(status).to.be.equal(200);
        expect(text).to.be.equal(data);
    });
});

describe(`GET on ${url}/<device tag> when the device does not exist`, () => {
    it('should return the device', async () => {
        let response = await fetch(`${url}/void`);
        let status = response.status;
        expect(status).to.be.equal(204);
    });
});

describe(`POST on ${url} with a new device`, () => {
    let data = [
        { serial: 123, tag: "esp32", modbus: 0, frec: 60, unit: "t" },
        { serial: 124, tag: "raspberry", modbus: 1, frec: 60, unit: "t" },
        { serial: 125, tag: "edu-ciaa", modbus: 2, frec: 60, unit: "t" },
        { serial: 999, tag: "post", modbus: 99, frec: 60, unit: "t" }
    ];
    data = JSON.stringify(data);
    it('should add a new device to the database', async () => {
        const body = { serial: 999, tag: "post", modbus: 99, frec: 60, unit: "t" };
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        let status = response.status;
        expect(status).to.be.equal(201);
        response = await fetch(url);
        let text = await response.text();
        expect(text).to.be.equal(data);
    });
});

describe(`POST on ${url} with an existing device`, () => {
    let data = [
        { serial: 123, tag: "esp32", modbus: 0, frec: 60, unit: "t" },
        { serial: 124, tag: "raspberry", modbus: 1, frec: 60, unit: "t" },
        { serial: 125, tag: "edu-ciaa", modbus: 2, frec: 60, unit: "t" },
        { serial: 999, tag: "post", modbus: 99, frec: 60, unit: "t" }
    ];
    data = JSON.stringify(data);
    it('should not create a dupplicated device', async () => {
        const body = { serial: 999, tag: "post", modbus: 99, frec: 60, unit: "t" };
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

describe(`PUT on ${url} with existing device`, () => {
    let data = { serial: 999, tag: "put", modbus: 99, frec: 60, unit: "t" };
    data = JSON.stringify(data);
    it('should change the document', async () => {
        const body = { serial: 999, tag: "put", modbus: 99, frec: 60, unit: "t" };
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        let status = response.status;
        expect(status).to.be.equal(200);
        let text = await response.text();
        expect(text).to.be.equal(data);
    });
});

describe(`PUT on ${url} with a non-existing device`, () => {
    it('should return "status 403"', async () => {
        const body = { serial: 666, tag: "void", modbus: 99, frec: 60, unit: "t" };
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        let status = response.status;
        expect(status).to.be.equal(403);
    });
});

describe(`DELETE on ${url} with an existing device`, () => {
    let data = [
        { serial: 123, tag: "esp32", modbus: 0, frec: 60, unit: "t" },
        { serial: 124, tag: "raspberry", modbus: 1, frec: 60, unit: "t" },
        { serial: 125, tag: "edu-ciaa", modbus: 2, frec: 60, unit: "t" }
    ];
    data = JSON.stringify(data);
    it('should return "status 202"', async () => {
        const body = { tag: "put" };
        let response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        let status = response.status;
        expect(status).to.be.equal(202);
    });
    it('should delete the device', async () => {
        let response = await fetch(`${url}/put`);
        let status = response.status;
        expect(status).to.be.equal(204);
    })
});

describe(`DELETE on ${url} with a non-existing device`, () => {
    it('should return "status 403"', async () => {
        const body = { tag: "put" };
        let response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        let status = response.status;
        expect(status).to.be.equal(403);
    });
});
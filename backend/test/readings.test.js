// run 'npm run dev' before testing!
const PORT = process.env.PORT;
const url = `http://localhost:${PORT}/readings`;
const fetch = require('node-fetch');
const chai = require('chai');
const expect = chai.expect;
const validToken = 'xxxx.yyyy.zzzz';
const invalidToken = 'zzzz.yyyy.xxxx';
const invalidGET = { headers: { 'authorization': invalidToken } };
const validGET = { headers: { 'authorization': validToken } };

describe(`GET on "${url}/all" without a token`, () => {
    it('should return STATUS 401', async () => {
        let response = await fetch(`${url}/all`);
        expect(response.status).to.be.equal(401);
    });
});

describe(`GET on "${url}/all" with an INVALID token`, () => {
    it('should return STATUS 401', async () => {
        let response = await fetch(`${url}/all`, invalidGET);
        expect(response.status).to.be.equal(401);
    });
});

describe(`GET on "${url}/all" whit a VALID token`, () => {
    let data = [
        { date: new Date("2020-12-01"), tag: "esp32", val: 24, unit: "t" },
        { date: new Date("2020-12-01"), tag: "raspberry", val: 23, unit: "t" },
        { date: new Date("2020-12-01"), tag: "edu-ciaa", val: 22, unit: "t" },
        { date: new Date("2020-11-01"), tag: "esp32", val: 21, unit: "t" },
        { date: new Date("2020-11-01"), tag: "raspberry", val: 20, unit: "t" },
        { date: new Date("2020-11-01"), tag: "edu-ciaa", val: 19, unit: "t" },
        { date: new Date("2019-12-01"), tag: "esp32", val: 18, unit: "t" },
        { date: new Date("2019-12-01"), tag: "raspberry", val: 17, unit: "t" },
        { date: new Date("2019-12-01"), tag: "edu-ciaa", val: 16, unit: "t" },
        { date: new Date("2018-12-01"), tag: "esp32", val: 15, unit: "t" },
        { date: new Date("2018-12-01"), tag: "raspberry", val: 14, unit: "t" },
        { date: new Date("2018-12-01"), tag: "edu-ciaa", val: 13, unit: "t" }
    ]
    data = JSON.stringify(data);
    it('should give all the measurements of all devices', async () => {
        let response = await fetch(`${url}/all`, validGET);
        let status = response.status;
        let text = await response.text();
        expect(status).to.be.equal(200);
        expect(text).to.be.equal(data);
    });
});

describe(`GET on "${url}/all/<device>" without a token`, () => {
    it('should return STATUS 401', async () => {
        let response = await fetch(`${url}/all/esp32`);
        expect(response.status).to.be.equal(401);
    });
});

describe(`GET on "${url}/all/<device>" with an INVALID token`, () => {
    it('should return STATUS 401', async () => {
        let response = await fetch(`${url}/all/esp32`, invalidGET);
        expect(response.status).to.be.equal(401);
    });
});

describe(`GET on "${url}/all/<device>" with a VALID token`, () => {
    let data = [
        { date: new Date("2020-12-01"), tag: "esp32", val: 24, unit: "t" },
        { date: new Date("2020-11-01"), tag: "esp32", val: 21, unit: "t" },
        { date: new Date("2019-12-01"), tag: "esp32", val: 18, unit: "t" },
        { date: new Date("2018-12-01"), tag: "esp32", val: 15, unit: "t" }
    ]
    data = JSON.stringify(data);
    it('should give all the measurements of the device esp32', async () => {
        let response = await fetch(`${url}/all/esp32`, validGET);
        let status = response.status;
        let text = await response.text();
        expect(status).to.be.equal(200);
        expect(text).to.be.equal(data);
    });
});

describe(`GET on "${url}/year" without a token`, () => {
    it('should return STATUS 401', async () => {
        let response = await fetch(`${url}/year`);
        expect(response.status).to.be.equal(401);
    });
});

describe(`GET on "${url}/year" with an INVALID token`, () => {
    it('should return STATUS 401', async () => {
        let response = await fetch(`${url}/year`, invalidGET);
        expect(response.status).to.be.equal(401);
    });
});

describe(`GET on "${url}/year" with a VALID token`, () => {
    let data = [
        { date: new Date("2020-12-01"), tag: "esp32", val: 24, unit: "t" },
        { date: new Date("2020-12-01"), tag: "raspberry", val: 23, unit: "t" },
        { date: new Date("2020-12-01"), tag: "edu-ciaa", val: 22, unit: "t" },
        { date: new Date("2020-11-01"), tag: "esp32", val: 21, unit: "t" },
        { date: new Date("2020-11-01"), tag: "raspberry", val: 20, unit: "t" },
        { date: new Date("2020-11-01"), tag: "edu-ciaa", val: 19, unit: "t" },
    ]
    data = JSON.stringify(data);
    it('should give one year of measurements from all devices', async () => {
        let response = await fetch(`${url}/year`, validGET);
        let status = response.status;
        let text = await response.text();
        expect(status).to.be.equal(200);
        expect(text).to.be.equal(data);
    });
});

describe(`GET on "${url}/year/<device>" without a token`, () => {
    it('should return STATUS 401', async () => {
        let response = await fetch(`${url}/year/esp32`);
        expect(response.status).to.be.equal(401);
    });
});

describe(`GET on "${url}/year/<device>" with an INVALID token`, () => {
    it('should return STATUS 401', async () => {
        let response = await fetch(`${url}/year/esp32`, invalidGET);
        expect(response.status).to.be.equal(401);
    });
});

describe(`GET on "${url}/year/<device>" with a VALID token`, () => {
    let data = [
        { date: new Date("2020-12-01"), tag: "esp32", val: 24, unit: "t" },
        { date: new Date("2020-11-01"), tag: "esp32", val: 21, unit: "t" },
    ]
    data = JSON.stringify(data);
    it('should give one year of measurements from <device>', async () => {
        let response = await fetch(`${url}/year/esp32`, validGET);
        let status = response.status;
        let text = await response.text();
        expect(status).to.be.equal(200);
        expect(text).to.be.equal(data);
    });
});


// run 'npm run dev' before testing!
const PORT = process.env.PORT;
const url = `http://localhost:${PORT}/readings`;
const fetch = require('node-fetch');
const chai = require('chai');
const expect = chai.expect;

describe(`GET on ${url}/all`, () => {
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
        let response = await fetch(`${url}/all`);
        let status = response.status;
        let text = await response.text();
        expect(status).to.be.equal(200);
        expect(text).to.be.equal(data);
    });
});

describe(`GET on ${url}/all/esp32`, () => {
    let data = [
        { date: new Date("2020-12-01"), tag: "esp32", val: 24, unit: "t" },
        { date: new Date("2020-11-01"), tag: "esp32", val: 21, unit: "t" },
        { date: new Date("2019-12-01"), tag: "esp32", val: 18, unit: "t" },
        { date: new Date("2018-12-01"), tag: "esp32", val: 15, unit: "t" }
    ]
    data = JSON.stringify(data);
    it('should give all the measurements of the device esp32', async () => {
        let response = await fetch(`${url}/all/esp32`);
        let status = response.status;
        let text = await response.text();
        expect(status).to.be.equal(200);
        expect(text).to.be.equal(data);
    });
});

describe(`GET on ${url}/year`, () => {
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
        let response = await fetch(`${url}/year`);
        let status = response.status;
        let text = await response.text();
        expect(status).to.be.equal(200);
        expect(text).to.be.equal(data);
    });
});

describe(`GET on ${url}/year/esp32`, () => {
    let data = [
        { date: new Date("2020-12-01"), tag: "esp32", val: 24, unit: "t" },
        { date: new Date("2020-11-01"), tag: "esp32", val: 21, unit: "t" },
    ]
    data = JSON.stringify(data);
    it('should give one year of measurements from esp32', async () => {
        let response = await fetch(`${url}/year/esp32`);
        let status = response.status;
        let text = await response.text();
        expect(status).to.be.equal(200);
        expect(text).to.be.equal(data);
    });
});
// run 'npm run dev' before testing!
const PORT = process.env.PORT;
const url = `localhost:${PORT}`;

const chai = require('chai');
const chaiHttp = require('chai-http');

const assert = chai.assert;

chai.use(chaiHttp);

describe('Checking the testing tools', () => {
    it('should work', () => {
        chai.request(url)
            .get('/')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text,'working');
                return;
            });
    });
});

describe('On endpoint "/readings"', () => {
    let data = [
        {
            date: "2020-12-01",
            tag: "esp32",
            val: 24
        },
        {
            date: "2020-12-01",
            tag: "raspberry",
            val: 23
        },
        {
            date: "2020-12-01",
            tag: "edu-ciaa",
            val: 22
        },
        {
            date: "2020-11-01",
            tag: "esp32",
            val: 21
        },
        {
            date: "2020-11-01",
            tag: "raspberry",
            val: 20
        },
        {
            date: "2020-11-01",
            tag: "edu-ciaa",
            val: 19
        },
        {
            date: "2020-10-01",
            tag: "esp32",
            val: 18
        },
        {
            date: "2020-10-01",
            tag: "raspberry",
            val: 17
        },
        {
            date: "2020-10-01",
            tag: "edu-ciaa",
            val: 16
        },
        {
            date: "2020-09-01",
            tag: "esp32",
            val: 15
        },
        {
            date: "2020-09-01",
            tag: "raspberry",
            val: 14
        },
        {
            date: "2020-09-01",
            tag: "edu-ciaa",
            val: 13
        }
    ]
    it('should give all the measurements of all devices', () => {
        chai.request(url)
            .get('/readings')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, data);
                return;
            });      
    });
})
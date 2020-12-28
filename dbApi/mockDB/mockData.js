use gador;
db = db.getSisterDB("gador");
db.devices.insert(
    [
        { serial: 123, tag: "esp32", modbus: 0, frec: 60, unit: "t" },
        { serial: 124, tag: "raspberry", modbus: 1, frec: 60, unit: "t" },
        { serial: 125, tag: "edu-ciaa", modbus: 2, frec: 60, unit: "t" }
    ]
);
db.measurements.insert(
    [
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
);
db.users.insert(
    [
        { name: "Bob", email: "bob@gador.com", password: "1234", rank: 3},
        { name: "Margaret", email: "margaret@gador.com", password: "password", rank: 2},
        { name: "John", email: "john@gador.com", password: "superSecret", rank: 1},
    ]
);
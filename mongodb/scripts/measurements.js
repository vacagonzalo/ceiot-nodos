db = db.getSisterDB("gador");
db.measurements.insert(
    [
        { date: new Date("2020-12-01"), tag: "esp32", val: 24, unit: "t" },
        { date: new Date("2020-12-01"), tag: "raspberry", val: 23, unit: "t" },
        { date: new Date("2020-12-01"), tag: "edu-ciaa", val: 22, unit: "h" },
        { date: new Date("2020-11-01"), tag: "esp32", val: 21, unit: "t" },
        { date: new Date("2020-11-01"), tag: "raspberry", val: 20, unit: "t" },
        { date: new Date("2020-11-01"), tag: "edu-ciaa", val: 19, unit: "h" },
        { date: new Date("2019-12-01"), tag: "esp32", val: 18, unit: "t" },
        { date: new Date("2019-12-01"), tag: "raspberry", val: 17, unit: "t" },
        { date: new Date("2019-12-01"), tag: "edu-ciaa", val: 16, unit: "h" },
        { date: new Date("2018-12-01"), tag: "esp32", val: 15, unit: "t" },
        { date: new Date("2018-12-01"), tag: "raspberry", val: 14, unit: "t" },
        { date: new Date("2018-12-01"), tag: "edu-ciaa", val: 13, unit: "h" }
    ]
);
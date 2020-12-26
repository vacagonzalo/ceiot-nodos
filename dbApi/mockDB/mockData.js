use gador;
db = db.getSisterDB("gador");
db.devices.insert(
    [
        {
            "serial" : 123,
            "tag" : "esp32",
            "modbus" : 0,
            "frec" : 60
        },
        {
            "serial" : 124,
            "tag" : "raspberry",
            "modbus" : 1,
            "frec" : 60
        },
        {
            "serial" : 125,
            "tag" : "edu-ciaa",
            "modbus" : 2,
            "frec" : 60
        }
    ]
);
db.measurements.insert(
    [
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
        },
    ]
);
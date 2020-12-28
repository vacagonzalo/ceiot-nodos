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
)
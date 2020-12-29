db = db.getSisterDB("gador");
db.users.insert(
    [
        { name: "Bob", email: "bob@gador.com", password: "1234", rank: 3},
        { name: "Margaret", email: "margaret@gador.com", password: "password", rank: 2},
        { name: "John", email: "john@gador.com", password: "superSecret", rank: 1},
    ]
);
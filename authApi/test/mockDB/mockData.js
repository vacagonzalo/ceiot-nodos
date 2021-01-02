use gador;
db = db.getSisterDB("gador");
db.users.insert(
    [
        { name: "Bob", email: "bob@gador.com", password: "$2b$10$lrlwJZoJRzt6rReX/OhaR.h3FIan.ihPD1KMFUMkkyBYCeVnBJzmG", rank: 3},
        { name: "Margaret", email: "margaret@gador.com", password: "$2b$10$.pZrGdJfxAB7lLYZHdY9wOYv1ViNSLOUb/c/LbiKSgs7rJTVpTGYy", rank: 2},
        { name: "John", email: "john@gador.com", password: "$2b$10$bPjB1UplcafQA9sQu1eV/u4KVLqR9G/hfWFA8koXGKu7UV5HjFgWi", rank: 1},
    ]
);
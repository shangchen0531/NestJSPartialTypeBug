db = db.getSiblingDB('database-test');

db.createUser({
    user: 'root',
    pwd: 'root',
    roles: [
        {
            role: 'readWrite',
            db: 'database-test',
        },
    ],
});

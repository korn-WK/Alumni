
db = db.getSiblingDB('alumni');
db.createCollection('users');
db.users.insertOne({
    image: 'NoImage',
    name: 'SUPER A',
    email: 'poundpound321@gmail.com',
    role: 2
});

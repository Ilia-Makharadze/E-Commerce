const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('registrationdb', 'postgres', 'ilia', {
    host: 'localhost',
    dialect: 'postgres',
});



// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false, // Render-ში საჭიროა
//         },
//     },
// });
module.exports = sequelize;

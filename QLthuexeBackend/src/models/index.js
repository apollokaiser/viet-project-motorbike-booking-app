import Sequelize from 'sequelize';

const sequelize = new Sequelize('qlthuexe', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    
});

export {Sequelize, sequelize };

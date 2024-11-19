import Sequelize from 'sequelize';

const sequelize = new Sequelize('qlthuexe', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    
});
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options)
    return date.format("DD/MM/YYYY")
}

export {Sequelize, sequelize };

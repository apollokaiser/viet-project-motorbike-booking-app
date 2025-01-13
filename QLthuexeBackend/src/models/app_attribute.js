import {sequelize, Sequelize} from "./index.js"

const appAttributes = sequelize.define("app_attributes", {
    key: {
        type: Sequelize.STRING(255),
        primaryKey: true,
    },
    value: {
        type: Sequelize.TEXT,
    },
},{
    tableName: "app_attributes",
    timestamps: false,
    freezeTableName: true,
})
export default appAttributes;
import express from "express";

/**
 * @module express -app
 */
const comfigViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}
export default comfigViewEngine;
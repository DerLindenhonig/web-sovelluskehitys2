const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require("express");
const server = http.createServer(app)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
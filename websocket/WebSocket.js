const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);

const Protocol = require("../util/Protocol");

const init = () => {
    console.log("[INFO] Starting websocket endpoint.");

    app.ws("/ws", (ws, req) =>{
        ws.on("message", (message) =>{
            
        });
    });
    
    app.listen(8098, () => {
        console.log("[INFO] Websocket endpoint running on 127.0.0.1:8098/ws");
    });
}

module.exports = {
    init: init
}
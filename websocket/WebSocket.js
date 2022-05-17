const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);

const fs = require("fs");

const Protocol = require("../util/Protocol");
const AuthHandler = require("./AuthHandler");

const handlers = new Map();
const handlerFiles = fs.readdirSync("./websocket/handlers/").filter(file => file.endsWith(".js"));

for(const file of handlerFiles){
    const handler = require(`./handlers/${file}`);

    handlers.set(handler.name, handler);
}

const init = () => {
    console.log("[INFO] Starting websocket endpoint.");

    app.ws("/ws", (ws, req) =>{
        ws.on("message", (message) =>{
            var json;
            try {
                json = JSON.parse(message);
            } catch (error) {
                ws.send(Protocol.getProtocol(500, "N/A", "", "Malformed json body."));
                return;
            }

            const handler = handlers.get(json.route);

            if(handler == undefined){
                ws.send(Protocol.getProtocol(500, "N/A", "", "Specify a route json parameter."));
                return;
            }

            handler.execute(ws, json);
        });
    });
    
    app.listen(8098, () => {
        console.log("[INFO] Websocket endpoint running on 127.0.0.1:8098/ws");
    });
}

const sendToClients = (status, route, operation, data) => {
    expressWs.getWss().clients.forEach((client) => {
        client.send(Protocol.getProtocol(status, route, operation, data));
    })
}

const sendToAuthedClients = (status, route, operation, data) => {
    AuthHandler.getClients().forEach((client) =>{
        if(client.ws.readyState != 2 || client.ws.readyState != 3){
            client.ws.send(Protocol.getProtocol(status, route, operation, data));
        }else{
            AuthHandler.deauthenticate(client.id);
        }
    })
}

module.exports = {
    init: init,
    sendToClients: sendToClients,
    sendToAuthedClients: sendToAuthedClients
}
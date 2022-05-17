const Protocol = require("../../util/Protocol");
const AuthHandler = require("../AuthHandler");

module.exports = {
    name: "authenticate",
    execute(ws, json){
        if(ws.readyState == 2 || ws.readyState == 3) return;
        if(json.cookie != undefined){
            if(AuthHandler.getClient(json.cookie) != undefined){
                return ws.send(Protocol.getProtocol(500, this.name, "", "Already authenticated."));
            }
        }

        if(json.password == undefined){
            return ws.send(Protocol.getProtocol(500, this.name, "", "Missing password."));
        }

        if(json.password != parseInt(process.env.PW)){
            return ws.send(Protocol.getProtocol(500, this.name, "", "Invalid password."));
        }

        const client = AuthHandler.authenticate(ws);

        ws.send(Protocol.getProtocol(200, this.name, "", client));
    }
}
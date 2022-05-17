const Protocol = require("../../util/Protocol");
const AuthHandler = require("../AuthHandler");

module.exports = {
    name: "deauthenticate",
    execute(ws, json){
        if(ws.readyState == 2 || ws.readyState == 3) return;


        if(json.cookie == undefined){
            return ws.send(Protocol.getProtocol(500, this.name, "", "Not authenticated."));
        }

        const id = json.cookie.split("#")[0];

        if(AuthHandler.getClient(id) == undefined){
            return ws.send(Protocol.getProtocol(500, this.name, "", "Not authenticated."));
        }

        if(AuthHandler.deauthenticate(id)){
            return ws.send(Protocol.getProtocol(200, this.name, "", "Sucessfully deauthenticated."));
        }else{
            return ws.send(Protocol.getProtocol(500, this.name, "", "Internal server error."));
        }
    }
}
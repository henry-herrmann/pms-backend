const QueueHandler = require("../../songs/QueueHandler");
const Song = require("../../songs/Song");
const Protocol = require("../../util/Protocol");
const AuthHandler = require("../AuthHandler");

module.exports = {
    name: "queue",
    execute(ws, json){
        if(ws.readyState == 2 || ws.readyState == 3) return;

        if(json.cookie == undefined){
            return ws.send(Protocol.getProtocol(500, this.name, "", "Not authenticated."));
        }

        const id = json.cookie.split("#")[0];

        if(AuthHandler.getClient(id) == undefined){
            return ws.send(Protocol.getProtocol(500, this.name, "", "Not authenticated."));
        }

        if(json.operation == undefined){
            
            return ws.send(Protocol.getProtocol(200, this.name, "getQueue", QueueHandler.getQueue().getSongs()));
        }

        switch(json.operation){
            case "addSong": 
                if(json.data == undefined){
                    return ws.send(Protocol.getProtocol(500, this.name, "addSong", "Provide a song."));
                }

                for(const song of json.data){
                    QueueHandler.getQueue().addSong(new Song(song.name, song.url));
                }

                ws.send(Protocol.getProtocol(200, this.name, "addSong", json.data));
                break;
            case "removeSong": 
                if(json.data == undefined){
                    return ws.send(Protocol.getProtocol(500, this.name, "addSong", "Provide a song."));
                }

                for(const song of json.data){
                    QueueHandler.getQueue().removeSong(song.name);
                }

                ws.send(Protocol.getProtocol(200, this.name, "addSong", json.data));
                break;
            case "pauseCurrentSong": 
                if(json.data == undefined){
                    return ws.send(Protocol.getProtocol(500, this.name, "addSong", "Provide a song."));
                }

                for(const song of json.data){
                    QueueHandler.getQueue().removeSong(song.name);
                }

                ws.send(Protocol.getProtocol(200, this.name, "addSong", json.data));
                break;
        }
    }
}
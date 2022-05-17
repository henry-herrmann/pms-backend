const Queue = require("./Queue");

const songQueue = new Queue();

function getQueue(){
    return songQueue;
}

module.exports.getQueue = getQueue;
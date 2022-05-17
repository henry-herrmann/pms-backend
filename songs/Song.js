class Song {

    constructor(name, url) {
        this.name = name;
        this.url = url;
        this.loop = false;
        this.pause = false;
    }

    getName(){
        return this.name;
    }

    getUrl() {
        return this.url;
    }

    isLooped() {
        return this.loop;
    }

    isPaused() {
        return this.pause;
    }

    setLoop(loop) {
        this.loop = loop;
    }
    
    setPause(pause) {
        this.pause = pause;
    }

}

module.exports = Song;
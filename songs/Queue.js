class Queue {
    
    constructor(){
        this.songs = [];
        this.currentIndex = 0;
    }

    getCurrentSong(){
        if(this.songs.length == 0) return null;

        return this.songs[this.currentIndex];
    }
    
    getSongs(){
        return this.songs;
    }

    nextSong(){
        if(this.songs.length == 0) return;

        if(this.currentIndex == this.songs.length-1){
            this.currentIndex = 0;
            return;
        }

        this.currentIndex++;
    }

    previousSong(){
        if(this.songs.length == 0) return;
        if(this.currentIndex == 0) return;

        this.currentIndex--;
    }

    addSong(song){
        if(typeof song != Song) return;

        this.songs.push(song);
    }

    removeSong(name){
        const index = this.songs.findIndex(song => song.name == name);

        if(index == -1) return;

        this.songs.splice(index, 1);
    }
}

module.exports = Queue;
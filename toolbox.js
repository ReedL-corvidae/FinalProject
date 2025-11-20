export class Toolbox {

    //gets a random number 0 -> array.length, given an array.
    getRandomIndex(array) {
        return Math.floor(
            Math.random() * array.length
        );
    }

    //gets a random item from an array
    getRandomItem(array) {
        let randomIndex = this.getRandomIndex(array);
        return array[randomIndex];
    }

    shuffleArray(array) {
        let shuffled = [];

        let howManyTimesToPush = array.length;

        for(let i = 0; i < howManyTimesToPush; i++) {
            let randomIndex = this.getRandomIndex(array);
            let removed = array.splice(randomIndex , 1 ) //start position, lenth.
            
            shuffled.push(removed[0]);
        }
        return shuffled;
    }

getRandomColor(){ 
    let red = Math.floor(Math.random() * 256); 
    let green = Math.floor(Math.random() * 256); 
    let blue = Math.floor(Math.random() * 256); 
    //return color 
    return "rgb(" + red + "," + green + "," + blue + ")"; 
}

    isWithinRect(pointX, pointY, rectX, rectY, rectW, rectH) {
        if(pointX > rectX + rectW) {
            return false; //too far right
        } else if(pointX < rectX) {
            return false; //too far left
        } else if(pointY < rectY) {
            return false; //too far up
        } else if(pointY > rectY + rectH) {
            return false;
        } 
        else return true;
    }

}
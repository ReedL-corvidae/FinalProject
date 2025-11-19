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

    //Shuffle the pieces in an array
    shuffleArray(array){
        let shuffled = [];

        let numberToPush = array.length;

        for (let i = 0; i <numberToPush; i++){
            let randomIndex = this.getRandomIndex(array);
            let removed = array.splice(randomIndex,1);
            shuffled.push(removed[0]);
        }
         return shuffled;
    }
    //Get a random color
    getRandomColor(){
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        //return color
        return "rgb(" + red + "," + green + "," + blue + ")";
    }
   
}
const setOfWords = [
    "The five boxing wizards jump quickly.\n",
    "Quick fox jumps nightly above wizard.\n",
    "Fox dwarves chop my talking quiz job.\n",
    "Pack my box with five dozen liquor jugs.\n",
    "When zombies arrive, quickly fax judge pat.\n",
    "The quick brown fox jumps over the lazy dog.\n",
    "Jacky can now give six big tips from the old quiz.\n",
    "All questions asked by five watched experts amaze the judge.\n"
];
const words  = document.getElementById("question");
const typedWords = document.getElementById("message");
const btn = document.getElementById('btn');
let startTime, endTime, errorWords, speed;

const startTest = () => {
    let randomNumber = Math.floor(Math.random()*setOfWords.length);
    words.innerText = setOfWords[randomNumber];
    let date = new Date;
    startTime = date.getTime();
    btn.value = "Done";
    typedWords.disabled = false;
}

const endTest = () => {
    let date = new Date();
    endTime = date.getTime();
    let totalTime = ((endTime - startTime)/1000);
    btn.value ="Start";

    let totalStr = typedWords.value;
    let wordCount = wordCounter(totalStr);

    speed = Math.round((wordCount/totalTime)*60);

    let finalMsg = "Your speed is " + speed + " words per mintues.\n";
    finalMsg += compareWords(words.innerText, totalStr);
    words.innerText = finalMsg;

    typedWords.value = typedWords.defaultValue;
    typedWords.disabled = true;
}

const compareWords = (str1, str2) =>{
    let word1 = str1.split(" ");
    let word2 = str2.split(" ");
    let count = 0;

    word1.forEach(function(item, index){
        if (item == word2[index]) {
            count++;
        }
    })

    errorWords = (word1.length - count);

    let avg = speed - errorWords;

    return(errorWords + " error out of " + word1.length + " words. And so your avarage speed is " + avg + " words per mintues.");
}

const wordCounter = (str) =>{
    let  response = str.split(" ").length;
    return response;
}

btn.addEventListener('click', function(){
    if (this.value == "Start") {
        startTest();
        typedWords.focus();
    }
    else if (this.value == "Done") {
        typedWords.value = typedWords.value + "\n";
        endTest();
    }
});

typedWords.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        event.preventDefault();
        endTest();
    }
});

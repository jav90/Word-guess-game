//Declaring global variables
var name;
var lives = 10;
var lives_number;
var wins = 0;
var win_number;
var losses = 0;
var loss_number;
var input;
var answer = [];
var letter;
var wrong_guess;
var guess_word;
var check= false;
var random;

//Word object
var word = {
    //variables for word object
    correct_word: "",
    guesses: [],
    answer_word: [],

    //Resets values to default
    reset: function(){
        this.correct_word = "";
        this.guesses.length = 0;
        this.answer_word.length = 0;
    },

    //Function to access the word
    accessWord: function(){
        return this.correct_word;
    },

    //Method to access the answer word
    accessAnswer: function(){
        return this.answer_word;
    },
    
    //Function to access the guesses
    accessGuess: function(){
        let compound_array;
        for(let i=0; i<this.guesses.length; i++)
        {
            if(compound_array===undefined){
                compound_array = this.guesses[i]+",";
            }
            else
            {
                compound_array += this.guesses[i]+",";
            }
        }
        return compound_array;
    },

    //function to rewrite word. Also initializes the answer word
    writeWord: function(word){
        this.correct_word = word;
        for(let i = 0; i<this.correct_word.length; i++)
        {
            this.answer_word[i] = "_"; 
        }
    },

    //function to rewrite the guesses
    writeGuess: function(user_input){
        //counter variable
        let exists = 0;
        for(let i=0; i<this.guesses.length; i++)
        {
            //if the letter has already been guessed adds 1 to the counter
            if(this.guesses[i]===user_input)
            {
                exists++;
            }
        }
        //If the variable remains as 0 then adds the guess at the end of the array
        if(exists===0){
            if(this.guesses[0]==="")
            {
                this.guesses[0] = user_input;
            }
            else
            {
                this.guesses[this.guesses.length]=user_input;
            }
        }
    },

    //function to compare pressed key vs word. Returns letter position
    compareLetter: function(user_input){
        let position = -1;
        /*Goes through the length of the correct word and compares with user input
        //If there's a match then it adds that word to the answer word
        otherwise returns the initial -1 */
        for(let i = 0; i < this.correct_word.length; i++)
        {
            if(this.correct_word.charAt(i)===user_input){
                this.answer_word[i] = this.correct_word[i];
                position = i;
            }
        }

        //This loop determines if the letter has been guessed before, if it has then it returns a number
        //lower than -1
        for(let j = 0; j < this.guesses.length;j++)
        {
            if(this.guesses[j]===user_input)
            {
                position--;
            }
        }
        return position;
    },

    //Function to compare the words and determine if the words are equal
    winCondition: function(){
        var win_condition = false;
        var counter = 0;
        for(let i=0; i < this.correct_word.length; i++){
            if(this.correct_word.charAt(i)===this.answer_word[i])
            {
                counter++;
            }
        }
        if(counter===this.correct_word.length)
        {
            win_condition = true;
        }
        return win_condition;
    },
}

//Array containing nfl teams
var NFLTeams=["Buffalo Bills","Miami Dolphins","New England Patriots","New York Jets","Baltimore Ravens","Cincinnati Bengals","Cleveland Browns","Pittsburgh Steelers","Houston Texans","Indianapolis Colts","Jacksonville Jaguars","Tennessee Titans","Denver Broncos","Kansas City Chiefs","Los Angeles Chargers","Oakland Raiders","Dallas Cowboys","New York Giants","Philadelphia Eagles","Washington Redskins","Chicago Bears","Detroit Lions","Green Bay Packers","Minnesota Vikings","Atlanta Falcons","Carolina Panthers","New Orleans Saints","Tampa Bay Buccaneers","Arizona Cardinals","Los Angeles Rams","San Francisco 49ers","Seattle Seahawks"]

var logos=["assets/images/Buffalo_Bills_logo.svg.png","assets/images/Miami_Dolphins_logo.svg.png","assets/images/New_England_Patriots_logo.svg.png","assets/images/New_York_Jets_logo.svg.png","assets/images/Baltimore_Ravens_logo.svg.png","assets/images/Cincinnati_Bengals_logo.svg.png","assets/images/Cleveland_Browns_logo.svg.png","assets/images/Pittsburgh_Steelers_logo.svg.png","assets/images/Houston_Texans_logo.svg.png","assets/images/Indianapolis_Colts_logo.svg.png","assets/images/Jacksonville_Jaguars_logo.svg.png","assets/images/Tennessee_Titans_logo.svg.png","assets/images/Denver_Broncos_logo.svg.png","assets/images/Kansas_City_Chiefs_logo.svg.png","assets/images/Los_Angeles_Chargers_logo.svg.png","assets/images/Oakland_Raiders_logo.svg.png","assets/images/Dallas_Cowboys_logo.svg.png","assets/images/New_York_Giants_logo.svg.png","assets/images/Philadelphia_Eagles_logo.svg.png","assets/images/Washington_Redskins_logo.svg.png","assets/images/Chicago_Bears_logo.svg.png","assets/images/Detroit_Lions_logo.svg.png","assets/images/Green_Bay_Packers_logo.svg.png","assets/images/Minnesota_Vikings_logo.svg.png","assets/images/Atlanta_Falcons_logo.svg.png","assets/images/Carolina_Panthers_logo.svg.png","assets/images/New_Orleans_Saints_logo.svg.png","assets/images/Tampa_Bay_Buccaneers_logo.svg.png","assets/images/Arizona_Cardinals_logo.svg.png","assets/images/Los_Angeles_Rams_logo.svg.png","assets/images/San_Francisco_49ers_logo.svg.png","assets/images/Seattle_Seahawks_logo.svg.png"]
var wordmarks=["assets/images/Buffalo_Bills_wordmark.svg.png","assets/images/Miami_Dolphins_wordmark.svg.png","assets/images/New_England_Patriots_wordmark.svg.png","assets/images/New_York_Jets_wordmark.svg.png","assets/images/Baltimore_Ravens_wordmark.svg.png","assets/images/Cincinnati_Bengals_wordmark.svg.png","assets/images/Cleveland_Browns_wordmark.svg.png","assets/images/Pittsburgh_Steelers_wordmark.svg.png","assets/images/Houston_Texans_wordmark.svg.png","assets/images/Indianapolis_Colts_wordmark.svg.png","assets/images/Jacksonville_Jaguars_wordmark.svg.png","assets/images/Tennessee_Titans_wordmark.svg.png","assets/images/Denver_Broncos_wordmark.svg.png","assets/images/Kansas_City_Chiefs_wordmark.svg.png","assets/images/Los_Angeles_Chargers_wordmark.svg.png","assets/images/Oakland_Raiders_wordmark.svg.png","assets/images/Dallas_Cowboys_wordmark.svg.png","assets/images/New_York_Giants_wordmark.svg.png","assets/images/Philadelphia_Eagles_wordmark.svg.png","assets/images/Washington_Redskins_wordmark.svg.png","assets/images/Chicago_Bears_wordmark.svg.png","assets/images/Detroit_Lions_wordmark.svg.png","assets/images/Green_Bay_Packers_wordmark.svg.png","assets/images/Minnesota_Vikings_wordmark.svg.png","assets/images/Atlanta_Falcons_wordmark.svg.png","assets/images/Carolina_Panthers_wordmark.svg.png","assets/images/New_Orleans_Saints_wordmark.svg.png","assets/images/Tampa_Bay_Buccaneers_wordmark.svg.png","assets/images/Arizona_Cardinals_wordmark.svg.png","assets/images/Los_Angeles_Rams_wordmark.svg.png","assets/images/San_Francisco_49ers_wordmark.svg.png","assets/images/Seattle_Seahawks_wordmark.svg.png"]

//Sets initial word
random=aleatorio();
word.writeWord(NFLTeams[random].toLowerCase());

//Shows initial values on screen
win_number = document.getElementById("wins");
win_number.textContent=wins;

loss_number = document.getElementById("losses");
loss_number.textContent=losses;

lives_number = document.getElementById("lives");
lives_number.textContent=lives;

guess_word = document.getElementById("guessWord");
guess_word.textContent = word.accessAnswer();

wrong_guess = document.getElementById("wrongGuesses");
wrong_guess.textContent = word.accessGuess();


//Starts game
document.getElementById("start").addEventListener("click", function(event){
    //When start is clicked the game resets
    //Method sets variables to starting values
    restartGame();
    //Sets the word object to starting values
    word.reset();
    //Picks a random number between 1 and 32 and saves it
    random=aleatorio();
    //Calls a team name based on the random number
    word.writeWord(NFLTeams[random].toLowerCase());
    //Refreshes all values on screen
    win_number.textContent=wins;
    loss_number.textContent=losses;
    lives_number.textContent=lives;
    guess_word.textContent = word.accessAnswer();
    wrong_guess.textContent = word.accessGuess();

    document.onkeyup = function(event) {
        
        //Declare variable and set it to lowercase for comparison purposes
        var letter = event.key.toLowerCase();
        //Calls method to compare the letter typed with the word and saves the result
        input = word.compareLetter(letter);
        /*If input is -1 it means the letter is not part of the word, so the method
        to add the letter to the wrong guesses is called. If the letter was already guessed, then
        the method will return a number different from -1 and the if will not be accessed
        */
        if(input===-1){
            word.writeGuess(letter);
            lives--;
            if(lives===0)
            {
                losses++;
                lives = 10;
            }
            lives_number.textContent=lives;
            loss_number.textContent=losses;
        }
        
        console.log(word.accessAnswer());
        console.log(word.accessGuess());
        
        //Updates the answer on screen
        guess_word.textContent = word.accessAnswer();
        //Updates the guessed letters on screen
        wrong_guess.textContent = word.accessGuess();
        
        //Calls method to verify if the guessed answer is already equal to the actual word
        check = word.winCondition();
        //If answer is equal to word then increases the number of wins
        if(check===true)
        {
            wins++;
            win_number.textContent=wins;
            console.log("img src "+logos[random]);
            document.getElementById("teamLogo").src = logos[random];
            document.getElementById("teamWordmark").src = wordmarks[random];
            //Add method to change word
            word.reset();
            //Picks a random number between 1 and 32 and saves it
            random=aleatorio();
            //Calls a team name based on the random number
            word.writeWord(NFLTeams[random].toLowerCase());
        }
        
        
    };
    
});

//Stops listening for keys when stop button is pressed
document.getElementById("stop").addEventListener("click", function(event){
    document.onkeyup = null;
    console.log("Stop");
});

function restartGame(){
    lives = 10;
    wins = 0;
    losses = 0;
    check= false;
}

function aleatorio(){
    var aleatorio=Math.floor((Math.random() * 32))
    return aleatorio;
}




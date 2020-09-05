var quizCont = document.getElementById("quiz");
var resultsCont = document.getElementById("results");
var submitBtn = document.getElementById("submit");
var currentQuestion = 0;
var quesCorrect = 0;
var hidden = document.getElementsByClassName("hide");
var startCont = document.getElementsByClassName("start-cont");
var highscores = document.getElementById("quizscores");
var scoreBoard = document.getElementById("board-table");
var scores = document.getElementById("score");
var scoreName = document.getElementById("scoreName");
var submitScore = document.getElementById("submit");
var quizScoreList = [];
var winObj = {};
var nxtBtn = document.getElementById("next");
var backBtn = document.getElementById("back");
var clearHigh = document.getElementById("clearhighscores");
var viewBtn = document.getElementById("view");
// var answers;
//Timer function
var timerElement = document.getElementById("timer");
var seconds = 0;

var quizTimer = setInterval(startTimer, 1000);
function startTimer() {
    seconds++;
    timerElement.textContent  = "timer:" + seconds;
}
function stopTimer() {
    clearInterval(quizTimer);
}
//Timer Fucntion ends

// start quiz homepage
quizCont.style.display = "none";
highscores.style.display = "none";
//stopTimer();
timerElement.style.display = "none";
nxtBtn.style.display = "none";
backBtn.style.display = "none";
clearHigh.style.display = "none";

viewBtn.addEventListener("click", function() {
    console.log("clicked");
    displayScores();

});

var startBtn = document.getElementById("start");
startBtn.addEventListener("click", function() {
    startTimer();
    showQuestions();
    startCont[0].style.display = "none";
    timerElement.style.display = "flex";
    hidden[0].style.display = "block";
    hidden[1].style.display = "block";
    //hidden[2].style.display = "none";
    nxtBtn.style.display = "block";
});

// Actual Quiz Questions

var questions = [{

    question: "When was the last time Liverpool won the League title?",
    answers: {
        a: "2005",
        b: "2018",
        c: "1990",
        d: "2020",
    }, 
    correctAns: "d",
},

   {
       question: "Who won the Golden ball at the 2010 World Cup?",
       answers: {
           a: "Lionel Messi",
           b: "Cristiano Ronaldo",
           c: "Diego Forlan",
           d: "David Villa",
       },
       correctAns: "c",
   },

   {
       question: "What team has the won most Champions League trophies?",
       answers: {
           a: "Real Madrid",
           b: "Barcelona",
           c: "Liverpool",
           d: "AC MIlan",
       },
       correctAns: "a",
   },

   {
       question: "Which English team has the most European Cup/Champions League victories?",
       answers: {
           a: "Manchester United",
           b: "Liverpool",
           c: "Nottingham Forest",
           d: "Chelsea",
       },
       correctAns: "b",
   },

   {
       question: "Which country won the first ever World Cup in 1930?",
       answers: {
           a: "Brazil",
           b: "Uruguay",
           c: "West Germany",
           d: "France",
       },
       correctAns: "b",
   },

   {
       question: "Who is the Premier League's all time highest scorer?",
       answers: {
           a: "Thiery Henry",
           b: "Wayne Rooney",
           c: "Alan Shearer",
           d: "Ian Rush",
       },
       correctAns: "c",
   },

   {
       question: "Which player has the most goals in World Cup history?",
       answers: {
           a: "Ronaldo",
           b: "Diego Maradona",
           c: "Pele",
           d: "Miroslav Klose",
       },
       correctAns: "d",
   },

   {
      question: "Who is the only player to win the Champions league with 3 different clubs?", 
      answers: {
          a: "Cristiano Ronaldo",
          b: "Steven Gerrard",
          c: "Clarence Seedorf", 
          d: "Xabi Alonso",
        },
      correctAns: "c",
   },

   {
       question: "Who is the youngest player to start in two consecutive Champions League finals?",
       answers: {
           a: "Raul Gonzales",
           b: "Trent Alexander-Arnold",
           c: "Kylian Mbappe",
           d: "Lionel Messi",
       },
       correctAns: "b",
   },

   {
       question: "Who is the oldest player to play in a World Cup game?",
       answers: {
           a: "Roger Miller",
           b: "Ronaldo",
           c: "Claude Makelele",
           d: "Mario Gotze",
       },
       correctAns: "a",
   },

];

function showQuestions() {
    var i = currentQuestion; 
if (!questions[i] ) {
    displayScores();
    stopTimer();
    highscores.style.display = "block";
    nxtBtn.style.display = "none";
    quizCont.style.display = "none";
    backBtn.style.display = "block";
    clearHigh.style.display = "block";
    
    return false
}
    console.log(questions[i]);

    var outlet = [];
    var answers;
    console.log(questions)
    
   // for (i = 0; i < questions.length; i++) {
        answers = [];
        for (letter in questions[i].answers) {
            answers.push(
                '<label class="slide">'
                + '<input type="radio" name="question'+i+'" value="'+letter+'" data-answer="'+ letter + '"/>'
                + letter + ': '
                + questions[i].answers[letter]
                + '</label>'
            );
        }
        outlet.push(
            '<div class="questions">' + questions[i].question + '</div>'
            + '<div class="answers">' + answers.join('') + '</div>'
        );
   // }
   
    quizCont.innerHTML = outlet.join('');

}
function showResults() {

    var ansCont = quizCont.querySelector('.answers');
    var userAns = "";
    
    for (var i = 0; i < 4; i++) {
        console.log(ansCont);
        console.log(ansCont.children[i]);
       if (ansCont.children[i].children[0].checked) {
           userAns = ansCont.children[i].children[0].getAttribute("data-answer")
       }
       // userAns = (ansCont[i].querySelector('input[name=question'+i+']:checked') || {}).value;
}
console.log(userAns);
console.log(questions[currentQuestion]);
        if (userAns === questions[currentQuestion].correctAns) {
            quesCorrect++;
            ansCont.style.color = "green";
        }
        else {
            ansCont.style.color = "red";
        }
    
    resultsCont.innerHTML = quesCorrect + " out of " + questions.length;

    currentQuestion++;
    showQuestions();
    // if (currentQuestion >= 10) {
    //     //console.log(finii);
    // }

}




// After Quiz Scores

init();
function init() {
    var savedScores = JSON.parse(localStorage.getItem("scores"));
    if (savedScores !== null) {
        quizScoreList = savedScores;
    }
    
}

function saveQuizScores() {
    localStorage.setItem("scores", JSON.stringify(quizScoreList));
}

function displayScores() {
    scoreBoard.innerHTML = "";
    for (var i = 0; i < quizScoreList.length; i++) {
        var pass = quizScoreList[i];
        var newRow = document.createElement("tr");
        var newName = document.createElement("td");
        var newScore = document.createElement("td");
        newName.textContent = quizScoreList[i].name;
        newScore.textContent = quesCorrect;
        newRow.appendChild(newName);
        newRow.appendChild(newScore);
        scoreBoard.appendChild(newRow);
       backBtn.style.display = "block";
       clearHigh.style.display = "block";
        
    }
    scores.innerText = quesCorrect;
}






nxtBtn.onclick = function() {
    console.log("click me");
    showResults();
}



backBtn.onclick = function(event) {
    event.preventDefault();
    console.log("click me");
    highscores.style.display = "none";
    startCont[0].style.display = "block";
    timerElement.style.display = "none";
    backBtn.style.display = "none";
    resultsCont.style.display = "none";
    clearHigh.style.display = "none";

}
clearHigh.onclick = function() {
        console.log("click me");
        localStorage.clear();
        displayScores();

}

submitScore.addEventListener("click", function(e) {
    event.preventDefault();
    var nameText = scoreName.value.trim();
    if (nameText === "") {
        return;
    }
    winObj.name = nameText;
    winObj.score = score;
    quizScoreList.push(winObj);
    scoreName.value = "";
    saveQuizScores();
    displayScores();
});








// update quizCont.Html to display input and submit
//function enterInitials () {}
// take input and quesCorrect and save to local storage and redirect to hiscores.HTML
//function saveInitials() {}


//function developQuiz() {
   
   

       // showQuestions();

    

   
    
   // showQuestions(questions, quizCont);

   

   
    //developQuiz(questions, quizCont, resultsCont, submitBtn);

//}
//developQuiz();


//function showQuestions() {}
//function showResults() {}
//developQuiz ();
//submitBtn.addEventListener("click", showResults);




//showQuestions(questions, quizCont);

//function showResults(questions, quizCont, resultsCont) {

   

//submitBtn.onclick = function() {
   // showResults(questioons, quizCont, resultCont);
//}
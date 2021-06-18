let triviaForm = document.getElementById("trivia");
let questionsContainer = document.getElementById("questionContainer")
let questionAmount = document.getElementById("questionAmount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let questionType = document.getElementById("questionType");
let questionName = document.getElementById("questionName");
let answers = document.getElementsByClassName("answer");
let resultsCard = document.getElementById("resultsCard");
let finalScore = document.getElementById("score");
let reaction = document.getElementById("reaction");
let message = document.getElementById("message");

let status = document.getElementById("status");
let categoryStatus = document.getElementById("category-name");
let difficultyStatus = document.getElementById("difficulty-name");
let questionIndex = document.getElementById("question-index");
let questionsLength = document.getElementById("num-questions");
 
let questions;
let index = 0;
let correct_index_answer;
let score = 0;

const anotherTry = () => {
    triviaForm.style.display = "flex";
    triviaForm.reset();
    resultsCard.style.display = "none";
    index = 0;
    score = 0;
};

let getAPIdata = async e => {
    e.preventDefault();
    const response = await fetch(`https://opentdb.com/api.php?amount=${questionAmount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${questionType.value}`);
    const data = await response.json();
    questions = data.results;
    startGame();
};

const startGame = () => {
    questionsContainer.style.display = "flex";
    triviaForm.style.display = "none";
    status.style.display = "flex";

    questionIndex.innerText = index + 1;
    questionsLength.innerText = questionAmount.value;
    categoryStatus.innerText = questions[index].category;
    
    if (questions[index].difficulty === "easy") {
        difficultyStatus.setAttribute("class", "easy");
        difficultyStatus.innerText = "EASY";
    } else if (questions[index].difficulty === "medium") {
        difficultyStatus.setAttribute("class", "medium");
        difficultyStatus.innerText = "MEDIUM";
    } else if (questions[index].difficulty === "hard") {
        difficultyStatus.setAttribute("class", "hard");
        difficultyStatus.innerText = "HARD";
    }

    let currentQuestion = questions[index];
    questionName.innerText = currentQuestion.question;

    if (currentQuestion.type === "boolean") {
        document.getElementById("1").innerText = "True";
        document.getElementById("2").innerText = "False";
        document.getElementById("3").style.display = "none";
        document.getElementById("4").style.display = "none";

        if (currentQuestion.correct_answer === "True") {
            correct_index_answer = 1;
        } else {
            correct_index_answer = 2;
        }            
    } else {
        document.getElementById("1").style.display = "Block";
        document.getElementById("2").style.display = "Block";
        document.getElementById("3").style.display = "Block";
        document.getElementById("4").style.display = "Block";

        correct_index_answer = Math.floor(Math.random() * 4) + 1;
        document.getElementById(correct_index_answer).innerText = currentQuestion.correct_answer;
        let j = 0;
        for (let i = 1; i <= 4; i++) {
            if (i === correct_index_answer) continue;
            document.getElementById(i).innerText = currentQuestion.incorrect_answers[j];
            j++
        }
    }
};

for (let i = 0; i < answers.length; i++) {
    const element = answers[i];
    element.addEventListener("click", () => selectAnswer(element.id));
};

const selectAnswer = id => {
    if (id == correct_index_answer) {
        score += 1
    } else {
    };

    if (index == questionAmount.value - 1) {
        resultsCard.style.display = "flex";
        questionsContainer.style.display = "none";
        status.style.display = "none";
        finalScore.innerText = score;
        
        if (score == questionAmount.value) {
            reaction.setAttribute("src", "https://media.tenor.com/images/a2bac4d6a1eea3bfb2f371323914360e/tenor.gif")
            message.innerText = "MASSIVE RESPECT!"
        } else if (score <= questionAmount.value - 1 && Math.floor(score > questionAmount.value / 2)) {
            reaction.setAttribute("src", "https://media.tenor.com/images/f6e0e49b7ceafde2dd3b4fb53c58823f/tenor.gif")
            message.innerText = "NOT BAD!"
        } else if (Math.floor(score <= questionAmount.value / 2) && score > 0) {
            reaction.setAttribute("src", "https://media.tenor.com/images/f58e14f5df853d5e6ece44a489810c62/tenor.gif")
            message.innerText = "NOT GOOD!"
        } else if (score == 0) {
            reaction.setAttribute("src", "https://media.tenor.com/images/25423ad302639a2351f7c60b34583a9a/tenor.gif")
            message.innerText = "YOU'RE A COMPLETE DISGRACE FOR YOUR COUNTRY."
        }
        document.getElementById("anotherTry").addEventListener("click", anotherTry);
    } else {
        index++;
        startGame();    
    }
};

triviaForm.addEventListener("submit", getAPIdata);


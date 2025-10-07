const questions = [
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false}
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers:[
            {text:"Pakistan",correct:false},
            {text:"China",correct:false},
            {text:"Vatican City",correct:true},
            {text:"Korea",correct:false}
        ]
    },
    {
        question:"Which is the largest desert in the world?",
        answers:[
            {text:"Sahara",correct:false},
            {text:"Thar",correct:false},
            {text:"Gobi",correct:false},
            {text:"Antarctica",correct:true}
        ]
    },
    {
        question:"Which is the smallest continent in the world?",
        answers:[
            {text:"Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"North America",correct:false},
            {text:"South America",correct:false}
        ]
    }

];


const question = document.getElementById("question");
const answers = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex;
let score;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}



function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo +". "+ currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answers.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}


function resetState(){
    nextBtn.style.display = 'none';
    while(answers.firstChild){
        answers.removeChild(answers.firstChild)
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        // selectedBtn.classList.add("correct");
        selectedBtn.style.background = "#9aeabc";
        score++;
    }else{
        // selectedBtn.classList.add("inCorrect");
        selectedBtn.style.background = "#ff9393";
    }

    Array.from(answers.children).forEach(button => {
        if(button.dataset.correct === "true"){
            // button.classList.add("correct");
            button.style.background = "#9aeabc";
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}



function displayScore(){
    resetState();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        displayScore();
    }
}


nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
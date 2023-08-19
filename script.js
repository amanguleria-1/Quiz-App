const questions = [
    {
        question: "Which is larget animal in the world?",
        answers:[
            { text: "Shark", correct: false}, 
            { text: "Blue whale", correct: true}, 
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is larget desert in the world?",
        answers:[
            { text: "Sahara", correct: false}, 
            { text: "Gobi", correct: false}, 
            { text: "Antartica", correct: true},
            { text: "Sahara", correct: false},
        ]
    },
    {
        question: "Which is smallest country in the world?",
        answers:[
            { text: "Vetican City", correct: true}, 
            { text: "Nepal", correct: true}, 
            { text: "Sri Lanka", correct: false},
            { text: "Maldova", correct: false},
        ]
    },
    {
        question: "Which is smallest continent in the world?",
        answers:[
            { text: "Asia", correct: false}, 
            { text: "Australia", correct: true}, 
            { text: "Arctic", correct: false},
            { text: "Europe", correct: false},
        ]
    }
    ];
    
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz(){
         resetQuiz();
         currentQuestionIndex = 0;
         score = 0;
         nextButton.innerHTML = "Next";
         showQuestion();
    }

    function showQuestion(){
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex+1;
        questionElement.innerHTML = questionNo + "." + currentQuestion.question;

        currentQuestion.answers.forEach(answer =>{
            const button = document.createElement("button");
            button.innerHTML=answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if (answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click",selectAnswer);
        })
    }

    function resetQuiz(){
        nextButton.style.display = "none";
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild)
        }
    }

    function showScore(){
        resetQuiz();
        questionElement.innerHTML = `You Scored ${score} out of ${questions.length} ! `
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }

    function selectAnswer(e){
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        }else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
   }

   function handleNextButton(){
    resetQuiz();
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion(); 
    }else{
        showScore( )
    }
   }

   nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
   })

    startQuiz();

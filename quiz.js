const questions = [
    {
        id: "q1",
        category: "Konsep Dasar",
        question: "Apa yang dimaksud dengan larutan?",
        answers: [
            { text: "Campuran heterogen dari dua zat atau lebih", correct: false},
            { text: "Campuran homogen dari zat terlarut dan pelarut", correct: true},
            { text: "Zat murni yang tidak dapat dipisahkan", correct: false},
            { text: "Campuran yang dapat dipisahkan dengan penyaringan", correct: false}
        ],
        explanation: "Larutan adalah campuran homogen yang terdiri dari zat terlarut (solute) dan pelarut (solvent). Komposisinya sama di setiap bagian dan tidak dapat dipisahkan dengan penyaringan biasa."
    },  
    {
        id: "q2",
        category: "Reaksi Kimia",
        question: "Reaksi antara asam dan basa menghasilkan...",
        answers: [
            { text: "Hanya garam", correct: false},
            { text: "Garam dan air", correct: true},
            { text: "Hanya air", correct: false},
            { text: "Gas dan air", correct: false}
        ],
        explanation: "Reaksi netralisasi antara asam dan basa menghasilkan garam dan air. Contoh: HCl + NaOH → NaCl + H₂O"
    }, 
    {
        id: "q3",
        category: "Indikator pH",
        question: "Pada pH berapa fenolftalein berubah menjadi merah muda?",
        answers: [
            { text: "pH < 4.4", correct: false},
            { text: "pH 4.4 - 8.2", correct: false},
            { text: "pH > 8.2", correct: true},
            { text: "Tidak pernah berubah warna", correct: false}
        ],
        explanation: "Fenolftalein tidak berwarna pada pH < 8.2 dan merah muda pada pH > 8.2. Ini membuatnya berguna sebagai indikator untuk larutan basa."
    }, 
    {
        id: "q4",
        category: "Indikator pH",
        question: "Manakah yang merupakan indikator pH?",
        answers: [
            { text: "Garam dapur", correct: false},
            { text: "Fenolftalein", correct: true},
            { text: "Gula", correct: false},
            { text: "Minyak", correct: false}
        ],
        explanation: "Fenolftalein adalah salah satu indikator pH yang umum digunakan di laboratorium. Indikator lainnya termasuk metil merah dan bromtimol biru."
    }, 
    {
        id: "q5",
        category: "Konsep Dasar",
        question: "Apa fungsi utama pelarut dalam larutan?",
        answers: [
            { text: "Melarutkan zat terlarut", correct: true},
            { text: "Mengubah warna larutan", correct: false},
            { text: "Meningkatkan suhu larutan", correct: false},
            { text: "Mengurangi volume larutan", correct: false}
        ],
        explanation: "Pelarut adalah komponen yang melarutkan zat terlarut. Dalam larutan aqueous, air adalah pelarut yang paling umum digunakan."
    }, 
    {
        id: "q6",
        category: "Reaksi Kimia",
        question: "Apa yang terjadi ketika asam kuat bereaksi dengan basa kuat?",
        answers: [
            { text: "Menghasilkan gas beracun", correct: false},
            { text: "Reaksi netralisasi yang melepaskan panas", correct: true},
            { text: "Tidak ada reaksi", correct: false},
            { text: "Menghasilkan endapan", correct: false}
        ],
        explanation: "Ketika asam kuat bereaksi dengan basa kuat, terjadi reaksi netralisasi yang melepaskan energi panas (reaksi eksotermik)."
    }, 
    {
        id: "q7",
        category: "Indikator pH",
        question: "Metil merah berubah warna dari merah menjadi kuning pada pH berapa?",
        answers: [
            { text: "pH < 4.4", correct: false},
            { text: "pH 4.4 - 6.2", correct: true},
            { text: "pH > 6.2", correct: false},
            { text: "pH > 8.2", correct: false}
        ],
        explanation: "Metil merah adalah indikator yang berubah warna dari merah (pH < 4.4) menjadi kuning (pH > 6.2). Range perubahan warnanya adalah pH 4.4 - 6.2."
    }, 
    {
        id: "q8",
        category: "Keselamatan",
        question: "Apa yang harus dilakukan jika terkena percikan bahan kimia?",
        answers: [
            { text: "Biarkan saja, akan hilang dengan sendirinya", correct: false},
            { text: "Segera bilas dengan air bersih dan lapor ke guru/instruktur", correct: true},
            { text: "Gosok dengan tangan", correct: false},
            { text: "Tutup dengan kain kering", correct: false}
        ],
        explanation: "Jika terkena percikan bahan kimia, segera bilas dengan air bersih yang mengalir dan lapor ke guru atau instruktur laboratorium untuk penanganan lebih lanjut."
    }
];

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    // Reset progress bar
    document.querySelector(".progress").style.width = "12.5%";
    showQuestion();
}

function updateProgress() {
    // Update question number text
    document.getElementById("current-question").textContent = currentQuestionIndex + 1;
    document.getElementById("total-questions").textContent = questions.length;
    
    // Update progress bar
    const progressBar = document.querySelector(".progress");
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progressPercentage + "%";
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    // Update progress
    updateProgress();

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("choice-btn");
        button.addEventListener("click", selectAnswer);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        choicesElement.appendChild(button);
    });
}

function resetState(){
    nextButton.style.display = "none";
    // Clear choices
    while(choicesElement.firstChild){
        choicesElement.removeChild(choicesElement.firstChild);
    }
    // Clear explanation if exists
    const explanationDiv = document.querySelector(".explanation");
    if(explanationDiv){
        explanationDiv.remove();
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    const currentQuestion = questions[currentQuestionIndex];
    
    // Create explanation element
    const explanationDiv = document.createElement("div");
    explanationDiv.classList.add("explanation");
    
    if(isCorrect){
        selectedBtn.classList.add("correct");
        explanationDiv.classList.add("correct-explanation");
        score++;
    }else{
        selectedBtn.classList.add("wrong");
        explanationDiv.classList.add("wrong-explanation");
    }
    
    // Show correct answer and disable all buttons
    Array.from(choicesElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    
    // Add explanation text
    explanationDiv.innerHTML = `
        <p><strong>${isCorrect ? "Benar!" : "Salah!"}</strong></p>
        <p>${currentQuestion.explanation}</p>
    `;
    
    // Insert explanation before next button
    choicesElement.insertAdjacentElement('afterend', explanationDiv);
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
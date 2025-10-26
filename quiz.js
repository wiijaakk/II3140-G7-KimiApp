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

// Mengambil elemen DOM yang dibutuhkan
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const startButton = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");

// Variabel global
let currentQuestionIndex = 0;
let score = 0;

// Menambahkan event listener saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Memeriksa apakah elemen yang dibutuhkan ada
    if (!startButton) {
        console.error("Start button not found!");
    } else {
        console.log("Start button found, adding event listener");
        
        // Menambahkan event listener untuk tombol mulai
        startButton.addEventListener("click", function() {
            console.log("Start button clicked");
            startScreen.classList.add("hidden"); // Menyembunyikan layar awal
            quizScreen.classList.remove("hidden"); // Menampilkan layar kuis
            startQuiz();
        });
    }
    
    // Menambahkan event listener untuk tombol next
    if (nextButton) {
        nextButton.addEventListener("click", function() {
            if (currentQuestionIndex < questions.length) {
                handleNextButton();
            } else {
                showScore();
            }
        });
    }
});

// Fungsi untuk memulai kuis
function startQuiz() {
    console.log("Starting quiz");
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    // Reset progress bar
    const progressBar = document.querySelector(".progress");
    if (progressBar) {
        progressBar.style.width = "12.5%"; // 100% / 8 questions
    }
    showQuestion();
}

// Fungsi untuk mengupdate progress
function updateProgress() {
    // Update nomor pertanyaan
    const currentQuestionElem = document.getElementById("current-question");
    const totalQuestionsElem = document.getElementById("total-questions");
    
    if (currentQuestionElem && totalQuestionsElem) {
        currentQuestionElem.textContent = currentQuestionIndex + 1;
        totalQuestionsElem.textContent = questions.length;
    }
    
    // Update progress bar
    const progressBar = document.querySelector(".progress");
    if (progressBar) {
        const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = progressPercentage + "%";
    }
}

// Fungsi untuk menampilkan pertanyaan
function showQuestion() {
    console.log(`Showing question ${currentQuestionIndex + 1}`);
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    // Update progress
    updateProgress();

    // Membuat tombol pilihan
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("choice-btn");
        button.addEventListener("click", selectAnswer);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        choicesElement.appendChild(button);
    });
}

// Fungsi untuk mereset state kuis
function resetState() {
    nextButton.style.display = "none";
    // Menghapus pilihan sebelumnya
    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild);
    }
    // Menghapus penjelasan jika ada
    const explanationDiv = document.querySelector(".explanation");
    if (explanationDiv) {
        explanationDiv.remove();
    }
}

// Fungsi untuk memilih jawaban
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    const currentQuestion = questions[currentQuestionIndex];
    
    // Membuat elemen penjelasan
    const explanationDiv = document.createElement("div");
    explanationDiv.classList.add("explanation");
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        explanationDiv.classList.add("correct-explanation");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
        explanationDiv.classList.add("wrong-explanation");
    }
    
    // Menampilkan jawaban benar dan menonaktifkan semua tombol
    Array.from(choicesElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    
    // Menambahkan teks penjelasan
    explanationDiv.innerHTML = `
        <p><strong>${isCorrect ? "Benar!" : "Salah!"}</strong></p>
        <p>${currentQuestion.explanation}</p>
    `;
    
    // Menyisipkan penjelasan sebelum tombol next
    choicesElement.insertAdjacentElement('afterend', explanationDiv);
    nextButton.style.display = "block";
}

// Fungsi untuk tombol Next
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Fungsi untuk menampilkan skor
function showScore() {
    resetState();
    quizScreen.innerHTML = `
        <h1>Kuis Kimia</h1>
        <div class="score-container">
            <h2>Skor Akhir Anda</h2>
            <div class="score-value">${score} dari ${questions.length}</div>
            <div class="score-points">${score * 4} poin</div>
            
            <div class="score-message">
                ${getScoreMessage(score)}
            </div>
            
            <button id="restart-btn">Coba Lagi</button>
        </div>
    `;
    
    // Menambahkan event listener untuk tombol restart
    document.getElementById("restart-btn").addEventListener("click", function() {
        location.reload(); // Memuat ulang halaman untuk memulai kembali
    });

    const finalPoints = score * 4;
    submitScore(finalPoints).then(response => {
        if (response && response.ok) {
            if (response.updated) {
                const maxEl = document.getElementById('max-score-display');
                if (maxEl) {
                    maxEl.textContent = 'Skor Maksimalmu: ' + response.max_score;
                }
            }
        }
    }).catch(err => console.error('Error saving score', err));
}

async function submitScore(finalScore) {
    try {
        const form = new FormData();
        form.append('score', String(finalScore));
        const res = await fetch('save_score.php', {
            method: 'POST',
            body: form,
            credentials: 'same-origin'
        });
        if (!res.ok) {
            let txt = await res.text();
            try { return JSON.parse(txt); } catch(e) { return { ok: false, msg: txt } }
        }
        return await res.json();
    } catch (e) {
        console.error(e);
        throw e;
    }
}

function getScoreMessage(score) {
    const percentage = (score / questions.length) * 100;
    
    if (percentage >= 80) {
        return "Bagus sekali! Anda menguasai materi dengan baik.";
    } else if (percentage >= 60) {
        return "Cukup baik! Teruslah berlatih untuk meningkatkan pemahaman Anda.";
    } else {
        return "Jangan menyerah! Cobalah lagi setelah mempelajari materi dengan lebih baik.";
    }
}
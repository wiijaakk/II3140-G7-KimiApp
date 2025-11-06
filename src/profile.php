<?php
session_start();
// Ambil data dari session, berikan nilai default jika tidak ada
$username = $_SESSION['username'] ?? 'Tamu';
$max_score = $_SESSION['max_score'] ?? 0;
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profil Pengguna - KimiApp</title>
  <link rel="stylesheet" href="profile.css">
</head>
<body>
  <header>
     <nav class="navbar">
      <div class="nav-logo">
        <a href="landing-page.php">
          <img src="assets/logo.png" alt="KimiApp Logo">
        </a>
      </div>

      <!-- cluster kanan -->
      <div class="nav-right">
        <ul class="nav-menu">
          <li><a href="theory.html" class="nav-link">Teori</a></li>
          <li><a href="virtuallab.html" class="nav-link">Simulasi</a></li>
          <li><a href="quiz.php" class="nav-link">Kuis</a></li>
        </ul>

        <div class="nav-profile">
          <a href="profile.php" class="profile-link" title="Lihat Profil">
            <img src="assets/profile.png" alt="Profile" class="profile-icon">
          </a>
        </div>
      </div>
    </nav>
  </header>

  <main class="profile-main">
    <div class="profile-container">
      <div class="card profile-card">
        
        <div class="user-info">
          <h2 class="username-title"><?php echo htmlspecialchars($username); ?></h2>
          <p class="user-greeting">Selamat datang di profil Anda!</p>
        </div>

        <div class="stats-grid">
          <div class="stat-item">
            <h3 class="stat-title">Progress Teori</h3>
            <div class="progress-wrapper">
              <div class="progress-container">
                <div class="progress-bar" id="theory-progress-bar" style="width: 0%;"></div>
              </div>
              <span class="progress-text" id="theory-progress-text">0% Selesai</span>
            </div>
            <p class="stat-description">
              Progress Anda dalam membaca modul teori. 
              <a href="theory.html">Lanjutkan Belajar</a>
            </p>
          </div>
          
          <div class="stat-item">
            <h3 class="stat-title">Skor Kuis Tertinggi</h3>
            <div class="quiz-score-display">
              <span id="quiz-score"><?php echo htmlspecialchars($max_score); ?></span>
              <span id="quiz-score-label">Poin</span>
            </div>
            <p class="stat-description">
              Skor tertinggi yang pernah Anda capai di kuis. 
              <a href="quiz.php">Coba Lagi</a>
            </p>
          </div>
        </div>

        <div class="logout-section">
          <a href="logout.php" class="logout-button">
            Logout
          </a>
        </div>
      </div>
    </div>
  </main>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Ambil data progress teori dari localStorage (yang disimpan oleh theory.html)
      const savedProgress = JSON.parse(localStorage.getItem('theoryProgress') || '[]');
      const totalSections = 4; // Total modul di theory.html
      
      let progressPercent = 0;
      if (Array.isArray(savedProgress) && savedProgress.length > 0) {
        progressPercent = (savedProgress.length / totalSections) * 100;
      }
      
      // Update progress bar dan teks di halaman profil
      const progressBar = document.getElementById('theory-progress-bar');
      const progressText = document.getElementById('theory-progress-text');
      
      if (progressBar && progressText) {
        progressBar.style.width = progressPercent + '%';
        progressText.textContent = Math.round(progressPercent) + '% Selesai';
      }
    });
  </script>
</body>
</html>
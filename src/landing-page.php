<?php 
session_start();
$uname = $_SESSION['username'] ?? '';
function showUsername($uname){
    return !empty($uname) ? "<h2 class=\"hero-title\">Hello, $uname! Selamat datang di</h2>" : '';
}
?> 

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chemistry Lab - Beranda</title>
  <link rel="stylesheet" href="landing-page.css">
</head>
<body>
  <header>
    <nav class="navbar">
      <div class="nav-logo">
        <a href="landing-page.php">
          <img src="assets/logo.png" alt="KimiApp Logo">
        </a>
      </div>
      <ul class="nav-menu">
        <li><a href="theory.html" class="nav-link">Teori</a></li>
        <li><a href="virtuallab.html" class="nav-link">Simulasi</a></li>
        <li><a href="quiz.php" class="nav-link">Kuis</a></li>
        <li><a href="logout.php" class="nav-link">Logout</a></li>
      </ul>
    </nav>
  </header>
  <main class="home-main">
    <div class="deco-blob-1"></div>
    <div class="deco-blob-2"></div>
    <section class="hero-section">
      <div class="container hero-content">
        <?= showUsername($uname); ?>
        <h2 class="hero-title">
          Virtual Lab Kimia Interaktif
        </h2>
        <p class="hero-subtitle">
          Pelajari konsep pencampuran larutan melalui simulasi digital yang aman, menyenangkan, dan mudah dipahami
        </p>
        <div class="hero-buttons">
          <a href="theory.html" class="btn btn-primary btn-lg">Mulai Belajar</a>
          <a href="#features" class="btn btn-outline btn-lg">Pelajari Lebih Lanjut</a>
        </div>
      </div>
    </section>

    <section id="features" class="features-section">
      <div class="container">
        <h3 class="section-title">Mengapa Virtual Lab?</h3>
        <div class="features-grid">
          <div class="card feature-card">
            <h4>Aman</h4>
            <p>Eksperimen tanpa risiko keselamatan</p>
          </div>
          <div class="card feature-card">
            <h4>Interaktif</h4>
            <p>Belajar sambil bermain dan bereksperimen</p>
          </div>
          <div class="card feature-card">
            <h4>Efektif</h4>
            <p>Pemahaman konsep yang lebih mendalam</p>
          </div>
        </div>
      </div>
    </section>

    <section id="modules" class="modules-section">
      <div class="container">
        <h3 class="section-title">Modul Pembelajaran</h3>
        <div class="modules-grid">
          <a href="theory.html" class="card-link">
            <div class="card module-card">
              <div class="module-icon">📚</div>
              <h4 class="module-title">Modul Teori</h4>
              <p class="module-description">Pelajari konsep dasar larutan, jenis-jenis reaksi kimia, dan perubahan warna</p>
              <div class="module-link-text">
                Mulai <span class="module-arrow">→</span>
              </div>
            </div>
          </a>
          <a href="simulation.html" class="card-link">
            <div class="card module-card">
              <div class="module-icon">🧪</div>
              <h4 class="module-title">Simulasi Interaktif</h4>
              <p class="module-description">Lakukan eksperimen virtual dengan mencampurkan berbagai larutan</p>
              <div class="module-link-text">
                Mulai <span class="module-arrow">→</span>
              </div>
            </div>
          </a>
          <a href="quiz.html" class="card-link">
            <div class="card module-card">
              <div class="module-icon">✓</div>
              <h4 class="module-title">Kuis Akhir</h4>
              <p class="module-description">Uji pemahamanmu dengan pertanyaan pilihan ganda dan mini-simulasi</p>
              <div class="module-link-text">
                Mulai <span class="module-arrow">→</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <footer class="main-footer">
      <div class="container footer-content">
        <p>KimiApp © 2025 - Platform Pembelajaran Interaktif</p>
      </div>
    </footer>

  </main>
</body>
</html>

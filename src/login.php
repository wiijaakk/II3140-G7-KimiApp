<?php
session_start();
$err = $_SESSION['login_error'] ?? null;
unset($_SESSION['login_error']);
$success = $_SESSION['register_success'] ?? null;
unset($_SESSION['register_success']);
function showError($error){
    return !empty($error) ? "<p class='error-message'>$error</p>" : '';
}
function showSuccess($msg){
    return !empty($msg) ? "<p class='success-message'>$msg</p>" : '';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KimiApp - Log In</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="styles.css">
    <script type="text/javascript" src="validation.js" defer></script>
</head>
<body>
    <main class="alt-main">
        <section class="masuk">
            <div class="masuk-card">
                <img src="assets/logo.png" alt="KimiApp" class="masuk-logo">
                <h1>Selamat datang di KimiApp!</h1>
                <h2>Silakan masuk untuk melanjutkan</h2>
                <p id="error-message"></p>
                <?= showError($err); ?>
                <?= showSuccess($success); ?>
                <form id="form" method="post" action="login_register.php">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Password">
                    </div>
                    <div style="text-align:center;">
                        <button class="btn-primary" type="submit" name="login">Log In</button>
                    </div>
                    <p style="text-align:center;">Belum punya akun? <a href="register.php">Daftar di sini</a></p>
                </form>
            </div>
        </section>
    </main>
</body>
</html>
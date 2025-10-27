<?php
session_start();
$err = $_SESSION['register_error'] ?? null;
unset($_SESSION['register_error']);
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
    <title>KimiApp</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="styles.css">
    <script type="text/javascript" src="validation.js" defer></script>
</head>
<body>
    <main class="alt-main">
        <section class="masuk">
            <div class="masuk-card">
                <img src="../assets/logo.png" alt="KimiApp" class="masuk-logo">
                <h1>Selamat datang di KimiApp!</h1>
                <p id="error-message"></p>
                <?= showError($err); ?>
                <?= showSuccess($success); ?>
                <form id="form" action="login_register.php" method="post">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input id="username" type="text" name="username" placeholder="Username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input id="password" type="password" name="password" placeholder="Password">
                    </div>
                    <div style="text-align:center;">
                        <button class="btn-primary" type="submit" name="register">Register</button>
                    </div>
                    <p style="text-align:center;">Sudah punya akun? <a href="login.php">Masuk di sini</a></p>
                </form>
            </div>
        </section>
    </main>
</body>
</html>
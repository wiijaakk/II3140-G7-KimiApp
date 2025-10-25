<?php
session_start();
require_once 'config.php';

if(isset($_POST['register'])){
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    $check = $conn->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
    $check->bind_param('s', $email);
    $check->execute();
    $check->store_result();
    if($check->num_rows > 0){
        $_SESSION['register_error']='Email telah terdaftar!';
        $check->close();
        header('Location: register.php');
        exit();
    }
    $check->close();

    $check = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $check->bind_param('s', $username);
    $check->execute();
    $check->store_result();
    if($check->num_rows > 0){
        $_SESSION['register_error']='Username sudah dipakai!';
        $check->close();
        header('Location: register.php');
        exit();
    }
    $check->close();

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $check = $conn->prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)");
    $check->bind_param('sss', $email, $username, $passwordHash);
    if($check->execute()){
        $_SESSION['register_success'] = 'Pendaftaran berhasil. Silakan login.';
        $check->close();
        header('Location: login.php');
        exit();
    } else {
        $_SESSION['register_error'] = 'Gagal menyimpan data (server error).';
        $check->close();
        header('Location: register.php');
        exit();
    }
}

if(isset($_POST['login'])){
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    $check = $conn->prepare("SELECT id, username, email, password FROM users WHERE username = ?");
    $check->bind_param('s', $username);
    $check->execute();
    $result = $check->get_result();
    if($result && $result->num_rows === 1){
        $user = $result->fetch_assoc();
        if(password_verify($password, $user['password'])){
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            $check->close();
            header('Location: #.php');
            exit();
        }
    }

    $_SESSION['login_error']='Username atau password salah!';
    if(isset($check) && is_object($check)) $check->close();
    header('Location: login.php');
    exit();
}
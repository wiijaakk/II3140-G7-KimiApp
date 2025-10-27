<?php
$host = 'db';
$user = 'user';
$pass = 'password';
$dbname = 'kimiapp';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
  die("Koneksi gagal: " . $conn->connect_error);
}
?>
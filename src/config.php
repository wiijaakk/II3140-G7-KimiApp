<?php
$host = 'mysql.railway.internal';
$user = 'root';
$pass = 'hMrRXVmilfiwLdbtXOQaCLhMYdoLQpzt';
$db   = 'railway';
// $port = getenv('DB_PORT');

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
  die("Koneksi gagal: " . $conn->connect_error);
}
?>
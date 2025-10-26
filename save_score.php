<?php
session_start();
require_once 'config.php';
header('Content-Type: application/json; charset=utf-8');

$score = (int) $_POST['score'];
$user_id = (int) $_SESSION['user_id'];

$stmt = $conn->prepare("SELECT max_score FROM users WHERE id = ? LIMIT 1");
$stmt->bind_param('i', $user_id);
$stmt->execute();
$res = $stmt->get_result();
$row = $res->fetch_assoc();
$current = isset($row['max_score']) ? (int)$row['max_score'] : 0;
$stmt->close();

if ($score > $current) {
    $upd = $conn->prepare("UPDATE users SET max_score = ? WHERE id = ?");
    $upd->bind_param('ii', $score, $user_id);
    if ($upd->execute()) {
        $_SESSION['max_score'] = $score;
        echo json_encode(['ok' => true, 'updated' => true, 'max_score' => $score]);
    } else {
        http_response_code(500);
        echo json_encode(['ok' => false, 'msg' => 'DB update failed']);
    }
    $upd->close();
} else {
    echo json_encode(['ok' => true, 'updated' => false, 'max_score' => $current]);
}
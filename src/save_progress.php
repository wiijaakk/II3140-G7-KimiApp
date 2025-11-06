<?php
session_start();
require_once 'config.php';
header('Content-Type: application/json; charset=utf-8');

$user_id = (int) $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT completed_sections FROM user_progress WHERE user_id = ? LIMIT 1");
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $progress = $row ? json_decode($row['completed_sections'], true) : [];
    if (!is_array($progress)) {
        $progress = [];
    }
    $stmt->close();
    echo json_encode([
        'ok' => true,
        'completedSections' => $progress
    ]);
    exit;
}
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $curr = json_decode(file_get_contents('php://input'), true)['completedSections'] ?? [];

    $stmt = $conn->prepare("SELECT completed_sections FROM user_progress WHERE user_id = ? LIMIT 1");
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    $existing_progress = $row ? json_decode($row['completed_sections'], true) : [];
    if (!is_array($existing_progress)) {
        $existing_progress = [];
    }
    $stmt->close();

    $merged = array_unique(array_merge($existing_progress, $curr));
    $updated_progress = array_values($merged);

    if (count($updated_progress) !== count($existing_progress) || count(array_diff($updated_progress, $existing_progress)) > 0) {
        $sections_json = json_encode($updated_progress);
        $upd = $conn->prepare("REPLACE INTO user_progress (user_id, completed_sections) VALUES (?, ?)");
        $upd->bind_param('is', $user_id, $sections_json);
        if ($upd->execute()) {
            $_SESSION['progress'] = $updated_progress;
            echo json_encode([
                'ok' => true, 
                'updated' => true, 
                'completedSections' => $updated_progress
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'ok' => false, 
                'msg' => 'Database update failed: ' . $conn->error
            ]);
        }
        $upd->close();
    } else {
        echo json_encode([
            'ok' => true, 
            'updated' => false, 
            'completedSections' => $existing_progress
        ]);
    }
}


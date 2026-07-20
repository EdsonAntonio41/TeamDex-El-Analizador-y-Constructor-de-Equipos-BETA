<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);
    $pokemon = isset($data['pokemon']) ? trim($data['pokemon']) : '';
    
    if (empty($pokemon) && isset($_POST['pokemon'])) {
        $pokemon = trim($_POST['pokemon']);
    }

    if (!empty($pokemon)) {
        $file = __DIR__ . '/Falta.txt';
        $entry = "[" . date('Y-m-d H:i:s') . "] Pokémon faltante sugerido: " . $pokemon . PHP_EOL;
        file_put_contents($file, $entry, FILE_APPEND | LOCK_EX);
        echo json_encode(['success' => true, 'message' => 'Sugerencia guardada correctamente en Falta.txt']);
        exit;
    }
}

echo json_encode(['success' => false, 'message' => 'No se especificó ningún Pokémon']);

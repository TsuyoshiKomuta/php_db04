<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db.php';

// POSTデータからtile_idを取得
if (isset($_POST['tile_id'])) {
    $tile_id = $_POST['tile_id'];
    // echo "Tile ID: $tile_id\n"; // デバッグ用
} else {
    echo json_encode(['error' => 'tile_id not provided']);
    exit;
}

// データ取得クエリ
$status_query = "SELECT * FROM character_status WHERE tile_id = ?";
$assets_query = "SELECT * FROM character_assets WHERE tile_id = ?";

// 出力バッファリングを開始
ob_start();

if ($stmt_status = $conn->prepare($status_query)) {
    $stmt_status->bind_param("s", $tile_id);
    $stmt_status->execute();
    $result_status = $stmt_status->get_result()->fetch_assoc();
    $stmt_status->close();
} else {
    ob_end_clean();
    echo json_encode(['error' => 'Failed to prepare statement for character_status']);
    exit;
}

if ($stmt_assets = $conn->prepare($assets_query)) {
    $stmt_assets->bind_param("s", $tile_id);
    $stmt_assets->execute();
    $result_assets = $stmt_assets->get_result()->fetch_assoc();
    $stmt_assets->close();
} else {
    ob_end_clean();
    echo json_encode(['error' => 'Failed to prepare statement for character_assets']);
    exit;
}

// データが存在しない場合は空の配列を返す
if (!$result_status) {
    $result_status = [
        'name' => '',
        'birthdate' => '',
        'address' => ''
    ];
}

if (!$result_assets) {
    $result_assets = [
        'bank_account1' => '',
        'bank_account2' => '',
        'bank_account3' => '',
        'securities_account1' => '',
        'securities_account2' => '',
        'securities_account3' => '',
        'land1' => '',
        'land2' => '',
        'land3' => '',
        'building1' => '',
        'building2' => '',
        'building3' => ''
    ];
}

// 出力バッファの内容を消去して無視
ob_end_clean();

// 結果を結合
$response = array_merge($result_status, $result_assets);

// データをJSON形式で返す
header('Content-Type: application/json');
echo json_encode($response);

// データベース接続を閉じる
$conn->close();

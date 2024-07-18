<?php
// エラーハンドリングのための設定
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "souzokumap01_db";

// データベース接続
$conn = new mysqli($servername, $username, $password, $dbname);

// 接続確認
if ($conn->connect_error) {
    echo json_encode(['error' => "データベースに接続が失敗しました: " . $conn->connect_error]);
    exit();
} 
// else {
//     echo "データベースに接続がされました-Connected successfully-";
// }

?>
<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$DB_HOST = 'localhost';
$DB_NAME = "adiok2_travelmap";    
$DB_USER = "adiok2_traveluser";        
$DB_PASS = "Traveluser123";

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

if ($mysqli->connect_errno) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'DB connection failed'], JSON_UNESCAPED_UNICODE);
  exit;
}

$mysqli->set_charset('utf8mb4');

function respond(int $code, array $payload): void {
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

function s($v, int $max): string {
  $t = trim((string)$v);
  if (mb_strlen($t) > $max) {
    $t = mb_substr($t, 0, $max);
  }
  return $t;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {

  $destination = s($_GET['destination'] ?? '', 80);
  if ($destination === '') {
    respond(400, ['ok'=>false,'error'=>'Missing destination']);
  }

  $stmt = $mysqli->prepare(
    "SELECT name, rating, title, experience, tips,
            DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') AS created_at
     FROM experiences
     WHERE destination = ?
     ORDER BY id DESC
     LIMIT 30"
  );

  if (!$stmt) {
    respond(500, ['ok'=>false,'error'=>'Prepare failed']);
  }

  $stmt->bind_param("s", $destination);

  if (!$stmt->execute()) {
    respond(500, ['ok'=>false,'error'=>'Execute failed']);
  }

  $res = $stmt->get_result();
  $rows = [];

  while ($row = $res->fetch_assoc()) {
    $rows[] = $row;
  }

  $stmt->close();
  respond(200, ['ok'=>true,'reviews'=>$rows]);
}

if ($method === 'POST') {

  $destination = s($_POST['destination'] ?? '', 80);
  $name       = s($_POST['name'] ?? '', 60);
  $rating     = (int)($_POST['rating'] ?? 0);
  $title      = s($_POST['title'] ?? '', 120);
  $experience = s($_POST['experience'] ?? '', 1500);
  $tips       = s($_POST['tips'] ?? '', 600);

  if (
    $destination === '' ||
    $name === '' ||
    $title === '' ||
    $experience === '' ||
    $rating < 1 ||
    $rating > 5
  ) {
    respond(400, ['ok'=>false,'error'=>'Validation failed']);
  }

  $stmt = $mysqli->prepare(
    "INSERT INTO experiences (destination, name, rating, title, experience, tips)
     VALUES (?, ?, ?, ?, ?, ?)"
  );

  if (!$stmt) {
    respond(500, ['ok'=>false,'error'=>'Prepare failed']);
  }

  $stmt->bind_param("ssisss", $destination, $name, $rating, $title, $experience, $tips);

  if (!$stmt->execute()) {
    respond(500, ['ok'=>false,'error'=>'Insert failed']);
  }

  $stmt->close();
  respond(200, ['ok'=>true]);
}

respond(405, ['ok'=>false,'error'=>'Method not allowed']);

?>
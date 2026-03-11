<?php
/**
 * Contact Form Handler
 * Processes form submissions and sends email via PHP mail()
 * 
 * InfinityFree supports PHP mail() — but be aware:
 * - Free hosting may have sending limits
 * - Set realistic expectations for deliverability
 */

// Set response header
header('Content-Type: application/json');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// ─── Configuration ───
$recipient   = 'your.email@example.com';  // ← CHANGE THIS
$siteName    = 'Manhattan Portfolio';
$maxFieldLen = 5000;

// ─── Sanitize & Validate ───
$name    = trim(htmlspecialchars(strip_tags($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8'));
$email   = trim(filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL));
$message = trim(htmlspecialchars(strip_tags($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8'));

// Validation
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Name is required (min 2 characters).';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email is required.';
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Message is required (min 10 characters).';
}

if (strlen($name) > $maxFieldLen || strlen($message) > $maxFieldLen) {
    $errors[] = 'Input exceeds maximum length.';
}

// ─── Basic Honeypot / Bot Check ───
// If you add a hidden field named "website" to the form and it's filled in, it's a bot
if (!empty($_POST['website'])) {
    // Silently reject — pretend success to bots
    echo json_encode(['success' => true]);
    exit;
}

// ─── Rate Limiting (session-based, simple) ───
session_start();
$now = time();
$cooldown = 60; // 60 seconds between submissions

if (isset($_SESSION['last_submission']) && ($now - $_SESSION['last_submission'] < $cooldown)) {
    echo json_encode([
        'success' => false,
        'error'   => 'Please wait before sending another message.'
    ]);
    exit;
}

// ─── If Errors, Return ───
if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'error'   => implode(' ', $errors)
    ]);
    exit;
}

// ─── Build & Send Email ───
$subject = "[{$siteName}] New message from {$name}";

$body  = "═══════════════════════════════════════\n";
$body .= "  NEW TRANSMISSION — {$siteName}\n";
$body .= "═══════════════════════════════════════\n\n";
$body .= "From:    {$name}\n";
$body .= "Email:   {$email}\n";
$body .= "Date:    " . date('Y-m-d H:i:s T') . "\n";
$body .= "IP:      " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n\n";
$body .= "───────────────────────────────────────\n";
$body .= "MESSAGE:\n";
$body .= "───────────────────────────────────────\n\n";
$body .= $message . "\n\n";
$body .= "═══════════════════════════════════════\n";

$headers  = "From: {$siteName} <noreply@" . ($_SERVER['SERVER_NAME'] ?? 'localhost') . ">\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($recipient, $subject, $body, $headers);

if ($sent) {
    $_SESSION['last_submission'] = $now;
    echo json_encode(['success' => true]);
} else {
    echo json_encode([
        'success' => false,
        'error'   => 'Failed to send. Please email me directly.'
    ]);
}
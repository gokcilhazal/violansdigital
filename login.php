
<?php
session_start();
require_once "config/db.php";

$hata = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST["username"] ?? "");
    $password = $_POST["password"] ?? "";

    $sorgu = $db->prepare(
        "SELECT * FROM admins WHERE username = ?"
    );

    $sorgu->execute([$username]);
    $admin = $sorgu->fetch(PDO::FETCH_ASSOC);

    if ($admin && password_verify($password, $admin["password"])) {
        session_regenerate_id(true);

        $_SESSION["admin_id"] = $admin["id"];
        $_SESSION["admin_username"] = $admin["username"];

        header("Location: dashboard.php");
        exit;
    } else {
        $hata = "Kullanıcı adı veya şifre hatalı!";
    }
}
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Violans Digital | Yönetici Girişi</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #171221;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .login-box {
            background: #241b35;
            padding: 40px;
            border-radius: 18px;
            width: 320px;
            color: white;
            box-shadow: 0 10px 35px #0005;
        }

        h2 {
            color: #b995ff;
            text-align: center;
        }

        input {
            width: 100%;
            box-sizing: border-box;
            padding: 13px;
            margin: 10px 0;
            border: 1px solid #594080;
            border-radius: 8px;
            background: #171221;
            color: white;
        }

        button {
            width: 100%;
            padding: 13px;
            margin-top: 15px;
            background: #9966ff;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }

        .error {
            color: #ff8b9a;
            text-align: center;
        }
    </style>
</head>
<body>

<div class="login-box">
    <h2>Violans Digital</h2>
    <p style="text-align:center;">Yönetici Paneli</p>

    <?php if ($hata): ?>
        <p class="error"><?= htmlspecialchars($hata) ?></p>
    <?php endif; ?>

    <form method="POST">
        <input type="text" name="username"
               placeholder="Kullanıcı adı" required>

        <input type="password" name="password"
               placeholder="Şifre" required>

        <button type="submit">Giriş Yap</button>
    </form>
</div>

</body>
</html>

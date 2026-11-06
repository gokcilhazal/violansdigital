
<?php
session_start();

if (!isset($_SESSION["admin_id"])) {
    header("Location: login.php");
    exit;
}

?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Violans Digital | Yönetim Paneli</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #171221;
            color: white;
        }

        header {
            background: #241b35;
            padding: 22px 35px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        header h2 {
            color: #b995ff;
            margin: 0;
        }

        .container {
            padding: 35px;
        }

        .welcome {
            margin-bottom: 30px;
        }

    

        .button {
            display: inline-block;
            padding: 12px 20px;
            background: #9966ff;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin-top: 10px;
        }

        .logout {
            background: #594080;
            color: white;
            padding: 10px 18px;
            border-radius: 8px;
            text-decoration: none;
        }
    </style>
</head>

<body>

<header>
    <h2>Violans Digital</h2>
    <a class="logout" href="logout.php">Çıkış Yap</a>
</header>

<div class="container">

    <div class="welcome">
        <h1>Hoş geldin, <?= htmlspecialchars($_SESSION["admin_username"]) ?>!</h1>
        <p>Web sitenin yönetim paneline hoş geldin.</p>
    </div>

  <div class="card">
    <h3>Web Sitesi</h3>
    <p>Yayındaki web siteni görüntüle.</p>
    <a href="https://violansdigital.netlify.app/" target="_blank" class="button">
        Siteyi Görüntüle
    </a>
</div>

        <div class="card">
            <h3>İçerik Yönetimi</h3>
            <p>Web sitendeki içerikleri düzenleyeceğin alan.</p>
            <a href="#" class="button">Yakında</a>
        </div>

        <div class="card">
            <h3>Web Sitesi</h3>
            <p>Yayındaki web siteni görüntüle.</p>
            <a href="index.html" target="_blank" class="button">Siteyi Görüntüle</a>
        </div>

    </div>

</div>

</body>
</html>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>そうぞくMAP</title>
    <!-- reset.css ress -->
    <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="styles.css">

</head>

<body>
    <!-- ヘッダー -->
    <header class='header'>
        <div class='logo'>
            <a href='index.php'><img src='images/logo_souzokumap.png' alt='そうぞくMAPロゴ'></a>
        </div>
        <nav class='nav-links'>
            <!-- ナビゲーションリンクをここに追加する -->
        </nav>
        <div class='nav-buttons'>
            <button class='logout-button'>ログアウト</button>
        </div>
    </header>

    <div id="wrapper">
        <div id="canvas"></div>
    </div>

    <!-- フッター -->
    <footer>
        © 2024 com-office.
    </footer>

    <div id="circular-menu" class="circular-menu">
        <div class="menu-item" id="add-relative"><span style="color: yellow; font-weight: bold;">＋</span>親族</div>
        <div class="menu-item" id="consider-inheritance">相続検討</div>
        <div class="menu-item" id="char-edit">編集</div>
        <div class="menu-item" id="char-delete">削除</div>
    </div>

    <div id="sub-menu-relative" class="sub-menu-relative">
        <div class="sub-menu-item parent" id="add-parent">＋親</div>
        <div class="sub-menu-item spouse" id="add-spouse">＋配偶者</div>
        <div class="sub-menu-item child" id="add-child">＋子</div>
        <div class="sub-menu-item ex-spouse" id="add-ex-spouse">＋元配偶者</div>
    </div>

    <!-- カスタムダイアログのHTML -->
    <!-- 配偶者追加のダイアログ -->
    <div class="add-spouse" title="配偶者の追加">
        <p>配偶者を追加しますか？</p>
    </div>

    <!-- 元配偶者追加のダイアログ -->
    <div class="add-ex-spouse" title="元配偶者の追加">
        <p>元の配偶者を追加しますか？</p>
    </div>

    <!-- 子追加のダイアログ -->
    <div class="add-child" title="子の追加">
        <p>夫婦の間の子を追加しますか？</p>
    </div>

    <!-- ステータスダイアログ -->
    <div id="status-dialog" title="ステータス" style="display:none;">
        <div class="status-content">
            <div class="status-header">
                <img id="char-icon" src="" alt="キャラアイコン">
                <span id="char-name"></span>
            </div>
            <div class="status-body">
                <p>生年月日: <span id="birthdate"></span></p>
                <p>年齢: <span id="age"></span></p>
                <p>住まい: <span id="address"></span></p>
                <h3>【自分の資産】</h3>
                <div>
                    <p>預貯金</p>
                    <p>口座１: <span id="bank_account1"></span></p>
                    <p>口座２: <span id="bank_account2"></span></p>
                    <p>口座３: <span id="bank_account3"></span></p>
                </div>
                <div>
                    <p>有価証券</p>
                    <p>口座１: <span id="securities_account1"></span></p>
                    <p>口座２: <span id="securities_account2"></span></p>
                    <p>口座３: <span id="securities_account3"></span></p>
                </div>
                <div>
                    <p>土地</p>
                    <p>土地１: <span id="land1"></span></p>
                    <p>土地２: <span id="land2"></span></p>
                    <p>土地３: <span id="land3"></span></p>
                </div>
                <div>
                    <p>建物</p>
                    <p>建物１: <span id="building1"></span></p>
                    <p>建物２: <span id="building2"></span></p>
                    <p>建物３: <span id="building3"></span></p>
                </div>
            </div>
            <button id="edit-button">編集</button>
        </div>
    </div>

    <!-- jQueryとjQuery UIのスクリプトをインクルード -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="script.js"></script>
</body>

</html>
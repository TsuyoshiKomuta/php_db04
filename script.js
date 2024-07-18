let clickedCharTileId; // 大域変数としてタイルIDを宣言
let clickedCharOffset; // 大域変数としてクリックされたキャラクターのブラウザ上の位置を宣言

$(function () {
    function createTiles() {
        const $canvas = $('#canvas');
        $canvas.empty(); // 既存のタイルをクリア

        const tilesPerRow = 24;
        const tilesPerColumn = 12;
        const totalTiles = tilesPerRow * tilesPerColumn;

        for (let i = 0; i < totalTiles; i++) {
            const $tile = $('<div class="tile"></div>');
            // $tile.text(i + 1);  // タイルにデバッグ用の通し番号を表示
            $tile.attr('id', 'tile-' + (i + 1));  // 通し番号のidを付与
            $canvas.append($tile);
        }
    }

    // 画面スクロールを無効化する関数
    function disableScroll() {
        $('#wrapper').css('overflow', 'hidden');
    }

    // 画面スクロールを再有効化する関数
    function enableScroll() {
        $('#wrapper').css('overflow', 'auto');
    }

    // 指定されたタイルの真下にあるタイルのIDを計算する関数
    function getTileBelow(tileId, tilesPerRow = 24) {
        const tileNumber = parseInt(tileId.split('-')[1]);
        const tileBelowNumber = tileNumber + tilesPerRow;
        return 'tile-' + tileBelowNumber;
    }

    // 指定されたタイルの真上にあるタイルのIDを計算する関数
    function getTileAbove(tileId, tilesPerRow = 24) {
        const tileNumber = parseInt(tileId.split('-')[1]);
        const tileAboveNumber = tileNumber - tilesPerRow;
        return 'tile-' + tileAboveNumber;
    }

    // 指定されたタイルの右隣にあるタイルのIDを計算する関数
    function getTileRight(tileId) {
        const tileNumber = parseInt(tileId.split('-')[1]);
        const tileRightNumber = tileNumber + 1;
        return 'tile-' + tileRightNumber;
    }

    // 指定されたタイルの左隣にあるタイルのIDを計算する関数
    function getTileLeft(tileId) {
        const tileNumber = parseInt(tileId.split('-')[1]);
        const tileLeftNumber = tileNumber - 1;
        return 'tile-' + tileLeftNumber;
    }

    // キャラクターを追加する関数
    function addCharacter(tileId, charClass, labelText) {
        const $charIcon = $('<div class="char-icon ' + charClass + '"></div>');
        const $label = $('<span class="label">' + labelText + '</span>');
        const $tile = $('#' + tileId);
        $tile.empty().append($charIcon).append($label);
    }

    // 子の追加ダイアログを表示する関数
    function showAddChildDialog(onConfirm) {
        $(".add-child").dialog({
            autoOpen: false,
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "はい": function () {
                    if (typeof onConfirm === 'function') {
                        onConfirm();
                    }
                    $(this).dialog("close");
                },
                "いいえ": function () {
                    $(this).dialog("close");
                    console.log('子を追加しませんでした');
                }
            }
        }).dialog("open");
    }

    // 親子ラインをクリックした時の処理を共通化する関数
    function handleParentChildLineClick($line, charClass, labelText) {
        const $tile = $line.closest('.tile'); // クリックされた親子ラインがあるタイル
        const tileId = $tile.attr('id');

        // 親子ラインを削除
        $line.remove();

        // 親子ライン２のHTMLを作成し、追加
        const $parentChildLine02 = $('<div class="parent-child-line02" id="parent-child-line02"></div>');
        $tile.append($parentChildLine02);
        console.log(tileId + 'に親子ライン２を追加しました');

        // 親子ライン２の右隣のタイルを特定し、親子ライン３を追加
        const tileRightId = getTileRight(tileId);
        const $tileRight = $('#' + tileRightId);
        const $parentChildLine03 = $('<div class="parent-child-line03" id="parent-child-line03"></div>');
        $tileRight.append($parentChildLine03);
        console.log(tileRightId + 'に親子ライン３を追加しました');

        // 親子ライン３の下のタイルに子のキャラアイコンを追加
        const tileBelowId = getTileBelow(tileRightId);
        addCharacter(tileBelowId, charClass, labelText);
        console.log(tileBelowId + 'に子を追加しました');
    }

    // 親子ライン5をクリックした時の処理を共通化する関数
    function handleExParentChildLineClick($line, charClass, labelText) {
        const $tile = $line.closest('.tile'); // クリックされた親子ラインがあるタイル
        const tileId = $tile.attr('id');

        // 親子ライン1を親子ライン5に変更
        $line.remove();
        const $parentChildLine05 = $('<div class="parent-child-line05" id="parent-child-line05"></div>');
        $tile.append($parentChildLine05);
        console.log(tileId + 'に親子ライン５を追加しました');

        // 親子ライン５の左隣のタイルに親子ライン６を追加
        const tileLeftId = getTileLeft(tileId);
        const $tileLeft = $('#' + tileLeftId);
        const $parentChildLine06 = $('<div class="parent-child-line06" id="parent-child-line06"></div>');
        $tileLeft.append($parentChildLine06);
        console.log(tileLeftId + 'に親子ライン６を追加しました');

        // 親子ライン６の下のタイルに子のキャラアイコンを追加
        const tileBelowId = getTileBelow(tileLeftId);
        addCharacter(tileBelowId, charClass, labelText);
        console.log(tileBelowId + 'に子を追加しました');
    }


    // 親子ライン3の処理を共通化する関数
    function handleParentChildLine03Click($line, charClass, labelText) {
        const $tile = $line.closest('.tile'); // クリックされた親子ラインがあるタイル
        const tileId = $tile.attr('id');

        // 親子ライン３を親子ライン４に変更
        $line.remove();
        const $parentChildLine04 = $('<div class="parent-child-line04" id="parent-child-line04"></div>');
        $tile.append($parentChildLine04);
        console.log(tileId + 'に親子ライン４を追加しました');

        // 親子ライン４の右隣のタイルに親子ライン３を追加
        const tileRightId = getTileRight(tileId);
        const $tileRight = $('#' + tileRightId);
        const $parentChildLine03 = $('<div class="parent-child-line03" id="parent-child-line03"></div>');
        $tileRight.append($parentChildLine03);
        console.log(tileRightId + 'に親子ライン３を追加しました');

        // 親子ライン３の下のタイルに子のキャラアイコンを追加
        const tileBelowId = getTileBelow(tileRightId);
        addCharacter(tileBelowId, charClass, labelText);
        console.log(tileBelowId + 'に子を追加しました');
    }

    // 親子ライン6の処理を共通化する関数
    function handleParentChildLine06Click($line, charClass, labelText) {
        const $tile = $line.closest('.tile'); // クリックされた親子ラインがあるタイル
        const tileId = $tile.attr('id');

        // 親子ライン6を親子ライン4に変更
        $line.remove();
        const $parentChildLine04 = $('<div class="parent-child-line04" id="parent-child-line04"></div>');
        $tile.append($parentChildLine04);
        console.log(tileId + 'に親子ライン4を追加しました');

        // 親子ライン4の左隣のタイルを特定し、親子ライン6を追加
        const tileLeftId = getTileLeft(tileId);
        const $tileLeft = $('#' + tileLeftId);
        const $parentChildLine06 = $('<div class="parent-child-line06" id="parent-child-line06"></div>');
        $tileLeft.append($parentChildLine06);
        console.log(tileLeftId + 'に親子ライン6を追加しました');

        // 親子ライン6の下のタイルに子のキャラアイコンを追加
        const tileBelowId = getTileBelow(tileLeftId);
        addCharacter(tileBelowId, charClass, labelText);
        console.log(tileBelowId + 'に子を追加しました');
    }


    // 元配偶者追加ダイアログを表示する関数
    function showAddExSpouseDialog(onConfirm) {
        $(".add-ex-spouse").dialog({
            autoOpen: false,
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "はい": function () {
                    if (typeof onConfirm === 'function') {
                        onConfirm();
                    }
                    $(this).dialog("close");
                },
                "いいえ": function () {
                    $(this).dialog("close");
                    console.log('元配偶者を追加しませんでした');
                }
            }
        }).dialog("open");
    }

    // ここからそうぞくMAPアプリスタート
    createTiles();

    // 初回のみのクリックイベント（#tile-58に.first-charを表示）
    $(document).one('click', function () {
        const $tile = $('#tile-58');
        $tile.empty();
        const $charIcon = $('<div class="char-icon first-char"></div>');
        const $label = $('<span class="label">トラ</span>');
        $tile.append($charIcon).append($label);
    });

    // char-iconをクリックしたときのイベント（円形メニューを表示、ステータスダイアログを表示）
    $(document).on('click', '.char-icon', function (event) {
        // .char-iconの親要素（.tile）のid（tile=○）をtileIdに格納
        const tileId = $(this).parent().attr('id');
        console.log('Clicked tile-ID:', tileId);

        // 円形メニューの表示
        const $menu = $('#circular-menu');
        const offset = $(this).offset();
        clickedCharOffset = offset; // 大域変数"clickedCharOffset"にクリックキャラの位置を保存
        console.log(clickedCharOffset);
        const menuSize = $menu.outerWidth();
        const left = offset.left + $(this).outerWidth() / 2 - menuSize / 2;
        const top = offset.top + $(this).outerHeight() / 2 - menuSize / 2;
        $menu.css({ left: left, top: top }).show();
        disableScroll(); // 画面スクロールを無効化
        event.stopPropagation(); // イベントの伝播を止める

        // クリックされたchar-iconの親tileのIDを大域変数"clickedCharTileId"に保存
        clickedCharTileId = $(this).parent().attr('id');

        console.log('Sending AJAX request'); // 追加
        // ステータスダイアログを取得し、表示
        $.post('get_character_status.php', { tile_id: tileId }, function (data) {
            console.log('Raw response data:', data); // デバッグ用
            try {
                if (data.error) {
                    console.error(data.error);
                    alert(data.error); // エラーメッセージをアラート表示
                    return;
                }

                // $('#status-icon').attr('src', $(this).css('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0]);
                $('#status-name').text(data.name);
                $('#status-birthdate').text(data.birthdate);
                $('#status-age').text(calculateAge(new Date(data.birthdate)));
                $('#status-address').text(data.address + " 在住");
                $('#status-bank1').text(data.bank_account1);
                $('#status-bank2').text(data.bank_account2);
                $('#status-bank3').text(data.bank_account3);
                $('#status-securities1').text(data.securities_account1);
                $('#status-securities2').text(data.securities_account2);
                $('#status-securities3').text(data.securities_account3);
                $('#status-land1').text(data.land1);
                $('#status-land2').text(data.land2);
                $('#status-land3').text(data.land3);
                $('#status-building1').text(data.building1);
                $('#status-building2').text(data.building2);
                $('#status-building3').text(data.building3);

                $('#status-dialog').dialog({
                    width: 920,
                    height: 320,
                    position: { my: "center bottom", at: "center bottom", of: window },
                    modal: true,
                    resizable: false,
                    closeOnEscape: true
                }).dialog("open");
            } catch (e) {
                console.error("Failed to process response: ", e);
                console.error("Response data: ", data);
            }
        }).fail(function (xhr, status, error) {
            console.error("AJAX request failed: ", status, error);
            console.error("Response data: ", xhr.responseText);
        });
    });

    // 年齢を計算する関数
    function calculateAge(birthdate) {
        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear();
        const m = today.getMonth() - birthdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
            return age - 1;
        }
        return age;
    }

    // 「＋親族」ボタンをクリックしたときのイベント
    $(document).on('click', '#add-relative', function (event) {
        $('#circular-menu').hide();
        const $menu = $('#sub-menu-relative');
        const menuSize = $menu.outerWidth();
        const left = clickedCharOffset.left + $('#' + clickedCharTileId).outerWidth() / 2 - menuSize / 2;
        const top = clickedCharOffset.top + $('#' + clickedCharTileId).outerHeight() / 2 - menuSize / 2;
        $menu.css({ left: left, top: top }).show();
        disableScroll(); // 画面スクロールを無効化
        event.stopPropagation();
    });

    // 「＋配偶者」ボタンをクリックしたときのイベント
    $(document).on('click', '#add-spouse', function (event) {
        $(".add-spouse").data('clickedTileId', clickedCharTileId).dialog("open");
        event.stopPropagation(); // イベントの伝播を止める
    });

    // 配偶者追加時のダイアログ
    $(".add-spouse").dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "はい": function () {
                const tileId = $(this).data('clickedTileId'); // 保存されたタイルIDを取得

                // クリックされたキャラクターの右隣のタイルIDを計算
                const rightNextTileId = 'tile-' + (parseInt(tileId.split('-')[1]) + 1);
                console.log("rightNextTileId:", rightNextTileId);
                // 配偶者ラインのHTMLを作成
                const $spouseLine = $('<div class="spouse-line" id="spouse-line"></div>');
                // 隣のタイルに配偶者ラインを追加
                $('#' + rightNextTileId).append($spouseLine);

                // クリックされたキャラクターの２つ右隣のタイルIDを計算
                const rightRightNextTileId = 'tile-' + (parseInt(tileId.split('-')[1]) + 2);
                console.log("rightRightNextTileId:", rightRightNextTileId);
                // キャラクターアイコンのHTMLを作成
                const $charIcon = $('<div class="char-icon char02"></div>');
                const $label = $('<span class="label">hoge</span>');
                // タイルの既存の内容をクリアし、キャラクターアイコンとラベルを追加
                $('#' + rightRightNextTileId).empty().append($charIcon).append($label);

                $(this).dialog("close");
            },
            "いいえ": function () {
                $(this).dialog("close");
                console.log('配偶者を追加しません');
            }
        }
    });

    // 元配偶者追加時のダイアログ
    $(".add-ex-spouse").dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "はい": function () {
                const tileId = $(this).data('clickedTileId'); // 保存されたタイルIDを取得

                // クリックされたキャラクターの左隣のタイルIDを計算
                const leftNextTileId = getTileLeft(tileId);
                console.log("leftNextTileId:", leftNextTileId);
                // 元配偶者ラインのHTMLを作成
                const $exSpouseLine = $('<div class="ex-spouse-line" id="ex-spouse-line"></div>');
                // 左隣のタイルに元配偶者ラインを追加
                $('#' + leftNextTileId).append($exSpouseLine);

                // 元配偶者ラインの左隣のタイルにキャラクターアイコンを追加
                const leftLeftTileId = getTileLeft(leftNextTileId);
                addCharacter(leftLeftTileId, 'char04', 'foo');
                console.log(leftLeftTileId + 'に元配偶者を追加しました');

                $(this).dialog("close");
            },
            "いいえ": function () {
                $(this).dialog("close");
                console.log('元配偶者を追加しません');
            }
        }
    });

    // 配偶者ラインをクリックした時のイベント
    $(document).on('click', '.spouse-line', function (event) {
        const $spouseLine = $(this); // クリックされた.spouse-lineを保存
        showAddChildDialog(function () {
            const $tile = $spouseLine.closest('.tile'); // クリックされた.spouse-lineがあるタイル
            const tileId = $tile.attr('id');

            // 配偶者ラインを削除
            $spouseLine.remove();

            // 配偶者子ラインのHTMLを作成し、追加
            const spouseChildLineHtml = '<div class="spouse-child-line" id="spouse-child-line"></div>';
            $tile.append(spouseChildLineHtml);
            console.log(tileId + 'に配偶者子ラインを追加しました');

            // 配偶者子ラインの真下のタイルを特定し、親子ライン１を追加
            const tileBelowId = getTileBelow(tileId);
            const $tileBelow = $('#' + tileBelowId);

            // 親子ライン１のHTMLを作成し、追加
            const parentChildLineHtml = '<div class="parent-child-line01" id="parent-child-line01"></div>';
            $tileBelow.append(parentChildLineHtml);
            console.log(tileBelowId + ' に親子ライン１を追加しました。');

            // 親子ライン１の下のタイルに子のキャラアイコンを追加
            const charBelowBelowId = getTileBelow(tileBelowId); // 親子ライン１の真下のタイルを特定
            addCharacter(charBelowBelowId, 'char03', 'piyo');
            console.log(charBelowBelowId + 'に子を追加しました');
        });
        event.stopPropagation(); // イベントの伝播を止める
    });

    // 元配偶者ラインをクリックした時のイベント
    $(document).on('click', '.ex-spouse-line', function (event) {
        const $exSpouseLine = $(this); // クリックされた.ex-spouse-lineを保存
        showAddChildDialog(function () {
            const $tile = $exSpouseLine.closest('.tile'); // クリックされた.ex-spouse-lineがあるタイル
            const tileId = $tile.attr('id');

            // 元配偶者ラインを削除
            $exSpouseLine.remove();

            // 元配偶者子ラインのHTMLを作成し、追加
            const exSpouseChildLineHtml = '<div class="ex-spouse-child-line" id="ex-spouse-child-line"></div>';
            $tile.append(exSpouseChildLineHtml);
            console.log(tileId + 'に元配偶者子ラインを追加しました');

            // 元配偶者子ラインの真下のタイルを特定し、親子ライン１を追加
            const tileBelowId = getTileBelow(tileId);
            const $tileBelow = $('#' + tileBelowId);

            // 親子ライン１のHTMLを作成し、追加
            const parentChildLineHtml = '<div class="parent-child-line01" id="parent-child-line01"></div>';
            $tileBelow.append(parentChildLineHtml);
            console.log(tileBelowId + ' に親子ライン１を追加しました。');

            // 親子ライン１の下のタイルに子のキャラアイコンを追加
            const charBelowBelowId = getTileBelow(tileBelowId); // 親子ライン１の真下のタイルを特定
            addCharacter(charBelowBelowId, 'char03', 'fizz');
            console.log(charBelowBelowId + 'に子を追加しました');
        });
        event.stopPropagation(); // イベントの伝播を止める
    });

    // 「＋元配偶者」ボタンをクリックしたときのイベント
    $(document).on('click', '#add-ex-spouse', function (event) {
        $(".add-ex-spouse").data('clickedTileId', clickedCharTileId).dialog("open");
        event.stopPropagation(); // イベントの伝播を止める
    });

    // 親子ライン1をクリックした時のイベント
    $(document).on('click', '.parent-child-line01', function (event) {
        const $parentChildLine = $(this); // クリックされた.parent-child-line01を保存
        const tileId = $parentChildLine.closest('.tile').attr('id');
        const tileAboveId = getTileAbove(tileId);
        const $tileAbove = $('#' + tileAboveId);

        if ($tileAbove.find('.spouse-child-line').length > 0) {
            // 上のタイルに「配偶者子ライン」がある場合の処理
            showAddChildDialog(function () {
                handleParentChildLineClick($parentChildLine, 'char04', 'piyo');
            });
        } else if ($tileAbove.find('.ex-spouse-child-line').length > 0) {
            // 上のタイルに「元配偶者子ライン」がある場合の処理
            showAddChildDialog(function () {
                handleExParentChildLineClick($parentChildLine, 'char04', 'fuga');
            });
        }

        event.stopPropagation(); // イベントの伝播を止める
    });


    // 親子ライン３をクリックした時のイベント
    $(document).on('click', '.parent-child-line03', function (event) {
        const $parentChildLine = $(this); // クリックされた.parent-child-line03を保存
        showAddChildDialog(function () {
            handleParentChildLine03Click($parentChildLine, 'char04', 'fuga');
        });
        event.stopPropagation(); // イベントの伝播を止める
    });

    // 親子ライン6をクリックした時のイベント
    $(document).on('click', '.parent-child-line06', function (event) {
        const $parentChildLine = $(this); // クリックされた.parent-child-line06を保存
        showAddChildDialog(function () {
            handleParentChildLine06Click($parentChildLine, 'char04', 'hoge');
        });
        event.stopPropagation(); // イベントの伝播を止める
    });


    // 画面のどこかをクリックしたらメニューを非表示にする
    $(document).on('click', function () {
        $('#circular-menu').hide();
        $('#sub-menu-relative').hide();
        $('#status-dialog').hide();
        enableScroll(); // スクロールを再度有効化
    });

    // キャラクター削除関数
    function deleteCharacter() {
        // 削除確認のアラートを表示（開発用）
        const confirmDelete = confirm(clickedCharTileId + 'のキャラクターを本当に削除してよろしいですか？');

        if (confirmDelete) {
            // キャラクターの削除
            $('#' + clickedCharTileId).empty();

            // 関連するラインの削除
            const tileNumber = parseInt(clickedCharTileId.split('-')[1]);
            console.log("tileNumber: ", tileNumber);
            const rightNextTileId = 'tile-' + (tileNumber + 1);
            console.log("rightNextTileId: ", rightNextTileId);
            const leftNextTileId = 'tile-' + (tileNumber - 1);
            console.log("leftNextTileId: ", leftNextTileId);

            // 削除するキャラの右のタイルに配偶者ラインがある場合
            if ($('#' + rightNextTileId).find('.spouse-line').length > 0) {
                $('#' + rightNextTileId).find('.spouse-line').remove();
            }

            // 削除するキャラの左のタイルに配偶者ラインがある場合
            if ($('#' + leftNextTileId).find('.spouse-line').length > 0) {
                $('#' + leftNextTileId).find('.spouse-line').remove();
            }

            // 他の関連するラインも必要に応じて削除
        }
    }

    // 「削除」ボタンをクリックしたときのイベント
    $(document).on('click', '#char-delete', function (event) {
        deleteCharacter();
        event.stopPropagation();
    });
});

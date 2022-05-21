var pages = $('.pages').children(); //.pagesの子要素
var grabs = false; // Gonna work on this, one day

pages.each(function(i) { //iは0からスタート、繰り返し処理
    var page = $(this);
    if (i % 2 === 0) {
    page.css('z-index', (pages.length - i)); 
    }
});

// ページめくり
$(window).on('load',function() { //ページを読み込んだら

//14～24さえあれば動く
 $('.page').click(function() { //ページをクリック
    var page = $(this);
    var page_num = pages.index(page) + 1;
    if (page_num % 2 === 0) { //クリックされたページ数が偶数(左)の場合
    page.removeClass('flipped'); //クリックされたページからflippedクラスを削除
    page.prev().removeClass('flipped'); //クリックされた前のページからflippedクラスを削除
    } else { //クリックされたページ数が奇数(右)の場合
    page.addClass('flipped'); //クリックされたページにflippedクラスを付与
    page.next().addClass('flipped'); //クリックされた次のページにflippedクラスを付与
    }

    if (page_num == 3 || page_num == 6) {
        document.getElementById("link5").style.display ="block";
        document.getElementById("g-link5").style.display ="block";
    } else {
        document.getElementById("link5").style.display ="none";
        document.getElementById("g-link5").style.display ="none";
    }
    if (page_num == 5 || page_num == 8) {
        document.getElementById("link6").style.display ="block";
        document.getElementById("link7").style.display ="block";
        document.getElementById("g-link6").style.display ="block";
        document.getElementById("g-link7").style.display ="block";
    } else {
        document.getElementById("link6").style.display ="none";
        document.getElementById("link7").style.display ="none";
        document.getElementById("g-link6").style.display ="none";
        document.getElementById("g-link7").style.display ="none";
    }
    if (page_num == 7 || page_num == 10) {
        document.getElementById("link8").style.display ="block";
        document.getElementById("link9").style.display ="block";
        document.getElementById("g-link8").style.display ="block";
        document.getElementById("g-link9").style.display ="block";
    } else {
        document.getElementById("link8").style.display ="none";
        document.getElementById("link9").style.display ="none";
        document.getElementById("g-link8").style.display ="none";
        document.getElementById("g-link9").style.display ="none";
    }


    });
    $('.page').click(function(e) {
        //return false;
    });
    $('.linkdiv').click(function(e) {
        if (e.target.id == 'link5') {
            window.location.href = document.getElementById('anchor5').href;
        } else if (e.target.id == 'link6') {
            window.location.href = document.getElementById('anchor6').href;
        } else if (e.target.id == 'link7') {
            window.location.href = document.getElementById('anchor7').href;
        }else if (e.target.id == 'link8') {
            window.location.href = document.getElementById('anchor8').href;
        }else if (e.target.id == 'link9') {
            window.location.href = document.getElementById('anchor9').href;
        }
        return true;
    });
    $('.github').click(function(e) {
        if (e.target.id == 'link5') {
            window.location.href = document.getElementById('github5').href;
        } else if (e.target.id == 'g-link6') {
            window.location.href = document.getElementById('github6').href;
        } else if (e.target.id == 'g-link7') {
            window.location.href = document.getElementById('github7').href;
        }else if (e.target.id == 'g-link8') {
            window.location.href = document.getElementById('github8').href;
        }else if (e.target.id == 'g-link9') {
            window.location.href = document.getElementById('github9').href;
        }
        return true;
    });

    $('link').click(function(e) {
        e.stopImmediatePropagation();
        alert('test');
    });

//なくても動く30～87
    if (grabs) {
    $('.page').on('mousedown', function(e) { //マウスを押したとき、eはクリックした要素・キーの情報取得
    var page = $(this); //thisはイベント発生元の要素を取得
    var page_num = pages.index(page) + 1; //クリックされたページを取得+1
    var page_w = page.outerWidth(); //ブラウザ(ページ?)全体の幅
    var page_l = page.offset().left; //画面上の位置座標、左から
    var grabbed = ''; //
    var mouseX = e.pageX; //クリックされた場所の横方向
    if (page_num % 2 === 0) { //偶数(左)ページ
    grabbed = 'verso'; //左ページ
    var other_page = page.prev(); 
    var centerX = (page_l + page_w); //画面の左から本の中心線まで
    } else {
    grabbed = 'recto'; //右ページ
    var other_page = page.next();
    var centerX = page_l;
    }

    var leaf = page.add(other_page);
    var from_spine = mouseX - centerX; //クリックされた位置 - ページ左から中央までの距離(左ならマイナス、右ならプラス)
    if (grabbed === 'recto') { //右ページをクリック
    var deg = (90 * -(1 - (from_spine/page_w))); 
    page.css('transform', 'rotateY(' + deg + 'deg)');
    } else { //左ページをクリック
    var deg = (90 * (1 + (from_spine/page_w)));
    page.css('transform', 'rotateY(' + deg + 'deg)');
    }
    leaf.addClass('grabbing');
    $(window).on('mousemove', function(e) { //カーソルが動いたら
    mouseX = e.pageX; 
    if (grabbed === 'recto') { //右ページをクリック
    centerX = page_l;
    from_spine = mouseX - centerX;
    var deg = (90 * -(1 - (from_spine/page_w)));
    page.css('transform', 'rotateY(' + deg + 'deg)');
    other_page.css('transform', 'rotateY(' + (180 + deg) + 'deg)');
    } else { //左ページをクリック
    centerX = (page_l + page_w);
    from_spine = mouseX - centerX;
    var deg = (90 * (1 + (from_spine/page_w)));
    page.css('transform', 'rotateY(' + deg + 'deg)');
    other_page.css('transform', 'rotateY(' + (deg - 180) + 'deg)');
    }

    console.log(deg, (180 + deg) );
    });

    $(window).on('mouseup', function(e) {
    leaf
    .removeClass('grabbing')
    .css('transform', '');

    $(window).off('mousemove');
    });
    });
    }
    
    $('.book').addClass('bound');
    });
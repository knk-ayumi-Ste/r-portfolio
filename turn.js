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
 });

 if (grabs) {
 $('.page').on('mousedown', function(e) { //マウスを押したとき、eはクリックした要素・キーの情報取得
//なくても動く29～43
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
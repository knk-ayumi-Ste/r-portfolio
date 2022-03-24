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
 var page = $(this); //thisはイベント発生元の要素を取得
 var page_num = pages.index(page) + 1; //クリックされたページを取得+1
 var page_w = page.outerWidth(); //ブラウザ全体の幅
 var page_l = page.offset().left; //画面上の位置座標、左から
 var grabbed = ''; //
 var mouseX = e.pageX; //クリックされた場所の水平位置
 if (page_num % 2 === 0) {
 grabbed = 'verso';
 var other_page = page.prev();
 var centerX = (page_l + page_w);
 } else {
 grabbed = 'recto';
 var other_page = page.next();
 var centerX = page_l;
 }

 var leaf = page.add(other_page);

 var from_spine = mouseX - centerX;

 if (grabbed === 'recto') {
 var deg = (90 * -(1 - (from_spine/page_w)));
 page.css('transform', 'rotateY(' + deg + 'deg)');

 } else {
 var deg = (90 * (1 + (from_spine/page_w)));
 page.css('transform', 'rotateY(' + deg + 'deg)');
 }

 leaf.addClass('grabbing');

 $(window).on('mousemove', function(e) {
 mouseX = e.pageX;
 if (grabbed === 'recto') {
 centerX = page_l;
 from_spine = mouseX - centerX;
 var deg = (90 * -(1 - (from_spine/page_w)));
 page.css('transform', 'rotateY(' + deg + 'deg)');
 other_page.css('transform', 'rotateY(' + (180 + deg) + 'deg)');
 } else {
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
 
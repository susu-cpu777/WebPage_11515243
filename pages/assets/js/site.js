/**
 * 時光雜貨店 (The Time Apothecary) - 全站共用互動腳本 (site.js)
 * 負責手機版選單開關、無障礙鍵盤支援與頁面互動
 */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryNav = document.querySelector('#primary-nav');

    if (!menuToggle || !primaryNav) return;

    // 切換選單開啟/關閉狀態
    function toggleMenu(forceClose = false) {
      const isCurrentlyOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      const shouldOpen = forceClose ? false : !isCurrentlyOpen;

      menuToggle.setAttribute('aria-expanded', String(shouldOpen));
      primaryNav.classList.toggle('is-open', shouldOpen);
    }

    // 點擊漢堡按鈕
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });

    // 點擊導覽連結後自動關閉選單
    primaryNav.addEventListener('click', function(e) {
      if (e.target.closest('a')) {
        toggleMenu(true);
      }
    });

    // 點擊選單外部自動關閉
    document.addEventListener('click', function(e) {
      if (primaryNav.classList.contains('is-open') &&
          !primaryNav.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        toggleMenu(true);
      }
    });

    // 鍵盤無障礙支援：按 Escape 鍵收合選單
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        toggleMenu(true);
        menuToggle.focus();
      }
    });

    // 當螢幕寬度放大超過 768px 時自動重設選單狀態
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && primaryNav.classList.contains('is-open')) {
        toggleMenu(true);
      }
    });
  });
})();

let main_nav = document.querySelector('.main-nav');
let main_nav_toggle_open = document.querySelector('.main-nav__toggle-open');
let main_nav_wrapper = document.querySelector('.main-nav__wrapper');
let main_nav_toggle_close = document.querySelector('.main-nav__toggle-close');

main_nav.classList.remove('main-nav--nojs');

main_nav_toggle_open.addEventListener('click', function()
{
  main_nav_wrapper.classList.toggle('main-nav__wrapper--closed');
})

main_nav_toggle_close.addEventListener('click', function()
{
  main_nav_wrapper.classList.toggle('main-nav__wrapper--closed');
})

function setHeight(fieldClass) {
  let text_area = document.querySelector(fieldClass);

  text_area.style.height = '';
  text_area.style.height = text_area.scrollHeight + 8 + 'px';
}

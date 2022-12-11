document.querySelector('.main-nav__toggle-open').addEventListener('click', function()
{
  document.querySelector('.main-nav__wrapper').classList.toggle('main-nav__wrapper--closed');
})

document.querySelector('.main-nav__toggle-close').addEventListener('click', function()
{
  document.querySelector('.main-nav__wrapper').classList.toggle('main-nav__wrapper--closed');
})

function setHeight(fieldClass) {
  document.querySelector(fieldClass).style.height = '';
  document.querySelector(fieldClass).style.height = document.querySelector(fieldClass).scrollHeight + 8 + 'px';
}

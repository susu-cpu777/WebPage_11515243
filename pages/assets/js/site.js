(function(){
  const button = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-nav');
  if (!button || !navigation) return;
  button.addEventListener('click', function(){
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('is-open', !expanded);
  });
  navigation.addEventListener('click', function(event){
    if (event.target.closest('a')) {
      button.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    }
  });
  document.addEventListener('keydown', function(event){
    if (event.key === 'Escape') {
      button.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
      button.focus();
    }
  });
  window.addEventListener('resize', function(){
    if (window.innerWidth > 760) {
      button.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    }
  });
})();

export const addHeaderLogic = () => {
  addEventListener("DOMContentLoaded", (event) => {
    const toggle = document.querySelector('#menu-toggle');
    const navigationWrapper = document.querySelector('.navigation__wrapper');
    
    toggle?.addEventListener('click', () => {
      navigationWrapper?.classList.toggle('navigation__wrapper_open');
    })
  
    navigationWrapper?.addEventListener('click', (event) => {
      const targetClasses = Array.from(event.target?.classList ?? []);
  
      if (['navigation__link', 'button__icon', 'button__text', 'nav-menu-buttons__button'].some((item) => targetClasses.includes(item))) {
        navigationWrapper?.classList.toggle('navigation__wrapper_open');
      }
    })
  });
}

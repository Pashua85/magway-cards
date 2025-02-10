const toggleOpenClasses = ({navigationWrapper, background}) => {
  navigationWrapper?.classList.toggle('navigation__wrapper_open');
  background?.classList.toggle('navigation__wrapper-background_open');
  document.body.classList.toggle('body_stop-scrolling');
}


export const addHeaderLogic = () => {
  addEventListener("DOMContentLoaded", (event) => {
    const toggle = document.querySelector('#menu-toggle');
    const navigationWrapper = document.querySelector('.navigation__wrapper');
    const background = document.querySelector('.navigation__wrapper-background');
    
    toggle?.addEventListener('click', () => {
      toggleOpenClasses({ navigationWrapper, background})

      if ( Array.from(navigationWrapper.classList).includes('navigation__wrapper_open')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    })

    background?.addEventListener('click', () => {
      toggleOpenClasses({ navigationWrapper, background})
    });
  
    navigationWrapper?.addEventListener('click', (event) => {
      const targetClasses = Array.from(event.target?.classList ?? []);
  
      if (['navigation__link', 'button__icon', 'button__text', 'nav-menu-buttons__button'].some((item) => targetClasses.includes(item))) {
        toggleOpenClasses({ navigationWrapper, background})
      }
    })
  });
}

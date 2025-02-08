import '../styles/styles'
import { addHeaderLogic } from './addHeaderLogic'
import { CardsService } from './cardsService';

addHeaderLogic();

const cardService = new CardsService({ 
  loadButtonSelector: '#load-button', 
  spinnerContainerSpinner: '.spinner__container',
  cardsContainerSelector: '.cards-section__cards-container',
  preloadedCardsAmount: 10,
});

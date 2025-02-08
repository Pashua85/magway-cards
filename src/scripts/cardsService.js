import { BASE_HOST } from "./constants";
import { getRandomNumber } from '../helpers/getRandomNumber';

export class CardsService {
  loadedCardLength = 0;

  loadButton = null;
  
  cardsContainer = null;

  spinnerContainer = null;

  usersMap = {};

  maxCardsAmount = 30;

  constructor({
    loadButtonSelector, 
    spinnerContainerSpinner, 
    maxCardsAmount,
    cardsContainerSelector, preloadedCardsAmount
  }) {
    this.loadButton = document.querySelector(loadButtonSelector);
    this.spinnerContainer = document.querySelector(spinnerContainerSpinner); 
    this.cardsContainer = document.querySelector(cardsContainerSelector); 

    if (preloadedCardsAmount) {
      this.loadedCardLength += preloadedCardsAmount;
    }

    if (maxCardsAmount) {
      this.maxCardsAmount = maxCardsAmount;
    }

    this.addLoadListener();
  }

  addLoadListener() {
    this.loadButton?.addEventListener('click', () => {
      this.loadCards();
    });
  }

  openSpinner() {
    this.spinnerContainer?.classList.add('spinner__container_open')
  }

  closeSpinner() {
    this.spinnerContainer?.classList.remove('spinner__container_open')
  } 

  async loadCards(limit = 5) {
    if (this.loadedCardLength >= this.maxCardsAmount) {
      return;
    }

    try {
      this.openSpinner();
      const posts = await this.fetchPosts(limit);
      const postsWithUsernames = await this.addUsersToPosts(posts);
      const fragment = document.createDocumentFragment();

      postsWithUsernames.forEach((post) => {
        const card = this.createCardElement(post);
        fragment.appendChild(card);
      })

      this.closeSpinner();

      this.cardsContainer.appendChild(fragment);

      this.loadedCardLength += postsWithUsernames.length;

      if (this.loadedCardLength >= this.maxCardsAmount) {
        this.disabledButton();
      }
  
    } catch(err) {
      console.error('Ошибка получения данных', err);
    }
  }

  fetchPosts(limit = 5) {
    return fetch(`${BASE_HOST}/posts?_start=${this.loadedCardLength}&_limit=${limit}`)
      .then((response) => response.json())
  }

  disabledButton () {
    this.loadButton.disabled = true;
  }

  async addUsersToPosts(posts) {
    const userIds = [...new Set((posts ?? []).map((item) => item.userId))] ;
    const usersToFetch = userIds.filter((id) => !this.usersMap[id]);

    if (usersToFetch.length) {
      const users = await Promise.all(usersToFetch.map((userId) => {
        return fetch(`${BASE_HOST}/users/${userId}`)
          .then((response) => response.json())
      }))
      users.forEach((item) => {
        this.usersMap[item.id] = item.username;
      })
    }

    return posts.map((postItem) => ({
      ...postItem,
      username: this.usersMap[postItem.userId] ?? '',
    }))
  }

  /**
   * @param {Object} post 
   * @param {string} post.body 
   * @param {number} post.id 
   * @param {string} post.title
   * @param {number} post.userId
   * @param {string} post.username
   */
  createCardElement(post) {
    const card = document.createElement('article');
    card.classList.add('card');

    const image = document.createElement('img');
    image.classList.add('card__image');
    /** Картинка для карточек устанавливается рандомно из тех, что есть на макете  */
    image.src = `./src/assets/coin-${getRandomNumber(1,10)}.jpg`;
    image.alt = 'coin';
    card.appendChild(image);
    
    const cardContent = document.createElement('div');
    cardContent.classList.add('card__content');
    card.appendChild(cardContent);

    const header = document.createElement('h3');
    header.classList.add('card__header');
    header.textContent = post.title;
    cardContent.appendChild(header);

    const subtitle = document.createElement('p');
    subtitle.classList.add('card__subtitle');
    subtitle.textContent = 'Added cards from /posts';
    cardContent.appendChild(subtitle);

    const text = document.createElement('p');
    text.classList.add('card__text');
    text.textContent = post.body;
    cardContent.appendChild(text);

    const info = document.createElement('p');
    info.classList.add('card__publish-info');
    const span1 = document.createElement('span');
    span1.textContent = 'Posted by ';
    info.appendChild(span1);
    const span2 = document.createElement('span');
    span2.classList.add('card__publish-info_bold');
    span2.textContent =post.username;
    info.appendChild(span2);
    const span3 = document.createElement('span');
    span3.textContent = ', on July  24, 2019';
    cardContent.appendChild(info);

    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.classList.add('card__button');
    anchor.textContent = 'Continue reading';
    cardContent.appendChild(anchor);

    return card;
  }
}

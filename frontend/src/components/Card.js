export class Card {
  // constructor(data) // {name, link, likes, userId}
  constructor ({data, templateSelector, handleCardClick, userId, handleConfirmDeletion, likeCard}) {
    this._data = data;
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmDeletion = handleConfirmDeletion;
    this._likeCard = likeCard;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  getId() {
    return this._id;
  }

  handleLike(likes) {
    this._likes = likes
    this._numberLikes.textContent = this._likes.length
  }

  handleDeleteLike() {
    this._numberLikes.textContent = this._likes.length
    this._likeButton.classList.remove('element__button_active')
  }

  handleDeleteCard(){
    this._element.remove()
  }

  hasUserLike() {
    return this._likes.some((like) => {return like._id === this._userId})
  }

  switchColorLike() {
    if (this.hasUserLike()) {
      this._likeButton.classList.add('element__button_active')
    } else {
      this._likeButton.classList.remove('element__button_active')
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard(this._id)
    });
    this._deleteButton.addEventListener('click', () =>  {
      this._handleConfirmDeletion(this)});
    this._elementLink.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)})
  }
  
  generateCard() {
    this._element = this._getTemplate();
    
    this._elementLink = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._likeButton = this._element.querySelector('.element__button');
    this._numberLikes = this._element.querySelector('.element__number-likes')
    this._deleteButton = this._element.querySelector('.element__delete-button');

    this._elementTitle.textContent = this._name;
    this._elementLink.src = this._link;
    this._elementLink.alt = this._name;  

    
    if(this._likes.some((like) => {
       return like._id === this._userId
      })) {
      this._likeButton.classList.add('element__button_active')
    }

    this._numberLikes.textContent = this._likes.length

    if(this._ownerId == this._userId) {
      this._deleteButton.style.display = 'block';
    }

    this._setEventListeners();

    return this._element;
  }
}
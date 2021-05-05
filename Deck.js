const _DECK_MAX_SELECTED = 3;
const _DECK_LINES = 4;
const _DECK_COLUMNS = 6;
let _DECK_CARD_MARGIN = _CARD_HEIGHT/10;
const _DECK_START_RATE = 0.015;

function Deck(s,x,y,a,b) {

  this.size = s;
  this.position = createVector(x,y);
  this.arts = a;
  this.backOfCards = b;
  this.cards = []
  this.isRevealed = false;
  this.pickedCards = [];

  this._isStarting = true;
  this._startingProgress = 0;
  this._offSet = _DECK_LINES*(_CARD_WIDTH+_DECK_CARD_MARGIN);

  this.show = function() {
    if (this._isStarting) {
      this._startingProgress += _DECK_START_RATE;
      if (this._startingProgress > 1) {
        this._startingProgress = 1;
        this._isStarting = false;
      }
      this.position.x = this._offSet*easeOutCubic(this._startingProgress);
    } 
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].show();    
    }
  }

  this.isReadyToReveal = function() {
    let selectedCards = 0;
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].isSelected) {
        selectedCards++;
      }
    }
    return (selectedCards == _DECK_MAX_SELECTED);
  }

  this.reveal = function() {
    let j = 0;
    this.isRevealed = true;
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].isSelected) {
        this.cards[i] = new Card(this.cards[i].position.x,this.cards[i].position.y,this.pickedCards[j],this.backOfCards,this);
        this.cards[i].select();
        this.cards[i].flip();
        j++;
      }
    }
  }

  this.start = function() {
    this.position.x = -this._offSet;
    this._startingProgress  = 0;
    this._isStarting = true;   
    this.cards = [];
    this.pickedCards = [];
    this.isRevealed = false;
    let c = 0;
    for (let i = 0; i < _DECK_LINES; i++) {
      for (let j = 0; j < _DECK_COLUMNS; j++) {
        if (c < this.size) {
          c++;
          this.cards.push(new Card(this.position.x + j*_CARD_WIDTH+(j+1)*_DECK_CARD_MARGIN,this.position.y + i*_CARD_HEIGHT+(i+1)*_DECK_CARD_MARGIN,this.arts[floor(random(this.arts.length))],this.backOfCards, this));
        }
      }
    }
  }

}

function easeOutCubic(x) {
  return 1 - pow(1 - x, 3);
}
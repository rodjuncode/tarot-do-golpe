let _CARD_WIDTH = 140;
let _CARD_HEIGHT = 210;
let _CARD_CORNER = 10;
let _CARD_BORDER_SIZE = 8;

// let _CARD_WIDTH = 140;
// let _CARD_HEIGHT = 210;
// let _CARD_CORNER = 10;
// let _CARD_BORDER_SIZE = 8;
// let _CARD_WIDTH = 100;
// let _CARD_HEIGHT = 150;
// let _CARD_CORNER = 6;
// let _CARD_BORDER_SIZE = 5;
const _CARD_SHADOW_SPREAD = 5;
const _CARD_SELECTED_BORDER = 3;
const _CARD_SELECTED_COLOR = '#2176ff';
const _CARD_FLIP_RATE = 0.15;
let _CARD_SELECTED_OFFSET = _CARD_WIDTH/10;

function Card(x,y,a,b,d) {

  this.position = createVector(x,y);
  this.size = createVector(_CARD_WIDTH,_CARD_HEIGHT);
  this.isFacingUp = false;
  this.art = a;
  this.isSelected = false;
  this.back = back;
  this.deck = d;
  
  this._flipMotion = 1;
  this._isFlipping = false;
  this._isShrinkingDuringFlip = true;
  
  // mask
  // let _m = createGraphics(_CARD_WIDTH,_CARD_HEIGHT);
  // _m.fill(0);
  // _m.rect(0, 0, this.size.x, this.size.y, _CARD_CORNER, _CARD_CORNER, _CARD_CORNER, _CARD_CORNER);
  // let _mask = createImage(_CARD_WIDTH,_CARD_HEIGHT);
  // _mask.copy(_m, 0, 0, _m.width, _m.height, 0, 0, _m.width, _m.height)
  // this._mask = _mask;
  // this.art.mask(_mask); // apply mask
  
  this.show = function() {
    if (this._isFlipping) {
      if (this._isShrinkingDuringFlip) {
        this._flipMotion -= _CARD_FLIP_RATE;
        if (this._flipMotion < 0) {
          this._flipMotion = 0;
          this._isShrinkingDuringFlip = false;
          this.isFacingUp = !this.isFacingUp;
        }
      } else {
        this._flipMotion += _CARD_FLIP_RATE;
        if (this._flipMotion > 1) {
          this._flipMotion = 1;
          this._isFlipping = false;
        }
      }
    }
    push();
    noStroke();
    translate(this.deck.position.x + this.position.x+this.size.x/2,this.deck.position.y + this.position.y-(this.isSelected?_CARD_SELECTED_OFFSET:0));
    // shadow
    fill(0,0,0,5*this._flipMotion);
    rect(-_CARD_SHADOW_SPREAD-this.size.x/2*this._flipMotion, -_CARD_SHADOW_SPREAD, 
      (this.size.x + 2*_CARD_SHADOW_SPREAD)*this._flipMotion, this.size.y + 2*_CARD_SHADOW_SPREAD, 
      _CARD_CORNER, _CARD_CORNER, _CARD_CORNER, _CARD_CORNER);
    fill(0,0,0,10*this._flipMotion);
    rect(-_CARD_SHADOW_SPREAD/2-this.size.x/2*this._flipMotion, -_CARD_SHADOW_SPREAD/2, 
      (this.size.x + _CARD_SHADOW_SPREAD)*this._flipMotion, this.size.y + _CARD_SHADOW_SPREAD, 
      _CARD_CORNER, _CARD_CORNER, _CARD_CORNER, _CARD_CORNER);
    // card
    tint(255,255*this._flipMotion);   
    if (this.isFacingUp) {
      fill(255);
      rect((-this.size.x/2)*this._flipMotion, 0, this.size.x*this._flipMotion, this.size.y, _CARD_CORNER, _CARD_CORNER, _CARD_CORNER, _CARD_CORNER);
      image(this.art,(-(this.size.x-2*_CARD_BORDER_SIZE)/2)*this._flipMotion,_CARD_BORDER_SIZE,(this.size.x-2*_CARD_BORDER_SIZE)*this._flipMotion,this.size.y-2*_CARD_BORDER_SIZE);
    } else {
      fill(255);
      rect((-this.size.x/2)*this._flipMotion, 0, this.size.x*this._flipMotion, this.size.y, _CARD_CORNER, _CARD_CORNER, _CARD_CORNER, _CARD_CORNER);
      fill('#277713');
      rect((-this.size.x/2)*this._flipMotion+_CARD_BORDER_SIZE*this._flipMotion,_CARD_BORDER_SIZE,(this.size.x-2*_CARD_BORDER_SIZE)*this._flipMotion,this.size.y-2*_CARD_BORDER_SIZE)
      fill('#DEC328');
      ellipse(0,this.size.y/2,(this.size.y/3)*this._flipMotion,this.size.y/3);
      //image(this.back,(-this.size.x/2)*this._flipMotion+10*this._flipMotion,10,(this.size.x-20)*this._flipMotion,this.size.y-20);
    }
    pop();
  }

  this.flip = function() {
    if (!this._isFlipping) {
      this._isFlipping = true;
      this._flipMotion = 1;
      this._flipMotion = 1;
      this._isShrinkingDuringFlip = true;
    }
  }

  this.clicked = function(x,y) {
    if (x > this.deck.position.x + this.position.x &&
        x < this.deck.position.x + this.position.x + this.size.x &&
        y > this.deck.position.y + this.position.y &&
        y < this.deck.position.y + this.position.y + this.size.y) {
          return true;
    }
    return false;
  }

  this.select = function() {
    this.isSelected = !this.isSelected;
  }

}
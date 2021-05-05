const _PANEL_BACKGROUND = '#DEC328';
const _PANEL_SIZE_PROPORTION = .5;
const _PANEL_SIZE_FIXED_INSTRUCTION = 425;
const _PANEL_SIZE_FIXED_RESULT = 500;
const _PANEL_START_RATE = 0.02;
const _PANEL_CARDS_VERT_OFFSET = 80;
//const _PANEL_CARD_FULL_SIZE = 1.2;
const _PANEL_CARD_FULL_SIZE = 1.6;
const _PANEL_TITLE_INSTRUCTIONS = 'jogo de cartas marcadas';
const _PANEL_TITLE_TIPS = 'crie suas próprias interações';
const _PANEL_INSTRUCTIONS = 'Isso é tarô aliado com ciência da computação, uma chance de ressignificar a lembrança apoteótica nacional com distanciamento histórico e, ao mesmo tempo, modificar e refletir a respeito das próprias indagações, pelo menos enquanto isso não for crime de responsabilidade.\n\nTente perguntas curtas e objetivas.\nNão faça perguntas entre "isso" ou "aquilo".\nPergunte uma coisa de cada vez, você pode perguntar quantas vezes quiser.\n\nDepois de selecionar 3 cartas e mentalizar sua pergunta, clique em "Revelar".';
const _PANEL_TIPS = 'Experimente fazer a mesma pergunta duas vezes seguidas, mas de formas diferentes.\nExperimente perguntar "o que devo me atentar durante essa semana?"\nExperimente pedir um conselho diário durante 22 dias.\nOuse se desafiar a interpretar a combinação apenas olhando as cartas, você pode tentar relacionar os elementos da forma que quiser: São as cores que te chamam atenção? Para que lado as personagens estão olhando? As personagens de uma carta gostam das de outra carta? De que outras formas você vai analisar?\nSe desejar use a pergunta sugerida pelo artista, "o que eu preciso saber para governar minha própria vida"?\n\nSinta-se livre para criar suas próprias interações!';
const _PANEL_BEGIN = 'clique aqui para continuar';
const _PANEL_RESTART = 'clique para recomeçar';
const _PANEL_TYPE_INSTRUCTIONS = 0;
const _PANEL_TYPE_TIPS = 2;
const _PANEL_TYPE_RESULTS = 1;

function Panel(t) {

  this.type = t;
  this.pickedCards = [];
  this.text = "";
  if (this.type == _PANEL_TYPE_INSTRUCTIONS || this.type == _PANEL_TYPE_TIPS) {
    this.size = _PANEL_SIZE_FIXED_INSTRUCTION;
  } else {
    this.size = _PANEL_SIZE_FIXED_RESULT;
  }
  this.position = createVector(0,((height-this.size)/2)-40);

  this._isStarting = false;
  this._startingProgress = 0;
  this._offSet = (height-this.size)/2 + this.size;
  this._visible = false;

  this.hide = function() {
    this._visible = false;
  }

  this.show = function() {
    if (this._visible) {
      push();
      noStroke();
      fill(0,0,0,120);
      rect(0,0,width,height);
      let _o = 0;
      if (this._isStarting) {
        this._startingProgress += _PANEL_START_RATE;
        if (this._startingProgress > 1) {
          this._startingProgress = 1;
          this._isStarting = false;
        }
        _o = this._offSet*(1-easeOutCubic(this._startingProgress));
      }
      translate(0,this.position.y-_o);
      fill(_PANEL_BACKGROUND);
      rect(0,0,width,this.size);
      if (this.type == _PANEL_TYPE_INSTRUCTIONS) {        
        fill(255);
        textStyle(BOLD);
        textSize(36);      
        rect(_CARD_WIDTH,23,textWidth(_PANEL_TITLE_INSTRUCTIONS)*1.05,45);
        fill('#3215c1');      
        text(_PANEL_TITLE_INSTRUCTIONS,_CARD_WIDTH+9,58)
        textStyle(NORMAL);
        textSize(18);
        text(_PANEL_INSTRUCTIONS,_CARD_WIDTH,98,800);
        textLeading(22*1.1);
        fill(255);
        textSize(38)        
        rect(_CARD_WIDTH,this.size + 30,textWidth(_PANEL_BEGIN)*1.05,48);
        fill("#277713");
        text(_PANEL_BEGIN,_CARD_WIDTH+10,this.size + 30 + 36)
      } else if (this.type == _PANEL_TYPE_TIPS) {        
        fill(255);
        textStyle(BOLD);
        textSize(32);      
        rect(_CARD_WIDTH,23,textWidth(_PANEL_TITLE_TIPS)*1.05,45);
        fill('#3215c1');      
        text(_PANEL_TITLE_TIPS,_CARD_WIDTH+9,58)
        textStyle(NORMAL);
        textSize(18);
        text(_PANEL_TIPS,_CARD_WIDTH,98,800);
        textLeading(22*1.1);
        fill(255);
        textSize(38)        
        rect(_CARD_WIDTH,this.size + 20,textWidth(_PANEL_BEGIN)*1.05,48);
        fill("#277713");
        text(_PANEL_BEGIN,_CARD_WIDTH+10,this.size + 20 + 36)
      } else if (this.type == _PANEL_TYPE_RESULTS) { 
        let c1 = new Card(0,_PANEL_CARDS_VERT_OFFSET,this.pickedCards[0],undefined,new function() { this.position = createVector(10,0); });
        c1.size.x = c1.size.x*_PANEL_CARD_FULL_SIZE;
        c1.size.y = c1.size.y*_PANEL_CARD_FULL_SIZE;
        c1.isFacingUp = true;
        let c2 = new Card(c1.size.x,_PANEL_CARDS_VERT_OFFSET,this.pickedCards[1],undefined,new function() { this.position = createVector(10,0); });
        c2.size.x = c2.size.x*_PANEL_CARD_FULL_SIZE;
        c2.size.y = c2.size.y*_PANEL_CARD_FULL_SIZE;
        c2.isFacingUp = true;
        let c3 = new Card(c1.size.x+c2.size.x,-20 + _PANEL_CARDS_VERT_OFFSET,this.pickedCards[2],undefined,new function() { this.position = createVector(10,0); });
        c3.size.x = c3.size.x*_PANEL_CARD_FULL_SIZE;
        c3.size.y = c3.size.y*_PANEL_CARD_FULL_SIZE;
        c3.isFacingUp = true;

        // for (let i = 0; i < this.pickedCards.length; i++) {
        //   let c = new Card(0,0,this.pickedCards[i],undefined,this);
        //   image(this.pickedCards[i],0,0);
        // }
        push()
        rotate(radians(-6));
        c1.show();
        pop();
        push();
        rotate(radians(-2));
        c2.show();
        pop();
        push();
        rotate(radians(2));
        c3.show();
        pop();
        textSize(12);
        fill('#3215c1');  
        if (!this._isStarting) {
          text(this.text,_CARD_WIDTH+_CARD_WIDTH*4.2,70,width/1.8);        
        }
        textLeading(22*1.1);
        fill(255);
        textSize(38)        
        rect(_CARD_WIDTH,this.size + 20,textWidth(_PANEL_RESTART)*1.05,48);
        fill("#277713");
        text(_PANEL_RESTART,_CARD_WIDTH+10,this.size + 20+36)
      }
      pop();      
    }
  }

  this.start = function() {
    this._visible = true;
    this._startingProgress = 0;
    this._isStarting = true;
  }

  this.setResult = function(r) {
    for (let i = 0; i < r.cards.length; i++) {
      this.pickedCards.push(arts[r.cards[i]-1]);
    }    
    this.text = r.text;

  }

  this.clearResult = function() {
    this.pickedCards = [];
    this.text = '';
  }

  this.checkClick = function(x,y) {
    push();
    textSize(40);
    if (x > width*.1 && x < width*0.1 + textWidth(_PANEL_BEGIN)*1.05 &&
        y > this.position.y + this.size + 30 && y < this.position.y + this.size + 30 + 48) {
          return true;
        }
    pop();
    return false;
  }


}


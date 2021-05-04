const _PANEL_BACKGROUND = '#DEC328';
const _PANEL_SIZE_PROPORTION = .5;
const _PANEL_SIZE_FIXED_INSTRUCTION = 425;
const _PANEL_SIZE_FIXED_RESULT = 600;
const _PANEL_START_RATE = 0.02;
const _PANEL_CARDS_VERT_OFFSET = 0;
const _PANEL_CARD_FULL_SIZE = 1.2;
const _PANEL_TITLE = 'instruções';
const _PANEL_INSTRUCTIONS = 'Para os céticos, cientistas políticos ou entusiastas do esoterismo, uma coisa é certa, isso é tarô aliado com ciência da computação, uma chance de ressignificar a lembrança apoteótica nacional com distanciamento histórico enquanto modifica e reflete sobre o próprio futuro, pelo menos enquanto isso não for crime de responsabilidade.\nRecomendamos perguntas curtas e objetivas, não faça perguntas entre “isso” ou “aquilo”. Se desejar use a pergunta sugerida pelo artista, “o que eu preciso saber para governar minha vida?”.\n\nPrimeiro se concentre e clique no botão aleatorizar.\nMentalize uma pergunta simples.\nEscolha três cartas que estão te chamando dando um clique sobre elas.\nReceba um jogo de cartas marcadas do Tarô Impeachment!';
const _PANEL_BEGIN = 'clique aqui para começar';
const _PANEL_RESTART = 'clique aqui para recomeçar';
const _PANEL_TYPE_INSTRUCTIONS = 0;
const _PANEL_TYPE_RESULTS = 1;

function Panel(t) {

  this.type = t;
  this.pickedCards = [];
  this.text = "";
  if (this.type == _PANEL_TYPE_INSTRUCTIONS) {
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
        textSize(30);      
        rect(width*.1,23,textWidth(_PANEL_TITLE)*1.1,45);
        fill('#3215c1');      
        text(_PANEL_TITLE,width*.1+9,58)
        textStyle(NORMAL);
        textSize(18);
        text(_PANEL_INSTRUCTIONS,width*.1,98,800);
        textLeading(22*1.1);
        fill(255);
        textSize(38)        
        rect(width*.1,this.size + 30,textWidth(_PANEL_BEGIN)*1.05,48);
        fill("#277713");
        text(_PANEL_BEGIN,width*.1+10,this.size + 30+36)
      } else if (this.type == _PANEL_TYPE_RESULTS) { 
        let c1 = new Card(0,_PANEL_CARDS_VERT_OFFSET,this.pickedCards[0],undefined,this);
        c1.size.x = c1.size.x * _PANEL_CARD_FULL_SIZE;
        c1.size.y = c1.size.y * _PANEL_CARD_FULL_SIZE;
        c1.isFacingUp = true;
        let c2 = new Card(c1.size.x,_PANEL_CARDS_VERT_OFFSET,this.pickedCards[1],undefined,this);
        c2.size.x = c2.size.x * _PANEL_CARD_FULL_SIZE;
        c2.size.y = c2.size.y * _PANEL_CARD_FULL_SIZE;
        c2.isFacingUp = true;
        let c3 = new Card(c1.size.x+c2.size.x,-20 + _PANEL_CARDS_VERT_OFFSET,this.pickedCards[2],undefined,this);
        c3.size.x = c3.size.x * _PANEL_CARD_FULL_SIZE;
        c3.size.y = c3.size.y * _PANEL_CARD_FULL_SIZE;
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
        textLeading(15);
        if (!this._isStarting) {
          text(this.text,width*0.1 + 350,50,450);        
        }
        textLeading(22*1.1);
        fill(255);
        textSize(38)        
        rect(width*.1,this.size + 30,textWidth(_PANEL_RESTART)*1.05,48);
        fill("#277713");
        text(_PANEL_RESTART,width*.1+10,this.size + 30+36)
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
      this.pickedCards.push(arts[r.cards[i]]);
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


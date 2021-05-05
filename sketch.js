const _TAROT_CARDS_FOLDER = 'cards/';
const _TAROT_CARDS_EXT = '.jpg';
const _TAROT_CARDS_QTY = 24;
const _TAROT_STATE_INSTRUCTION = 0;
const _TAROT_STATE_PICK = 1;
const _TAROT_STATE_RESULT = 2;
let _VERT_UNIT;
let _VERT_SPACING;
let _TAROT_PANEL_POSITION;
// const _TAROT_PANEL_POSITION_X = 695;
// const _TAROT_PANEL_POSITION_Y = 740;
// const _TAROT_PANEL_POSITION_X = 430;
// const _TAROT_PANEL_POSITION_Y = 400;
let _TAROT_PANEL_POSITION_X;
let _TAROT_PANEL_POSITION_Y;
let _TAROT_BTN_WIDTH;
let _TAROT_BTN_HEIGHT;

let arts = [];
let state = _TAROT_STATE_INSTRUCTION;
let back;
let deck;
let instructions;
let tips;
let results;
// let possibleResults = [
//   { 
//     cards: [6,11,17],
//     text: "Essa combinação traz consigo afetos de sucesso e fracasso, vitória e derrota, sensações que a princípio parecem antagonistas e contraditórias, mas que se complementam de forma muito natural. É interessante começar observando o “5 de espadas”, que carrega um ex-presidente brasileiro, Fernando Collor. Na composição ele sorri de forma singela, é como se um sentimento de vitória, triunfo ou vingança pudesse ter finalmente feito jus a algo que ele sofreu no passado. Ao fundo podemos ver sua foto oficial dos tempos de outrora, quando ainda presidente também foi protagonista de um processo de impeachment, similar mas diferente do que aparece em terceiro plano, em que Bolsonaro, que agora é presidente, discursa contra Dilma, personagem implícita na composição.\nA carta da “morte” sugere uma transformação dolorosa, o início de uma ruptura que traz mudanças, e que de certa forma também carrega uma sensação contraditória no contexto da carta, já que a figura principal parece arrasada com o decorrer da votação de impeachment, enquanto outros podem festejar as mudanças em curso, mesmo assim tudo indica que nada é definitivo, que as coisas podem se mover e que as forças podem se transformar.\n “A cena que conclui é o “ás de ouros” com um trabalhador recém contratado segurando sua carteira de trabalho, símbolo do naipe. Ao fundo um lembrete de que é com a sua força de trabalho e de ação concreta no mundo que se constróem as coisas, em uma sociedade onde o resultado é mais eficiente que as palavras uma estrela brilhante é erguida por três guindastes em frente a sede de uma empresa de petróleo.\nA combinação alerta sobre as formas que estão sendo usadas para resolver problemas ou para lidar com situações, será que é preciso se atentar para não repetir velhos erros e encarar mudanças ou desafios que estão sendo evitados? Da mesma forma que três espadas se fincam em três estrelas vermelhas, três guindastes levantam uma estrela ainda maior, sugerindo que é necessário não se vangloriar da derrota do inimigo, da mesma forma que a espada o fere ela pode se voltar contra quem o feriu. Se achar superior ou menosprezar a situação é um erro que deve ser evitado para que se perceba que até aquilo que nos afasta nos norteia, nem que para direção oposta. É importante entender a sua parte na engrenagem da situação e exercitar o pensamento a longo prazo como uma mudança positiva."
//   },
//   { 
//     cards: [14,1,3],
//     text: "Essa combinação traz consigo afetos de sucesso e fracasso, vitória e derrota, sensações que a princípio parecem antagonistas e contraditórias, mas que se complementam de forma muito natural. É interessante começar observando o “5 de espadas”, que carrega um ex-presidente brasileiro, Fernando Collor. Na composição ele sorri de forma singela, é como se um sentimento de vitória, triunfo ou vingança pudesse ter finalmente feito jus a algo que ele sofreu no passado. Ao fundo podemos ver sua foto oficial dos tempos de outrora, quando ainda presidente também foi protagonista de um processo de impeachment, similar mas diferente do que aparece em terceiro plano, em que Bolsonaro, que agora é presidente, discursa contra Dilma, personagem implícita na composição.\nA carta da “morte” sugere uma transformação dolorosa, o início de uma ruptura que traz mudanças, e que de certa forma também carrega uma sensação contraditória no contexto da carta, já que a figura principal parece arrasada com o decorrer da votação de impeachment, enquanto outros podem festejar as mudanças em curso, mesmo assim tudo indica que nada é definitivo, que as coisas podem se mover e que as forças podem se transformar.\n “A cena que conclui é o “ás de ouros” com um trabalhador recém contratado segurando sua carteira de trabalho, símbolo do naipe. Ao fundo um lembrete de que é com a sua força de trabalho e de ação concreta no mundo que se constróem as coisas, em uma sociedade onde o resultado é mais eficiente que as palavras uma estrela brilhante é erguida por três guindastes em frente a sede de uma empresa de petróleo.\nA combinação alerta sobre as formas que estão sendo usadas para resolver problemas ou para lidar com situações, será que é preciso se atentar para não repetir velhos erros e encarar mudanças ou desafios que estão sendo evitados? Da mesma forma que três espadas se fincam em três estrelas vermelhas, três guindastes levantam uma estrela ainda maior, sugerindo que é necessário não se vangloriar da derrota do inimigo, da mesma forma que a espada o fere ela pode se voltar contra quem o feriu. Se achar superior ou menosprezar a situação é um erro que deve ser evitado para que se perceba que até aquilo que nos afasta nos norteia, nem que para direção oposta. É importante entender a sua parte na engrenagem da situação e exercitar o pensamento a longo prazo como uma mudança positiva."
//   },
//   { 
//     cards: [22,5,8],
//     text: "Essa combinação traz consigo afetos de sucesso e fracasso, vitória e derrota, sensações que a princípio parecem antagonistas e contraditórias, mas que se complementam de forma muito natural. É interessante começar observando o “5 de espadas”, que carrega um ex-presidente brasileiro, Fernando Collor. Na composição ele sorri de forma singela, é como se um sentimento de vitória, triunfo ou vingança pudesse ter finalmente feito jus a algo que ele sofreu no passado. Ao fundo podemos ver sua foto oficial dos tempos de outrora, quando ainda presidente também foi protagonista de um processo de impeachment, similar mas diferente do que aparece em terceiro plano, em que Bolsonaro, que agora é presidente, discursa contra Dilma, personagem implícita na composição.\nA carta da “morte” sugere uma transformação dolorosa, o início de uma ruptura que traz mudanças, e que de certa forma também carrega uma sensação contraditória no contexto da carta, já que a figura principal parece arrasada com o decorrer da votação de impeachment, enquanto outros podem festejar as mudanças em curso, mesmo assim tudo indica que nada é definitivo, que as coisas podem se mover e que as forças podem se transformar.\n “A cena que conclui é o “ás de ouros” com um trabalhador recém contratado segurando sua carteira de trabalho, símbolo do naipe. Ao fundo um lembrete de que é com a sua força de trabalho e de ação concreta no mundo que se constróem as coisas, em uma sociedade onde o resultado é mais eficiente que as palavras uma estrela brilhante é erguida por três guindastes em frente a sede de uma empresa de petróleo.\nA combinação alerta sobre as formas que estão sendo usadas para resolver problemas ou para lidar com situações, será que é preciso se atentar para não repetir velhos erros e encarar mudanças ou desafios que estão sendo evitados? Da mesma forma que três espadas se fincam em três estrelas vermelhas, três guindastes levantam uma estrela ainda maior, sugerindo que é necessário não se vangloriar da derrota do inimigo, da mesma forma que a espada o fere ela pode se voltar contra quem o feriu. Se achar superior ou menosprezar a situação é um erro que deve ser evitado para que se perceba que até aquilo que nos afasta nos norteia, nem que para direção oposta. É importante entender a sua parte na engrenagem da situação e exercitar o pensamento a longo prazo como uma mudança positiva."
//   },
//   { 
//     cards: [15,10,9],
//     text: "Essa combinação traz consigo afetos de sucesso e fracasso, vitória e derrota, sensações que a princípio parecem antagonistas e contraditórias, mas que se complementam de forma muito natural. É interessante começar observando o “5 de espadas”, que carrega um ex-presidente brasileiro, Fernando Collor. Na composição ele sorri de forma singela, é como se um sentimento de vitória, triunfo ou vingança pudesse ter finalmente feito jus a algo que ele sofreu no passado. Ao fundo podemos ver sua foto oficial dos tempos de outrora, quando ainda presidente também foi protagonista de um processo de impeachment, similar mas diferente do que aparece em terceiro plano, em que Bolsonaro, que agora é presidente, discursa contra Dilma, personagem implícita na composição.\nA carta da “morte” sugere uma transformação dolorosa, o início de uma ruptura que traz mudanças, e que de certa forma também carrega uma sensação contraditória no contexto da carta, já que a figura principal parece arrasada com o decorrer da votação de impeachment, enquanto outros podem festejar as mudanças em curso, mesmo assim tudo indica que nada é definitivo, que as coisas podem se mover e que as forças podem se transformar.\n “A cena que conclui é o “ás de ouros” com um trabalhador recém contratado segurando sua carteira de trabalho, símbolo do naipe. Ao fundo um lembrete de que é com a sua força de trabalho e de ação concreta no mundo que se constróem as coisas, em uma sociedade onde o resultado é mais eficiente que as palavras uma estrela brilhante é erguida por três guindastes em frente a sede de uma empresa de petróleo.\nA combinação alerta sobre as formas que estão sendo usadas para resolver problemas ou para lidar com situações, será que é preciso se atentar para não repetir velhos erros e encarar mudanças ou desafios que estão sendo evitados? Da mesma forma que três espadas se fincam em três estrelas vermelhas, três guindastes levantam uma estrela ainda maior, sugerindo que é necessário não se vangloriar da derrota do inimigo, da mesma forma que a espada o fere ela pode se voltar contra quem o feriu. Se achar superior ou menosprezar a situação é um erro que deve ser evitado para que se perceba que até aquilo que nos afasta nos norteia, nem que para direção oposta. É importante entender a sua parte na engrenagem da situação e exercitar o pensamento a longo prazo como uma mudança positiva."
//   }  
// ];
let pickedResult;
let possibleResultsJSON;

function preload() {
  for (let i = 1; i <= _TAROT_CARDS_QTY; i++) {
    arts.push(loadImage(_TAROT_CARDS_FOLDER + i + _TAROT_CARDS_EXT));
  }
  possibleResultsJSON = loadJSON('resultados.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  _CARD_HEIGHT = height/5;
  _CARD_WIDTH = _CARD_HEIGHT*0.6666;
  _CARD_CORNER = _CARD_WIDTH/12;
  _CARD_BORDER_SIZE = _CARD_WIDTH/15;
  _DECK_CARD_MARGIN = _CARD_HEIGHT/10;  
  _TAROT_PANEL_POSITION_X = _CARD_WIDTH*4 + _DECK_CARD_MARGIN*5;
  _TAROT_PANEL_POSITION_Y = _CARD_HEIGHT*3 + _DECK_CARD_MARGIN*2.2;
  _TAROT_BTN_WIDTH = _CARD_WIDTH*2 + _DECK_CARD_MARGIN;
  _TAROT_BTN_HEIGHT = _CARD_HEIGHT/3.8;
  _VERT_UNIT = _CARD_HEIGHT/11;
  _VERT_SPACING = _VERT_UNIT/2;
  _CARD_SELECTED_OFFSET = _CARD_WIDTH/10;
  
  deck = new Deck(22,0,0,arts,back);
  deck.start();
  instructions = new Panel(_PANEL_TYPE_INSTRUCTIONS);
  tips = new Panel(_PANEL_TYPE_TIPS);
  instructions.start();
  results = new Panel(_PANEL_TYPE_RESULTS);
  _TAROT_PANEL_POSITION = createVector(_TAROT_PANEL_POSITION_X,_TAROT_PANEL_POSITION_Y);
  // disable browser right click
  document.addEventListener('contextmenu', event => event.preventDefault());

}

function draw() {
  background('#02AAFF');

  deck.show();
  instructions.show();
  results.show();
  tips.show();

  showControlPanel();
  
}

function mousePressed() {
  if (state == _TAROT_STATE_PICK) {
    if (!deck.isRevealed) {
      if (mouseButton === LEFT) {
        for (let i = 0; i < deck.cards.length; i++) {
          if (deck.cards[i].clicked(mouseX,mouseY)) {
            if ((deck.cards[i].isSelected) ||
              (!deck.cards[i].isSelected && !deck.isReadyToReveal())) {
                deck.cards[i].select();
              }            
          }
        }
        // outros comandos
        if (deck.isReadyToReveal()) {
          if (mouseX > _TAROT_PANEL_POSITION.x && mouseX < _TAROT_PANEL_POSITION.x + _TAROT_BTN_WIDTH
            && mouseY > _TAROT_PANEL_POSITION.y + _VERT_UNIT*2 && mouseY < _TAROT_PANEL_POSITION.y + _VERT_UNIT*2 + _TAROT_BTN_HEIGHT) {
              //pickedResult = possibleResults[floor(random(possibleResults.length))];
              pickedResult = possibleResultsJSON.resultados[floor(random(possibleResultsJSON.resultados.length))];
              for (let i = 0; i < pickedResult.cards.length; i++) {
                deck.pickedCards.push(arts[pickedResult.cards[i]-1]);
              }
              deck.reveal();
          }        
        }
        if (mouseX > _TAROT_PANEL_POSITION.x && mouseX < _TAROT_PANEL_POSITION.x + _TAROT_BTN_WIDTH
          && mouseY > _TAROT_PANEL_POSITION.y + _VERT_UNIT*6 && mouseY < _TAROT_PANEL_POSITION.y + _VERT_UNIT*6 + _TAROT_BTN_HEIGHT) {
            deck.start();
        }
        if (mouseX > _TAROT_PANEL_POSITION.x && mouseX < _TAROT_PANEL_POSITION.x + _TAROT_BTN_WIDTH*.48
          && mouseY > _TAROT_PANEL_POSITION.y + _VERT_UNIT*10 && mouseY < _TAROT_PANEL_POSITION.y + _VERT_UNIT*10 + _TAROT_BTN_HEIGHT) {
            instructions.start();
            state = _TAROT_STATE_INSTRUCTION;
        }        
        if (mouseX > _TAROT_PANEL_POSITION.x + _TAROT_BTN_WIDTH*.48 + _TAROT_BTN_WIDTH*.04 && mouseX < _TAROT_PANEL_POSITION.x + _TAROT_BTN_WIDTH*.48 + _TAROT_BTN_WIDTH*.04 + _TAROT_BTN_WIDTH*.48
          && mouseY > _TAROT_PANEL_POSITION.y + _VERT_UNIT*10 && mouseY < _TAROT_PANEL_POSITION.y + _VERT_UNIT*10 + _TAROT_BTN_HEIGHT) {
            tips.start();
            state = _TAROT_STATE_INSTRUCTION;
        }        

      }
    } else {
      if (mouseX > _TAROT_PANEL_POSITION.x && mouseX < _TAROT_PANEL_POSITION.x + _TAROT_BTN_WIDTH
        && mouseY > _TAROT_PANEL_POSITION.y + _VERT_UNIT*2 && mouseY < _TAROT_PANEL_POSITION.y + _VERT_UNIT*2 + _TAROT_BTN_HEIGHT) {
          // pickedResult = possibleResultsJSON.resultados[floor(random(possibleResultsJSON.resultados.length))];
          // for (let i = 0; i < pickedResult.cards.length; i++) {
          //   deck.pickedCards.push(arts[pickedResult.cards[i]]);
          // }
          results.setResult(pickedResult);
          state = _TAROT_STATE_RESULT;
          results.start();
      }
      if (mouseX > _TAROT_PANEL_POSITION.x && mouseX < _TAROT_PANEL_POSITION.x + _TAROT_BTN_WIDTH
        && mouseY > _TAROT_PANEL_POSITION.y + _VERT_UNIT*6 && mouseY < _TAROT_PANEL_POSITION.y + _VERT_UNIT*6 + _TAROT_BTN_HEIGHT) {
          deck.start();
      }
      if (mouseX > _TAROT_PANEL_POSITION.x && mouseX < _TAROT_PANEL_POSITION.x + _TAROT_BTN_WIDTH*.48
        && mouseY > _TAROT_PANEL_POSITION.y + _VERT_UNIT*10 && mouseY < _TAROT_PANEL_POSITION.y + _VERT_UNIT*10 + _TAROT_BTN_HEIGHT) {
          instructions.start();
          state = _TAROT_STATE_INSTRUCTION;
      }        
      if (mouseX > _TAROT_PANEL_POSITION.x + _TAROT_BTN_WIDTH*.48 + _TAROT_BTN_WIDTH*.04 && mouseX < _TAROT_PANEL_POSITION.x + _TAROT_BTN_WIDTH*.48 + _TAROT_BTN_WIDTH*.04 + _TAROT_BTN_WIDTH*.48
        && mouseY > _TAROT_PANEL_POSITION.y + _VERT_UNIT*10 && mouseY < _TAROT_PANEL_POSITION.y + _VERT_UNIT*10 + _TAROT_BTN_HEIGHT) {
          tips.start();
          state = _TAROT_STATE_INSTRUCTION;
      }                    
    }
  } else if (state == _TAROT_STATE_INSTRUCTION) {
    if (instructions.checkClick(mouseX,mouseY)) {
      instructions.hide();
      tips.hide();
      state = _TAROT_STATE_PICK;
    }
  }
  else if (state == _TAROT_STATE_RESULT) {
    results.clearResult();
    results.hide();
    deck.start();
    state = _TAROT_STATE_PICK;
  }  
}

function showControlPanel() {
  if (state == _TAROT_STATE_PICK) {
    let _ENABLE_BUTTON_COLOR = "#4923F4";
    let _DISABLED_BUTTON_COLOR = "#CCC";
    let _TEXT_COLOR = "#FFFFFF";
    push();
    translate(_TAROT_PANEL_POSITION.x,_TAROT_PANEL_POSITION.y);
    noStroke();
    textSize(_VERT_UNIT*2);
    textAlign(CENTER);
    if (deck.isReadyToReveal()) {
      if (deck.isRevealed) {
        fill("#dec328");
      } else {
        fill(_ENABLE_BUTTON_COLOR);
      }      
    } else {
      fill(_DISABLED_BUTTON_COLOR);
    }    
    rect(0,_VERT_UNIT*2,_TAROT_BTN_WIDTH,_TAROT_BTN_HEIGHT);
    if (deck.isRevealed) {
      fill(_ENABLE_BUTTON_COLOR);
    } else {
      fill(255);
    }
    let actionButtonTxt = "revelar";   
    if (deck.isRevealed) {
      actionButtonTxt = "ver resultado";
    }
    text(actionButtonTxt,0,_VERT_UNIT*2+_VERT_SPACING,_TAROT_BTN_WIDTH);
    fill(_ENABLE_BUTTON_COLOR);
    rect(0,_VERT_UNIT*6,_TAROT_BTN_WIDTH,_TAROT_BTN_HEIGHT);
    fill(255);
    text("aleatorizar",0,_VERT_UNIT*6+_VERT_SPACING,_TAROT_BTN_WIDTH);
    fill(_ENABLE_BUTTON_COLOR);
    textSize(_VERT_UNIT*1.5);
    rect(0,_VERT_UNIT*10,_TAROT_BTN_WIDTH*.48,_TAROT_BTN_HEIGHT);    
    rect(_TAROT_BTN_WIDTH*.48+_TAROT_BTN_WIDTH*.04,_VERT_UNIT*10,_TAROT_BTN_WIDTH*.48,_TAROT_BTN_HEIGHT);    
    fill(255);
    text("info",0,_VERT_UNIT*10+_VERT_SPACING*1.5,_TAROT_BTN_WIDTH*.48);
    text("dicas",_TAROT_BTN_WIDTH*.48+_TAROT_BTN_WIDTH*.04,_VERT_UNIT*10+_VERT_SPACING*1.5,_TAROT_BTN_WIDTH*.48);
    pop();
  }
}

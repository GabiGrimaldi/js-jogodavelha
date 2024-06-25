let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  let currentPlayer = 'X'; // Começa com o jogador X
  
  function setup() {
    createCanvas(300, 300);
    strokeWeight(4);
    textSize(64);
    textAlign(CENTER, CENTER);
  }
  
  function draw() {
    background(255);
    
    // Desenha o tabuleiro
    drawBoard();
    
    // Exibe o status atual (vez do jogador ou resultado final)
    let result = checkWinner();
    if (result !== null) {
      noLoop(); // Para o loop de desenho
      let resultP = createP('');
      resultP.style('font-size', '32pt');
      if (result === 'empate') {
        resultP.html('Empate!');
      } else {
        resultP.html(`Vitória do jogador ${result}!`);
      }
    } else {
      let turnP = createP(`Vez do jogador ${currentPlayer}`);
      turnP.style('font-size', '24pt');
    }
  }
  
  function drawBoard() {
    let w = width / 3;
    let h = height / 3;
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let x = i * w;
        let y = j * h;
        let cell = board[i][j];
        fill(255);
        rect(x, y, w, h);
        if (cell === 'X') {
          drawX(x, y, w, h);
        } else if (cell === 'O') {
          drawO(x, y, w, h);
        }
      }
    }
  }
  
  function drawX(x, y, w, h) {
    line(x + 10, y + 10, x + w - 10, y + h - 10);
    line(x + w - 10, y + 10, x + 10, y + h - 10);
  }
  
  function drawO(x, y, w, h) {
    ellipse(x + w / 2, y + h / 2, w - 20, h - 20);
  }
  
  function mouseClicked() {
    if (currentPlayer === 'X') {
      playTurn('X', mouseX, mouseY);
    } else {
      playTurn('O', mouseX, mouseY);
    }
  }
  
  function playTurn(player, x, y) {
    let i = floor(x / (width / 3));
    let j = floor(y / (height / 3));
    
    // Verifica se a célula está vazia
    if (board[i][j] === '') {
      board[i][j] = player;
      // Troca o jogador atual
      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
  }
  
  function checkWinner() {
    // Verifica todas as linhas
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0];
      }
    }
    
    // Verifica todas as colunas
    for (let j = 0; j < 3; j++) {
      if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
        return board[0][j];
      }
    }
    
    // Verifica diagonais
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }
    
    // Verifica empate
    let emptyCells = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          emptyCells++;
        }
      }
    }
    if (emptyCells === 0) {
      return 'empate';
    }
    
    return null;
  }
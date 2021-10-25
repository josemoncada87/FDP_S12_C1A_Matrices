class Trofeo {
  constructor(x, y, fila, columna, puntos = 50) {
    this.x = x;
    this.y = y;
    this.fila = fila;
    this.columna = columna;
    this.puntos = puntos;
  }

  show() {
    fill(255, 255, 0);
    circle(this.x, this.y, 40);
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getPuntos() {
    return this.puntos;
  }

  move(mat) {
    let dir = parseInt(random(4));
    switch (dir) {
      case 0: // izquierda
        if (this.columna - 1 >= 0 && mat[this.fila][this.columna - 1] === 0) {
          this.x -= 100;
          this.columna--;
        }
        break;
      case 1:
        if (this.columna + 1 < mat.length && mat[this.fila][this.columna + 1] === 0) {
          this.x += 100;
          this.columna++;
        }
        break;
      case 2:
        if (this.fila - 1 >= 0 && mat[this.fila - 1][this.columna] === 0) {
          this.y -= 100;
          this.fila--;
        }
        break;
      case 3:
        if (this.fila + 1 < mat.length && mat[this.fila + 1][this.columna] === 0) {
          this.y += 100;
          this.fila++;
        }
        break;
    }
  }

}
let collectables = [];
let puntos = 0;
let colPj = 1;
let filPj = 1;
let xPj = 150;
let yPj = 150;

let mat = [
  [0, 0, 0, 0, 0], // 0
  [0, 0, 1, 0, 0], // 1
  [1, 0, 1, 0, 1], // 2
  [1, 0, 0, 0, 1], // 3
  [1, 1, 0, 1, 1], // 4
];

function setup() {
  createCanvas(500, 500);
  console.log(mat);
  collectables.push(new Trofeo(350, 350, 3, 3));
  collectables.push(new Trofeo(50, 50, 0, 0));
  collectables.push(new Trofeo(450, 50, 0, 4, 200));
}

function draw() {
  background(220);
  mostrarTerreno();
  mostrarPersonaje();
  mostrarCollectables(mat);

}

function mostrarCollectables(mat) {
  for (let index = 0; index < collectables.length; index++) {
    const colectable = collectables[index];
    colectable.show();
    if (frameCount % 60 == 0) {
      colectable.move(mat);
    }
  }
}

function mostrarPersonaje() {
  noStroke();
  fill(255, 0, 0);
  circle(xPj, yPj, 60);
  stroke(0);
}

function seleccionarColor(fila, columna) {
  switch (mat[fila][columna]) {
    case 0:
      // libre
      fill(255);
      break;
    case 1:
      // obstaculo
      fill(0);
      break;
    case 2:
      // protegido
      fill(255, 255, 0);
      break;
    default:
      break;
  }
}

function mostrarTerreno() {
  for (let fila = 0; fila < mat.length; fila++) {
    for (let columna = 0; columna < mat[fila].length; columna++) {
      seleccionarColor(fila, columna);
      rect(columna * 100, fila * 100, 100, 100);
    }
  }
}

function keyPressed() {

  switch (key) {
    case 'a': // izquierda
      if (colPj - 1 >= 0 && mat[filPj][colPj - 1] === 0) {
        xPj -= 100;
        colPj--;
      }
      break;
    case 'd':
      if (colPj + 1 < mat.length && mat[filPj][colPj + 1] === 0) {
        xPj += 100;
        colPj++;
      }
      break;
    case 'w':
      if (filPj - 1 >= 0 && mat[filPj - 1][colPj] === 0) {
        yPj -= 100;
        filPj--;
      }
      break;
    case 's':
      if (filPj + 1 < mat.length && mat[filPj + 1][colPj] === 0) {
        yPj += 100;
        filPj++;
      }
      break;
  }

  verificarInteraccion();
}

function verificarInteraccion() {
  for (let index = 0; index < collectables.length; index++) {
    const colectable = collectables[index];
    if (dist(xPj, yPj, colectable.getX(), colectable.getY()) < 50) {
      puntos += colectable.getPuntos();
      collectables.splice(index, 1);
      console.log(puntos);
      break;
    }
  }
}
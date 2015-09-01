'use strict';

import React from 'react';

var styles = {
  base: {
    border: 'none',
    width: '500px',
    height: '500'
  }
}

class Face {
  constructor(name) {
    this.rows = []
    let temp = [];
    temp.push(name);
    temp.push(name);
    temp.push(name);

    this.rows.push(temp);
    this.rows.push(temp);
    this.rows.push(temp);

    // this.rows.map(row => console.log(row));
  }

  getRow(num) {
    let row = []
    row.push(this.rows[num][0]);
    row.push(this.rows[num][1]);
    row.push(this.rows[num][2]);

    return row;
  }

  getCol(num) {
    let col = []
    col.push(this.rows[0][num]);
    col.push(this.rows[1][num]);
    col.push(this.rows[2][num]);

    return col;
  }

  setRow(num, data) {
    let newR0 = this.getRow(0);
    let newR1 = this.getRow(1);
    let newR2 = this.getRow(2);

    this.rows = [];
    this.rows.push((num === 0) ? data : newR0);
    this.rows.push((num === 1) ? data : newR1);
    this.rows.push((num === 2) ? data : newR2);

    // this.rows.map(row => console.log(row));
  }

  setCol(num, data) {
    let newR0 = this.getRow(0);
    let newR1 = this.getRow(1);
    let newR2 = this.getRow(2);

    newR0[num] = data[0];
    newR1[num] = data[1];
    newR2[num] = data[2];

    this.rows = [];
    this.rows.push(newR0);
    this.rows.push(newR1);
    this.rows.push(newR2);
  }

  rotateCW() {
    let newR0 = [];
    let newR1 = [];
    let newR2 = [];

    newR0.push(this.getCol(0)[2]);
    newR0.push(this.getCol(0)[1]);
    newR0.push(this.getCol(0)[0]);

    newR1.push(this.getCol(1)[2]);
    newR1.push(this.getCol(1)[1]);
    newR1.push(this.getCol(1)[0]);

    newR2.push(this.getCol(2)[2]);
    newR2.push(this.getCol(2)[1]);
    newR2.push(this.getCol(2)[0]);

    this.rows = [];
    this.rows.push(newR0);
    this.rows.push(newR1);
    this.rows.push(newR2);
  }
}

class Cube {
  constructor() {
    this.resetCube();
  }

  resetCube() {
    var color = [];
    color.push('b'); // B
    color.push('o'); // L
    color.push('w'); // U
    color.push('r'); // R
    color.push('g'); // F
    color.push('y'); // D

    this.faces = [];
    this.faces.push(new Face(color[0]));
    this.faces.push(new Face(color[1]));
    this.faces.push(new Face(color[2]));
    this.faces.push(new Face(color[3]));
    this.faces.push(new Face(color[4]));
    this.faces.push(new Face(color[5]));
  }

  turnR() {
    let temp = [];
    temp.push(this.faces[0].getCol(2));
    temp.push(this.faces[2].getCol(2));
    temp.push(this.faces[4].getCol(2));
    temp.push(this.faces[5].getCol(2));

    this.faces[5].setCol(2, temp[0]);
    this.faces[0].setCol(2, temp[1]);
    this.faces[2].setCol(2, temp[2]);
    this.faces[4].setCol(2, temp[3]);

    this.faces[3].rotateCW();
  }

  turnU() {
    let temp = [];
    temp.push(this.faces[0].getRow(2));
    temp.push(this.faces[3].getCol(0));
    temp.push(this.faces[4].getRow(0));
    temp.push(this.faces[1].getCol(2));

    this.faces[3].setCol(0, temp[0]);
    this.faces[4].setRow(0, temp[1].reverse());
    this.faces[1].setCol(2, temp[2]);
    this.faces[0].setRow(2, temp[3].reverse());

    this.faces[2].rotateCW();
  }

  turnF() {
    let temp = [];
    temp.push(this.faces[1].getRow(2));
    temp.push(this.faces[2].getRow(2));
    temp.push(this.faces[3].getRow(2));
    temp.push(this.faces[5].getRow(0));

    this.faces[2].setRow(2, temp[0]);
    this.faces[3].setRow(2, temp[1]);
    this.faces[5].setRow(0, temp[2].reverse());
    this.faces[1].setRow(2, temp[3].reverse());

    this.faces[4].rotateCW();
  }

  turnD() {
    let temp = [];
    temp.push(this.faces[4].getRow(2));
    temp.push(this.faces[3].getCol(2));
    temp.push(this.faces[0].getRow(0));
    temp.push(this.faces[1].getCol(0));

    this.faces[3].setCol(2, temp[0].reverse());
    this.faces[0].setRow(0, temp[1]);
    this.faces[1].setCol(0, temp[2].reverse());
    this.faces[4].setRow(2, temp[3]);

    this.faces[5].rotateCW();
  }

  turnB() {
    let temp = [];
    temp.push(this.faces[5].getRow(2));
    temp.push(this.faces[3].getRow(0));
    temp.push(this.faces[2].getRow(0));
    temp.push(this.faces[1].getRow(0));

    this.faces[3].setRow(0, temp[0].reverse());
    this.faces[2].setRow(0, temp[1]);
    this.faces[1].setRow(0, temp[2]);
    this.faces[5].setRow(2, temp[3].reverse());

    this.faces[0].rotateCW();
  }

  turnL() {
    let temp = [];
    temp.push(this.faces[0].getCol(0));
    temp.push(this.faces[2].getCol(0));
    temp.push(this.faces[4].getCol(0));
    temp.push(this.faces[5].getCol(0));

    this.faces[2].setCol(0, temp[0]);
    this.faces[4].setCol(0, temp[1]);
    this.faces[5].setCol(0, temp[2]);
    this.faces[0].setCol(0, temp[3]);

    this.faces[1].rotateCW();
  }

  turnRi() {
    this.turnR();
    this.turnR();
    this.turnR();
  }

  turnUi() {
    this.turnU();
    this.turnU();
    this.turnU();
  }

  turnFi() {
    this.turnF();
    this.turnF();
    this.turnF();
  }

  turnDi() {
    this.turnD();
    this.turnD();
    this.turnD();
  }

  turnBi() {
    this.turnB();
    this.turnB();
    this.turnB();
  }

  turnDi() {
    this.turnD();
    this.turnD();
    this.turnD();
  }

  turnLi() {
    this.turnL();
    this.turnL();
    this.turnL();
  }

  printF() {
    console.log('Printing F Layer');
    this.faces[4].rows.map(x => console.log(x));
  }

  printB() {
    console.log('Printing B Layer');
    this.faces[0].rows.map(x => console.log(x));
  }

  printL() {
    console.log('Printing L Layer');
    this.faces[1].rows.map(x => console.log(x));
  }

  printU() {
    console.log('Printing U Layer');
    this.faces[2].rows.map(x => console.log(x));
  }

  printR() {
    console.log('Printing R Layer');
    this.faces[3].rows.map(x => console.log(x));
  }

  printF() {
    console.log('Printing F Layer');
    this.faces[4].rows.map(x => console.log(x));
  }

  printD() {
    console.log('Printing D Layer');
    this.faces[5].rows.map(x => console.log(x));
  }

  printCube() {
    this.printB();
    this.printU();
    this.printL();
    this.printR();
    this.printF();
    this.printD();
  }
}

let cube = new Cube();

function parseTurn(move) {
  switch (move) {
    case 'U\'':
      cube.turnUi();
      break;
    case 'U2':
      cube.turnU();
      cube.turnU();
      break;
    case 'U':
      cube.turnU();
      break;

    case 'D\'':
      cube.turnDi();
      break;
    case 'D2':
      cube.turnD();
      cube.turnD();
      break;
    case 'D':
      cube.turnD();
      break;

    case 'F\'':
      cube.turnFi();
      break;
    case 'F2':
      cube.turnF();
      cube.turnF();
      break;
    case 'F':
      cube.turnF();
    break;

    case 'B\'':
      cube.turnBi();
      break;
    case 'B2':
      cube.turnB();
      cube.turnB();
      break;
    case 'B':
      cube.turnB();
      break;

    case 'L\'':
      cube.turnLi();
      break;
    case 'L2':
      cube.turnL();
      cube.turnL();
      break;
    case 'L':
      cube.turnL();
      break;

    case 'R\'':
      cube.turnRi();
      break;
    case 'R2':
      cube.turnR();
      cube.turnR();
      break;
    case 'R':
      cube.turnD();
      break;
  }
  console.log('Turn ', move);
}

function parseScramble(scramble) {
  let list = scramble.split(' ');
  cube.resetCube();

  console.log(scramble);
  list.map(x => parseTurn(x));
  cube.printCube();
}

class CubeViewer extends React.Component {
  render() {
    return (
      <div>
        {parseScramble(this.props.scramble)}
      </div>
    );
  }
}

export default CubeViewer;

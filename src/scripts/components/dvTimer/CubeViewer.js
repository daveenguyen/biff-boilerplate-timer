'use strict';

import React from 'react';
import math from 'mathjs';

var styles = {
  base: {
    border: 'none',
    width: '500px',
    height: '500'
  }
}


function printMatrix(value) {
  let precision = 14;
  let str = math.format(value, precision);
  let color = [];
  color.push('b'); // B
  color.push('o'); // L
  color.push('w'); // U
  color.push('r'); // R
  color.push('g'); // F
  color.push('y'); // D
  for (var i = 0; i < color.length; i++) {
    let re = new RegExp(i.toString(), 'g');
    str = str.replace(re, color[i]);
  }
  str = str.replace(/],/g, '],\n');
}

class MathHelper {
  /**
  * Retrieve a column from a matrix
  * @param {Matrix | Array} matrix
  * @param {number} index    Zero based column index
  * @return {Matrix | Array} Returns the column as a vector
  */
  static col(matrix, index) {
    var rows = math.size(matrix).valueOf()[0];
    return math.flatten(math.subset(matrix, math.index(math.range(0, rows), index)));
  }

  /**
  * Retrieve a row from a matrix
  * @param {Matrix | Array} matrix
  * @param {number} index    Zero based row index
  * @return {Matrix | Array} Returns the row as a vector
  */
  static row(matrix, index) {
    var cols = math.size(matrix).valueOf()[1];
    return math.flatten(math.subset(matrix, math.index(index, math.range(0, cols))));
  }


  static flipVector(vector) {
    let res = math.matrix([vector,vector]); // hacky
    let size = math.size(res).valueOf()[1];
    let range = math.range(size - 1, 0, -1, true);

    return math.flatten(math.subset(res, math.index(0, range)));
  }
}


class Face {
  constructor(name) {
    this.data = math.multiply(math.ones(3, 3), name);
    // this.data = math.matrix([[0, 1, 2], [3, 4, 5], [6, 7, 8]]);
  }

  getRow(num) {
    return MathHelper.row(this.data, num);
  }

  setRow(num, data) {
    let cols = math.size(this.data).valueOf()[1];
    let index = math.index(num, math.range(0, cols));

    this.data.subset(index, data);
  }

  getCol(num) {
    return MathHelper.col(this.data, num);
  }

  setCol(num, data) {
    let rows = math.size(this.data).valueOf()[0];
    let index = math.index(math.range(0, rows), num);

    this.data.subset(index, data);
  }

  rotateCW() {
    let newC0 = this.getRow(0);
    let newC1 = this.getRow(1);
    let newC2 = this.getRow(2);

    this.setCol(0, newC2);
    this.setCol(1, newC1);
    this.setCol(2, newC0);
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
    this.faces.push(new Face(0));
    this.faces.push(new Face(1));
    this.faces.push(new Face(2));
    this.faces.push(new Face(3));
    this.faces.push(new Face(4));
    this.faces.push(new Face(5));
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
    this.faces[4].setRow(0, MathHelper.flipVector(temp[1]));
    this.faces[1].setCol(2, temp[2]);
    this.faces[0].setRow(2, MathHelper.flipVector(temp[3]));

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
    this.faces[5].setRow(0, MathHelper.flipVector(temp[2]));
    this.faces[1].setRow(2, MathHelper.flipVector(temp[3]));

    this.faces[4].rotateCW();
  }

  turnD() {
    let temp = [];
    temp.push(this.faces[4].getRow(2));
    temp.push(this.faces[3].getCol(2));
    temp.push(this.faces[0].getRow(0));
    temp.push(this.faces[1].getCol(0));

    this.faces[3].setCol(2, MathHelper.flipVector(temp[0]));
    this.faces[0].setRow(0, temp[1]);
    this.faces[1].setCol(0, MathHelper.flipVector(temp[2]));
    this.faces[4].setRow(2, temp[3]);

    this.faces[5].rotateCW();
  }

  turnB() {
    let temp = [];
    temp.push(this.faces[5].getRow(2));
    temp.push(this.faces[3].getRow(0));
    temp.push(this.faces[2].getRow(0));
    temp.push(this.faces[1].getRow(0));

    this.faces[3].setRow(0, MathHelper.flipVector(temp[0]));
    this.faces[2].setRow(0, temp[1]);
    this.faces[1].setRow(0, temp[2]);
    this.faces[5].setRow(2, MathHelper.flipVector(temp[3]));

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
    // this.faces[4].rows.map(x => console.log(x));
    printMatrix(this.faces[4].data);
  }

  printB() {
    console.log('Printing B Layer');
    // this.faces[0].rows.map(x => console.log(x));
    printMatrix(this.faces[0].data);
  }

  printL() {
    console.log('Printing L Layer');
    // this.faces[1].rows.map(x => console.log(x));
    printMatrix(this.faces[1].data);
  }

  printU() {
    console.log('Printing U Layer');
    // this.faces[2].rows.map(x => console.log(x));
    printMatrix(this.faces[2].data);
  }

  printR() {
    console.log('Printing R Layer');
    // this.faces[3].rows.map(x => console.log(x));
    printMatrix(this.faces[3].data);
  }

  printF() {
    console.log('Printing F Layer');
    // this.faces[4].rows.map(x => console.log(x));
    printMatrix(this.faces[4].data);
  }

  printD() {
    console.log('Printing D Layer');
    // this.faces[5].rows.map(x => console.log(x));
    printMatrix(this.faces[5].data);
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
      cube.turnR();
      break;
  }
}

function parseScramble(scramble) {
  let list = scramble.split(' ');
  cube.resetCube();

  list.map(x => parseTurn(x));
}

let curScramble;

function guardedParsing(scramble) {
  if (curScramble !== scramble) {
    curScramble = scramble;
    parseScramble(curScramble);
  }
}

class CubeViewer extends React.Component {
  render() {
    return (
      <div>
        {guardedParsing(this.props.scramble)}
      </div>
    );
  }
}

export default CubeViewer;

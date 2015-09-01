'use strict';

import React from 'react';

let avg = 0;
let avg5 = NaN;
let avg12 = NaN;

var styles = {
  base: {
    userSelect: 'none',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: '-0.04em',
    fontSize: '3vw'
  }
}

function calcTime(solve) {
  return solve.end - solve.start;
}

function sortSolve(a, b) {
  a = calcTime(a);
  b = calcTime(b);
  return a > b ? 1 : b > a ? -1 : 0;
}

function calcAverage(solves) {
  let data = solves.sort(sortSolve);
  let sum = 0;
  let best = calcTime(data.first()) / 1e3;
  let worst = calcTime(data.last()) / 1e3;
  let avg;
  data = data.slice(1, -1);

  solves.map(x => sum += calcTime(x));

  avg = (sum / data.size / 1e3).toFixed(3);

  console.log('average of', solves.size, 'best:', best, 'worst:', worst, 'avg:', avg)

  return avg;
}

class SessionStats extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    let solves = nextProps.solves;

    if (solves.size >= 3) {
      let sum = 0;

      avg = calcAverage(solves);

      if (solves.size >= 5) {
        avg5 = calcAverage(solves.slice(-5));
      }

      if (solves.size >= 12) {
        avg12 = calcAverage(solves.slice(-12));
      }
    }
  }

  render() {
    return (
      <div style={styles.base}>
        <span><br/>Average: {avg}</span>
        <span><br/>Average of 5: {avg5}</span>
        <span><br/>Average of 12: {avg12}</span>
        {/*this.props.solves.map(x => (<span key={x.start}> {((x.end - x.start) / 1e3).toFixed(3)} </span>))*/}
      </div>
    );
  }
}

export default SessionStats;

'use strict';

import React from 'react/addons';

let avg = 0;

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

class SessionStats extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    let solves = nextProps.solves;

    if (solves.size >= 3) {
      let sum = 0;

      solves = solves.sort(sortSolve);

      let best = calcTime(solves.first());
      let worst = calcTime(solves.last());

      solves = solves.delete(0).pop();

      solves.map(function(x) {
        sum += calcTime(x);
      });

      avg = (sum / solves.size / 1e3).toFixed(3);

      console.log('sum:', sum / 1e3);
      console.log('avg:', avg);
      console.log('best', best / 1e3);
      console.log('worst', worst / 1e3);
    }
  }
  render() {
    return (
      <div style={styles.base}>
        <span><br/>Average: {avg}</span>
        {/*this.props.solves.map(x => (<span key={x.start}> {((x.end - x.start) / 1e3).toFixed(3)} </span>))*/}
      </div>
    );
  }
}

export default SessionStats;

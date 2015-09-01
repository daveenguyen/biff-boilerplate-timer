'use strict';

import React from 'react/addons';
import radium from 'radium';

import Flux from '../dispatcher/dispatcher';

import ScrambleStore from '../stores/ScrambleStore';
import TimeStore from '../stores/TimeStore';
import SolveStore from '../stores/SolveStore';

import SessionStats from './dvTimer/SessionStats';
import CubeViewer from './dvTimer/CubeViewer';

import InputListener from './utils/InputListener';

var styles = {
  app: {
    width: '100%',
    textAlign: 'center',
    display: 'block',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  base: {
    userSelect: 'none',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: '-0.04em'
  },
  scramble: {
    fontSize: '2.5vw',
    padding: '0',
    '@media (max-width: 480px)': {
      fontSize: '5vw',
      padding: '0 9%'
    }
  },
  time: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '24vw'
  },
  stats: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '6vw'
  }
}

function wrapData(f) {
  return function(e) {
    let data = {
      time: Date.now(),
      scramble: ScrambleStore.getScramble(),
      solveTime: TimeStore.getTime()
    }

    f(e, data);
  };
}

class App extends React.Component {
  componentWillMount() {
    window.addEventListener('keydown', wrapData(InputListener.handleKeyDown));
    window.addEventListener('keyup', wrapData(InputListener.handleKeyUp));
    window.addEventListener('touchstart', wrapData(InputListener.handleTouchStart));
    window.addEventListener('touchend', wrapData(InputListener.handleTouchEnd));
  }
  render() {
    return (
      <div style={[styles.base, styles.app]}>
        <div id="scramble" style={[styles.base, styles.scramble]}>{this.props.scramble}</div>
        <div id="time" style={[styles.base, styles.time]}>{((this.props.time.end-this.props.time.start) / 1e3).toFixed(3)}</div>
        <SessionStats styles={[styles.base, styles.stats]} solves={this.props.solves} />
        <CubeViewer scramble={this.props.scramble} />
      </div>
    )
  }
}

App.propTypes = {
  scramble: React.PropTypes.string,
  time: React.PropTypes.object,
  solves: React.PropTypes.object
};

let FluxApp = Flux.connect(radium(App), [ScrambleStore, TimeStore, SolveStore], props => ({
  scramble: ScrambleStore.getScramble(),
  time: TimeStore.getTime(),
  solves: SolveStore.getSolves()
}));

export default FluxApp;

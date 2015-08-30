'use strict';

import React from 'react/addons';
import radium from 'radium';

import Flux from '../dispatcher/dispatcher';
import TodoStore from '../stores/TodoStore';
import ScrambleStore from '../stores/ScrambleStore';
import TimeStore from '../stores/TimeStore';

import ErrorMessage from './todos/ErrorMessage';
import TodoList from './todos/TodoList';
import TodoForm from './todos/TodoForm';

import InputListener from './InputListener'

import Immutable from 'immutable';

const ReactTransitionGroup = React.addons.TransitionGroup;

require('../../styles/normalize.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('fontawesome/css/font-awesome.css');
require('../../styles/main.scss');

function calcTime(start, end) {
  var time = '0'

  if (end === 0) {
    end = Date.now();
    if (start === 0) {
      start = end;
    }
  }

  var ms = end-start;
  var min = Math.floor(ms / 60000);
  var sec = Math.floor((ms % 60000) / 1000);
  ms = Math.floor(ms % 1000);

  if (sec < 10) {
    sec = '0' + sec.toString();
  }

  if (ms < 10) {
    ms = '00' + ms.toString();
  } else if (ms < 100) {
    ms = '0' + ms.toString();
  }

  if (min > 0) {
    time = min.toString() + ':' + sec + '.' + ms;
  } else {
    time = sec + '.' + ms;
  }

  return time;
}

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
  }
}

class App extends React.Component {
  componentWillMount() {
    window.addEventListener('keydown', InputListener.handleKeyDown);
    window.addEventListener('keyup', InputListener.handleKeyUp);
    window.addEventListener('mousedown', InputListener.handleMouseDown);
    window.addEventListener('mouseup', InputListener.handleMouseUp);
  }
  render() {
    return (
      <div style={[styles.base, styles.app]}>
        <div id="scramble" style={[styles.base, styles.scramble]}>{this.props.scramble}</div>
        <div id="time" style={[styles.base, styles.time]}>{calcTime(this.props.time.start, this.props.time.end)}</div>
      </div>
    )
  }
}

App.propTypes = {
  scramble: React.PropTypes.string,
  time: React.PropTypes.object,
  todos: React.PropTypes.object,
  pending: React.PropTypes.bool,
  errors: React.PropTypes.array
};

App.defaultProps = {
  todos: new Immutable.List()
};

let FluxApp = Flux.connect(radium(App), [TodoStore, ScrambleStore, TimeStore], props => ({
  scramble: ScrambleStore.getScramble(),
  time: TimeStore.getTime(),
  todos: TodoStore.getTodos(),
  pending: TodoStore.getPending(),
  errors: TodoStore.getErrors()
}));

export default FluxApp;

var TimerActions = require('../../actions/TimerActions');
var _count = 0;
var Ticker;

function newSolve() {
  TimerActions.newSolve();
}

function startSolve() {
  TimerActions.startSolve(Date.now());
  Ticker = setInterval(TimerActions.tick, 100);
}

function endSolve() {
  TimerActions.endSolve(Date.now());
  clearInterval(Ticker);
}

var InputListener = {
  handleMouseUp: function(e) {
    switch (_count % 4) {
      case 1:
        startSolve();
        _count++;
        break;
      case 3:
        _count++;
        break;
      default:
        break;
    }
  },
  handleMouseDown: function(e) {
    switch (_count % 4) {
      case 0:
        newSolve();
        _count++;
        break;
      case 2:
        endSolve();
        _count++;
        break;
      default:
        break;
    }
  },
    handleKeyUp: function(e) {
      if (e.keyCode === 32) {
        switch (_count % 4) {
          case 1:
            startSolve();
            _count++;
            break;
          case 3:
            _count++;
            break;
          default:
            break;
        }
      }
    },
    handleKeyDown: function(e) {
      if (e.keyCode === 32) {
        switch (_count % 4) {
          case 0:
            newSolve();
            _count++;
            break;
          case 2:
            endSolve();
            _count++;
            break;
          default:
            break;
        }
      }
    }
};

module.exports = InputListener;

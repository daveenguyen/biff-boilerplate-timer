import TimerActions from '../../actions/TimerActions';

let _count = 0;
let _disableDelay = 250;
let _disabled = false;
let _ticker;

function startInspection() {
  TimerActions.startInspection();
  _ticker = setInterval(TimerActions.tick, 100);
}

function newSolve() {
  TimerActions.newSolve();
}

function startSolve(data) {
  TimerActions.startSolve(data);
  _ticker = setInterval(TimerActions.tick, 100);
}

function endSolve(data) {
  TimerActions.endSolve(data);
  clearInterval(_ticker);
}

function disableTimer() {
  _disabled = true;
  setTimeout(function() {
    _disabled = false;
  }, _disableDelay);
}

function handleUp(e, data) {
  if (!_disabled) {
    switch (_count % 4) {
      case 1:
        startSolve(data);
        _count++;
        break;
      case 3:
        disableTimer();
        _count++;
        break;
      default:
        break;
    }
  }
}

function handleDown(e, data) {
  if (!_disabled) {
    switch (_count % 4) {
      case 0:
        newSolve(data);
        _count++;
        break;
      case 2:
        endSolve(data);
        _count++;
        break;
      default:
        break;
    }
  }
}

var InputListener = {
  handleTouchEnd(e, data) {
    handleUp(e, data);
  },
  handleTouchStart(e, data) {
    handleDown(e, data);
  },
  handleKeyUp(e, data) {
    if (e.keyCode === 32) {
      handleUp(e, data);
    }
  },
  handleKeyDown(e, data) {
    if (e.keyCode === 32) {
      handleDown(e, data);
    }
  }
}

export default InputListener;

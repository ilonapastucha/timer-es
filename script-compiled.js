'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('time'));

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

    _this.state = {
      running: false,
      showStart: true,
      showStop: false,
      resetTimer: false,
      count: 0,
      results: [],
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    };
    return _this;
  }

  _createClass(Stopwatch, [{
    key: 'reset',
    value: function reset() {
      this.setState = {
        running: false,
        showStart: true,
        showStop: false,
        times: { minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      };
      clearInterval(this.watch);
      this.print();
      this.splitResult();
    }
  }, {
    key: 'pad0',
    value: function pad0(value) {
      var result = value.toString();
      if (result.length < 2) {
        result = '0' + result;
      }
      return result;
    }
  }, {
    key: 'format',
    value: function format() {
      var timer = this.pad0(this.state.times.minutes) + ':' + this.pad0(this.state.times.seconds) + ':' + this.pad0(Math.floor(this.state.times.miliseconds));
      return timer;
    }
  }, {
    key: 'print',
    value: function print() {
      return this.format(this.times);
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      if (!this.state.running) return;
      var miliseconds = this.state.times.miliseconds;
      var seconds = this.state.times.seconds;
      var minutes = this.state.times.minutes;
      miliseconds++;

      if (miliseconds >= 100) {
        seconds += 1;
        miliseconds = 0;
      }
      if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
      }

      this.setState({
        times: {
          minutes: minutes,
          seconds: seconds,
          miliseconds: miliseconds
        }
      });
      this.print();
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      var _state = this.state,
          showStart = _state.showStart,
          showStop = _state.showStop;

      if (!this.running) {
        this.setState({
          running: true,
          showStart: !showStart,
          showStop: !showStop
        });
        this.watch = setInterval(function () {
          return _this2.calculate();
        }, 10);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      var _state2 = this.state,
          showStart = _state2.showStart,
          showStop = _state2.showStop;

      this.setState({ running: false,
        showStart: !showStart,
        showStop: !showStop
      });
      clearInterval(this.watch);
    }
  }, {
    key: 'addResult',
    value: function addResult() {
      var count = this.state.count;

      if (!this.state.running) return;
      var counter = count + 1;
      var times = { id: counter + '. ', value: this.format(this.times).toString() };
      this.setState(function (prevState) {
        return {
          count: counter,
          resetTimer: false,
          results: [times].concat(_toConsumableArray(prevState.results))
        };
      });
    }
  }, {
    key: 'clearResult',
    value: function clearResult() {
      this.setState({
        count: 0,
        resetTimer: false,
        results: []
      });
    }
  }, {
    key: 'splitResult',
    value: function splitResult() {
      var _state3 = this.state,
          resetTimer = _state3.resetTimer,
          length = _state3.results.length;

      if (length !== 0) {
        if (resetTimer === true) return;
        var text = { id: '  RESET TIMER', value: '' };
        this.setState(function (prevState) {
          return {
            resetTimer: true,
            results: [text].concat(_toConsumableArray(prevState.results))
          };
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state4 = this.state,
          showStart = _state4.showStart,
          showStop = _state4.showStop;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: style.content },
          React.createElement(
            'nav',
            { className: 'controls' },
            React.createElement(
              'a',
              {
                href: '#',
                className: style.button,
                id: 'start',
                onClick: this.start },
              showStart && React.createElement('i', { className: 'fas fa-play' })
            ),
            React.createElement(
              'a',
              {
                href: '#',
                className: style.button,
                id: 'stop',
                onClick: this.stop },
              showStop && React.createElement('i', { className: 'fas fa-pause' })
            ),
            React.createElement(
              'a',
              {
                href: '#',
                className: style.button,
                id: 'reset',
                onClick: this.reset },
              React.createElement('i', { className: 'fas fa-stop' })
            )
          ),
          React.createElement(
            'a',
            {
              href: '#',
              className: style.button + ' ' + style.result,
              id: 'result',
              onClick: this.addResult },
            React.createElement('i', { className: 'fas fa-plus' })
          ),
          React.createElement(
            'div',
            { className: style.stopwatch },
            this.print()
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'h1',
            { className: style.lapTimes },
            'Lap Times'
          ),
          React.createElement(
            'a',
            { href: '#',
              className: style.button + ' ' + style.clear,
              id: 'clear',
              onClick: this.clearResult },
            React.createElement('i', { className: 'fas fa-power-off' })
          ),
          React.createElement(
            'ul',
            { className: style.results, id: 'results' },
            this.state.results.map(function (result, index) {
              return React.createElement(
                'li',
                { key: index },
                React.createElement(
                  'p',
                  null,
                  result.id
                ),
                result.value
              );
            })
          )
        )
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));

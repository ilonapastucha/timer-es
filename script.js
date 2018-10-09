class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      showStart: true,
      showStop: false,
      resetTimer: false,
      count:0,
      results: [],
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    };
  }

  reset(){
    this.setState = ({
      running: false,
      showStart: true,
      showStop: false,
      times: { minutes: 0,
              seconds: 0,
              miliseconds: 0
      }
    });
    clearInterval(this.watch);
    this.print();
    this.splitResult();
  }

  pad0(value){
    let result = value.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }
    
  format(){
    let timer = this.pad0(this.state.times.minutes) + ':' + this.pad0(this.state.times.seconds) + ':' + this.pad0(Math.floor(this.state.times.miliseconds));
    return timer;
  }

  print(){
    return this.format(this.times);
  }
    
  calculate(){
    if (!this.state.running) return;
    let miliseconds = this.state.times.miliseconds;
    let seconds = this.state.times.seconds;
    let minutes = this.state.times.minutes;
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
    })
    this.print();
  }
    
  start() {
    const { showStart, showStop } = this.state;
    if (!this.running) {
      this.setState({
        running: true,
        showStart: !showStart,
        showStop: !showStop
      });
      this.watch = setInterval(() => this.calculate(), 10);
    }
  }
    
  stop(){
    const { showStart, showStop } = this.state;
    this.setState({running: false,
                  showStart: !showStart,
                  showStop: !showStop
                  });
    clearInterval(this.watch);
  }
    
  addResult (){
    const { count } = this.state;
    if (!this.state.running) return;
    const counter = count + 1;
    const times = {id: counter + '. ', value: this.format(this.times).toString()};
    this.setState(prevState => ({
      count: counter,
      resetTimer: false,
      results: [times, ...prevState.results]
    }));
  }
    
  clearResult() {
    this.setState({
      count: 0,
      resetTimer: false,
      results: []
    });
  }
    
  splitResult () {
    const { resetTimer, results:{length} } = this.state;
    if (length !== 0) {
      if (resetTimer === true) return;
      let text = {id: '  RESET TIMER', value: ''};
      this.setState(prevState => ({
        resetTimer: true,
        results: [text, ...prevState.results]
      }));
    }
  }
    
  render() {
    const { showStart, showStop } = this.state;
      return (
        <div>
          <div className={style.content}>
            <nav className="controls">
              <a
                href="#"
                className={style.button}
                id="start"
                onClick={this.start}>
                  {showStart &&<i className="fas fa-play"></i>}
              </a>
              <a
                href="#"
                className={style.button}
                id="stop"
                onClick={this.stop}>
                  {showStop &&<i className="fas fa-pause"></i>}
              </a>
              <a
                href="#"
                className={style.button}
                id="reset"
                onClick={this.reset}>
                  <i className="fas fa-stop"></i>
              </a>
            </nav>
              <a
                href="#"
                className={style.button + ' ' + style.result}
                id="result"
                onClick={this.addResult}>
                  <i className="fas fa-plus"></i>
              </a>
              <div className={style.stopwatch}>{this.print()}</div>
          </div>
            <div>
              <h1 className={style.lapTimes}>
                Lap Times
              </h1>
              <a href="#"
                className={style.button + ' ' + style.clear}
                id="clear"
                onClick={this.clearResult}>
                <i className="fas fa-power-off"></i>
              </a>
              <ul className={style.results} id="results">
                {this.state.results.map((result, index) =>
                  { return (
                    <li key={index}>
                      <p>{result.id}</p>
                      {result.value}
                    </li>)
                  })
                }
              </ul>
            </div>
        </div>
      )
  }
}
    
    ReactDOM.render(<Stopwatch />, document.getElementById('app'));
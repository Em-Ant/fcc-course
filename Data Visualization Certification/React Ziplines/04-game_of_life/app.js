
/** JSX **********************************************************************


var randomBoard = function (rows, cols) {
  var matrix = [];
    for (var i = 0; i < rows; i++) {
      var row = [];
      for (var j = 0; j < cols; j++) {
        row.push(Math.floor(Math.random()*2));
      }
      matrix.push(row);
    }
  return matrix;
};

var emptyBoard = function (rows, cols) {
  var matrix = [];
    for (var i = 0; i < rows; i++) {
      var row = [];
      for (var j = 0; j < cols; j++) {
        row.push(0);
      }
      matrix.push(row);
    }
  return matrix;
};

var aliveCount = function (i,j,matrix) {
  // count the living cells around
  var count = 0;
  var rmin = -1, rmax = 1, cmin = -1, cmax = 1;
  if (i === 0) rmin = 0;
  else if (i === matrix.length - 1) rmax = 0;
  if (j === 0) cmin = 0;
  else if (j === matrix[0].length -1) cmax = 0;

  for (var k = rmin; k <= rmax; k++) {
    for (var l = cmin; l <= cmax; l++) {
      if (!(k === 0 && l === 0))
        if(matrix[i+k][j+l]) count++;
    }
  }
  return count;
};

var computeNextGen = function (matrix) {
  var newMatrix = [];
  var rows = matrix.length;
  var cols = matrix[0].length;
  for (var i = 0; i < rows; i++ ) {
    var row = [];
    for (var j = 0; j < cols; j++) {
      var count = aliveCount(i,j,matrix);
      var thisCell = matrix[i][j];

      /// GAME LOGIC HERE
      var newCell = 0;
      if (thisCell) {
        if (count === 2 || count === 3)
          newCell = 2;
      } else {
        if (count === 3)
          newCell = 1;
      }
      row.push(newCell);
    }
    newMatrix.push(row);
  }
  return newMatrix;
};

var CellRow = React.createClass({
  click: function(ind) {

    this.props.clickCb(this.props.row, ind)
  },
  render : function () {
    var rowCells = this.props.rowArray.map(function(el,ind){
      var cellClasses = (el ? (el === 1 ? 'young'  : 'old') : '') + ' cell';
      return (
        <div className={cellClasses} onClick={this.click.bind(null,ind)}></div>
      );
    }.bind(this));
    return (
      <div className="boardrow">
        {rowCells}
      </div>
    )
  }
});

var Board = React.createClass({
  render : function () {
    var rows = this.props.boardMatrix.map(function(el,ind){
      return (
        <CellRow rowArray={el} row={ind} clickCb={this.props.clickCb}/>
      )
    }.bind(this));
    return (
      <div className="board">
        {rows}
      </div>
    )
  }
});

var GameApp = React.createClass({
  getDefaultProps: function () {
    return {
      rows: 20,
      cols: 30
    }
  },
  getInitialState: function () {
    var board = randomBoard(this.props.rows, this.props.cols);
    return {
      generation: 0,
      cellMatrix: board,
      running: true
    }
  },
  editCell: function (row, col) {
    var boardState = this.state.cellMatrix;
    boardState[row][col] = boardState[row][col] ? 0 : 1;
    this.setState({cellMatrix: boardState})
  },
  nextGen: function () {
    var newMatrix = computeNextGen(this.state.cellMatrix);
    var gen = this.state.generation;
    this.setState({
      generation: ++gen,
      cellMatrix: newMatrix
    });
  },
  componentDidMount: function () {
    this.timer = setInterval(this.nextGen, 500);
  },
  start: function () {
    if (!this.state.running) {
      this.timer = setInterval(this.nextGen,500);
      this.setState({running: true});
    }
  },
  stop: function () {
    if (this.state.running) {
      clearInterval(this.timer);
      this.timer = undefined;
      this.setState({running: false});
    }
  },
  clear: function () {
    var emptyMatrix = emptyBoard(this.props.rows, this.props.cols);
    this.stop();
    this.setState ({
      generation: 0,
      cellMatrix: emptyMatrix
    })
  },
  populate: function () {
    var randomBrd = randomBoard(this.props.rows, this.props.cols);
    this.stop();
    this.setState ({
      generation: 0,
      cellMatrix: randomBrd
    })
  },
  render: function () {
    return (
      <div className="display-panel">
        <h1>The Game of Life</h1>
        <div className="board-panel">
          <Board
            boardMatrix={this.state.cellMatrix}
            clickCb={this.editCell}
          />
          <div className="button-panel">
            <div
              className="btn start"
              onClick={this.state.running ? this.stop : this.start}>{this.state.running ? "STOP" : "START"}
            </div>
            <div className="btn clear" onClick={this.clear}>CLEAR</div>
            <div className="btn pop" onClick={this.populate}>POPULATE</div>
            <div className="out">GENERATION {this.state.generation}</div>
          </div>
        </div>
      </div>
    )
  }
});

ReactDOM.render(<GameApp/>, document.getElementById('app'));

*****************************************************************************/
/**** COMPILED JS ES5 (Babel) ***********************************************/

'use strict';

var randomBoard = function randomBoard(rows, cols) {
  var matrix = [];
  for (var i = 0; i < rows; i++) {
    var row = [];
    for (var j = 0; j < cols; j++) {
      row.push(Math.floor(Math.random() * 2));
    }
    matrix.push(row);
  }
  return matrix;
};

var emptyBoard = function emptyBoard(rows, cols) {
  var matrix = [];
  for (var i = 0; i < rows; i++) {
    var row = [];
    for (var j = 0; j < cols; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
};

var aliveCount = function aliveCount(i, j, matrix) {
  // count the living cells around
  var count = 0;
  var rmin = -1,
      rmax = 1,
      cmin = -1,
      cmax = 1;
  if (i === 0) rmin = 0;else if (i === matrix.length - 1) rmax = 0;
  if (j === 0) cmin = 0;else if (j === matrix[0].length - 1) cmax = 0;

  for (var k = rmin; k <= rmax; k++) {
    for (var l = cmin; l <= cmax; l++) {
      if (!(k === 0 && l === 0)) if (matrix[i + k][j + l]) count++;
    }
  }
  return count;
};

var computeNextGen = function computeNextGen(matrix) {
  var newMatrix = [];
  var rows = matrix.length;
  var cols = matrix[0].length;
  for (var i = 0; i < rows; i++) {
    var row = [];
    for (var j = 0; j < cols; j++) {
      var count = aliveCount(i, j, matrix);
      var thisCell = matrix[i][j];

      /// GAME LOGIC HERE
      var newCell = 0;
      if (thisCell) {
        if (count === 2 || count === 3) newCell = 2;
      } else {
        if (count === 3) newCell = 1;
      }
      row.push(newCell);
    }
    newMatrix.push(row);
  }
  return newMatrix;
};

var CellRow = React.createClass({
  displayName: 'CellRow',

  click: function click(ind) {

    this.props.clickCb(this.props.row, ind);
  },
  render: function render() {
    var rowCells = this.props.rowArray.map((function (el, ind) {
      var cellClasses = (el ? el === 1 ? 'young' : 'old' : '') + ' cell';
      return React.createElement('div', { className: cellClasses, onClick: this.click.bind(null, ind) });
    }).bind(this));
    return React.createElement(
      'div',
      { className: 'boardrow' },
      rowCells
    );
  }
});

var Board = React.createClass({
  displayName: 'Board',

  render: function render() {
    var rows = this.props.boardMatrix.map((function (el, ind) {
      return React.createElement(CellRow, { rowArray: el, row: ind, clickCb: this.props.clickCb });
    }).bind(this));
    return React.createElement(
      'div',
      { className: 'board' },
      rows
    );
  }
});

var GameApp = React.createClass({
  displayName: 'GameApp',

  getDefaultProps: function getDefaultProps() {
    return {
      rows: 20,
      cols: 30
    };
  },
  getInitialState: function getInitialState() {
    var board = randomBoard(this.props.rows, this.props.cols);
    return {
      generation: 0,
      cellMatrix: board,
      running: true
    };
  },
  editCell: function editCell(row, col) {
    var boardState = this.state.cellMatrix;
    boardState[row][col] = boardState[row][col] ? 0 : 1;
    this.setState({ cellMatrix: boardState });
  },
  nextGen: function nextGen() {
    var newMatrix = computeNextGen(this.state.cellMatrix);
    var gen = this.state.generation;
    this.setState({
      generation: ++gen,
      cellMatrix: newMatrix
    });
  },
  componentDidMount: function componentDidMount() {
    this.timer = setInterval(this.nextGen, 500);
  },
  start: function start() {
    if (!this.state.running) {
      this.timer = setInterval(this.nextGen, 500);
      this.setState({ running: true });
    }
  },
  stop: function stop() {
    if (this.state.running) {
      clearInterval(this.timer);
      this.timer = undefined;
      this.setState({ running: false });
    }
  },
  clear: function clear() {
    var emptyMatrix = emptyBoard(this.props.rows, this.props.cols);
    this.stop();
    this.setState({
      generation: 0,
      cellMatrix: emptyMatrix
    });
  },
  populate: function populate() {
    var randomBrd = randomBoard(this.props.rows, this.props.cols);
    this.stop();
    this.setState({
      generation: 0,
      cellMatrix: randomBrd
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'display-panel' },
      React.createElement(
        'h1',
        null,
        'The Game of Life'
      ),
      React.createElement(
        'div',
        { className: 'board-panel' },
        React.createElement(Board, {
          boardMatrix: this.state.cellMatrix,
          clickCb: this.editCell
        }),
        React.createElement(
          'div',
          { className: 'button-panel' },
          React.createElement(
            'div',
            {
              className: 'btn start',
              onClick: this.state.running ? this.stop : this.start },
            this.state.running ? "STOP" : "START"
          ),
          React.createElement(
            'div',
            { className: 'btn clear', onClick: this.clear },
            'CLEAR'
          ),
          React.createElement(
            'div',
            { className: 'btn pop', onClick: this.populate },
            'POPULATE'
          ),
          React.createElement(
            'div',
            { className: 'out' },
            'GENERATION ',
            this.state.generation
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(GameApp, null), document.getElementById('app'));


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

var cloneMatrix = function (m) {
  var mOut = [];
  m.forEach(function(arr) {
   mOut.push(arr.slice(0));
  })
  return mOut;
};

var diffMatrix = function (m1, m2) {
  for (var i = 0; i < m1.length; i++) {
    for (var j= 0; j<m1[0].length; j++) {
      if ((m1[i][j] > 0 || m2[i][j] > 0) && !(m1[i][j] > 0 && m2[i][j]) > 0)
        return true
    }
  }
  return false;
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
  // Periodic Boundaries
  var rInd = [-1, 0, 1], cInd = [-1, 0 , 1];
  if (i === 0) rInd[0] = matrix.length - 1;
  else if (i === matrix.length - 1) rInd[2] = -i;
  if (j === 0) cInd[0] = matrix[0].length - 1;
  else if (j === matrix[0].length - 1) cInd[2] = -j;
  rInd.forEach(function(k) {
    cInd.forEach(function(l) {
      if (!(k === 0 && l === 0))
        if(matrix[i+k][j+l]) count++;
    })
  });
  return count;

};

var computeNextGen = function (matrix) {
  var newMatrix = [];
  var rows = matrix.length;
  var cols = matrix[0].length;
  var unchanged = true;
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
      if( newCell - matrix[i][j] !== 0)
        unchanged = false;
      row.push(newCell);
    }
    newMatrix.push(row);
  }
  return {
    matrix: newMatrix,
    changed: !unchanged
  }
};

var CellRow = React.createClass({
  click: function(ind) {

    this.props.clickCb(this.props.row, ind)
  },
  render : function () {
      var rowCells = this.props.rowArray.map(function(el,ind){
      var cellClasses = (el ? (el === 1 ? 'young'  : 'old') : '') + ' cell';
      cellClasses += this.props.running  ? '' : ' clickable';
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
        <CellRow
          rowArray={el}
          row={ind}
          clickCb={this.props.clickCb}
          running={this.props.running}
        />
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
      cols: 30,
      timeout: 500
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
    if (!this.state.running) {
      var boardState = this.state.cellMatrix;
      boardState[row][col] = boardState[row][col] ? 0 : 1;
      this.setState({cellMatrix: boardState})
    }
  },
  nextGen: function () {
    var newGen = computeNextGen(this.state.cellMatrix);
    var genCount = this.state.generation;
    if ( newGen.changed ) {
      // board normally evolving
      this.setState({
        generation: ++genCount,
        cellMatrix: newGen.matrix
      });
    } else {
      // board is unchanged
      this.stop();
    }
  },
  componentDidMount: function () {
    this.timer = setInterval(this.nextGen, this.props.timeout);
  },
  start: function () {
    if (!this.state.running) {
      this.timer = setInterval(this.nextGen,this.props.timeout);
      if (diffMatrix(this.state.cellMatrix, this.oldMatrix)) {
        this.setState({generation:0, running: true});
        this.dirty = undefined;
      }
      else
        this.setState({running: true});
      this.oldMatrix = undefined;
    }
  },
  stop: function () {
    if (this.state.running) {
      clearInterval(this.timer);
      this.oldMatrix = cloneMatrix(this.state.cellMatrix);
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
            running={this.state.running}
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

var cloneMatrix = function cloneMatrix(m) {
  var mOut = [];
  m.forEach(function (arr) {
    mOut.push(arr.slice(0));
  });
  return mOut;
};

var diffMatrix = function diffMatrix(m1, m2) {
  for (var i = 0; i < m1.length; i++) {
    for (var j = 0; j < m1[0].length; j++) {
      if ((m1[i][j] > 0 || m2[i][j] > 0) && !(m1[i][j] > 0 && m2[i][j]) > 0) return true;
    }
  }
  return false;
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
  // Periodic Boundaries
  var rInd = [-1, 0, 1],
      cInd = [-1, 0, 1];
  if (i === 0) rInd[0] = matrix.length - 1;else if (i === matrix.length - 1) rInd[2] = -i;
  if (j === 0) cInd[0] = matrix[0].length - 1;else if (j === matrix[0].length - 1) cInd[2] = -j;
  rInd.forEach(function (k) {
    cInd.forEach(function (l) {
      if (!(k === 0 && l === 0)) if (matrix[i + k][j + l]) count++;
    });
  });
  return count;
};

var computeNextGen = function computeNextGen(matrix) {
  var newMatrix = [];
  var rows = matrix.length;
  var cols = matrix[0].length;
  var unchanged = true;
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
      if (newCell - matrix[i][j] !== 0) unchanged = false;
      row.push(newCell);
    }
    newMatrix.push(row);
  }
  return {
    matrix: newMatrix,
    changed: !unchanged
  };
};

var CellRow = React.createClass({
  displayName: 'CellRow',

  click: function click(ind) {

    this.props.clickCb(this.props.row, ind);
  },
  render: function render() {
    var rowCells = this.props.rowArray.map((function (el, ind) {
      var cellClasses = (el ? el === 1 ? 'young' : 'old' : '') + ' cell';
      cellClasses += this.props.running ? '' : ' clickable';
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
      return React.createElement(CellRow, {
        rowArray: el,
        row: ind,
        clickCb: this.props.clickCb,
        running: this.props.running
      });
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
      cols: 30,
      timeout: 500
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
    if (!this.state.running) {
      var boardState = this.state.cellMatrix;
      boardState[row][col] = boardState[row][col] ? 0 : 1;
      this.setState({ cellMatrix: boardState });
    }
  },
  nextGen: function nextGen() {
    var newGen = computeNextGen(this.state.cellMatrix);
    var genCount = this.state.generation;
    if (newGen.changed) {
      // board normally evolving
      this.setState({
        generation: ++genCount,
        cellMatrix: newGen.matrix
      });
    } else {
      // board is unchanged
      this.stop();
    }
  },
  componentDidMount: function componentDidMount() {
    this.timer = setInterval(this.nextGen, this.props.timeout);
  },
  start: function start() {
    if (!this.state.running) {
      this.timer = setInterval(this.nextGen, this.props.timeout);
      if (diffMatrix(this.state.cellMatrix, this.oldMatrix)) {
        this.setState({ generation: 0, running: true });
        this.dirty = undefined;
      } else this.setState({ running: true });
      this.oldMatrix = undefined;
    }
  },
  stop: function stop() {
    if (this.state.running) {
      clearInterval(this.timer);
      this.oldMatrix = cloneMatrix(this.state.cellMatrix);
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
          running: this.state.running,
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

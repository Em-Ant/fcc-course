/***********************************************************************
User Story: I have health, a level, and a weapon. I can pick up a better weapon.
  I can pick up health items.
User Story: All the items and enemies on the map are arranged at random.
User Story: I can move throughout a map, discovering items.
User Story: I can move anywhere within the map's boundaries, but I can't move
  through an enemy until I've beaten it.
User Story: Much of the map is hidden. When I take a step, all spaces that are
  within a certain number of spaces from me are revealed.
User Story: When I beat an enemy, the enemy goes away and I get XP, which eventually increases my level.
User Story: When I fight an enemy, we take turns damaging each other until one of us loses.
  I do damage based off of my level and my weapon. The enemy does damage based off of its level.
  Damage is somewhat random within a range.
**/

/**********************************************************************
* For this project I wrote a custom dungeon map generator.
*
* The source code is available at:
* https://github.com/Em-Ant/dungeon-generator
***********************************************************************/

function _setExplored(floorMap, i, j, space) {
  space = space || 3;
  for (var k = -space; k <= space; k++) {
    for (var l = -space; l <= space; l++ ) {
      if(i+k < floorMap.length && j+l < floorMap[0].length
          && i+k >= 0 && j+l >= 0)
        floorMap[i+k][j+l].explored = true;
    }
  }
};

function _testFree(floorMap, r, c, spaces){
  var s = spaces ? spaces : 1;
  var free = true;
  for (var i = r-s; i <= r+s; i++) {
    for (var j = c-s; j <= c+s; j++) {
      if ((i > 0 && i < floorMap.length) && (j > 0 && j < floorMap[0].length )) {
        if (floorMap[i][j].cellType !== 'empty') {
          free = false;
          break;
        }
      } else {
        free = false;
        break;
      }
    }
  }
  return free;
};

function _randomPlace(floorMap, cellType, dataObj, space, maxAttempts) {
  space = space || 2;
  maxAttempts = maxAttempts || 2000;
  var count = 0;
  do {
    var i = Math.floor(Math.random()*floorMap.length);
    var j = Math.floor(Math.random()*floorMap[0].length);
    count++;
  } while (count < maxAttempts && !_testFree(floorMap, i, j, space))

  if(count < maxAttempts) {
    floorMap[i][j].cellType = cellType;
    floorMap[i][j].data = {};
    for (var prop in dataObj) {
      floorMap[i][j].data[prop] = dataObj[prop];
    }
    return {row: i, col: j};
  } else {
    return undefined;
  }
};



var GameRow = React.createClass({
  render: function () {
    var cells = this.props.row.map(function(cell, i) {
      var classString = 'game-cell';
      if (!cell.explored && this.props.dark === 'true') {
        classString += ' hidden';
      } else {
        switch (cell.cellType) {
          case 'wall' :
            classString += ' wall';
            break;
          case 'empty' :
            classString += ' empty';
            break;
          case 'player' :
            if (cell.data && cell.data.dead)
              classString +=  ' player dead';
            else
              classString += ' player'
            break;
          case 'enemy' :
            if(cell.data && cell.data.name === 'Dragon')
              classString += ' boss';
            else
              classString += ' enemy';
            break;
          case 'health' :
            classString += ' health';
            break;
          case 'weapon' :
            classString += ' weapon';
            break;
        }
      }
      return (
        <div className={classString} key={i}/>
      )
    }.bind(this));

    return (
      <div className="game-row">
        {cells}
      </div>
    )
  }
});

var GameDisplay = React.createClass({
  render: function () {
    var rows = this.props.matrix.map(function(row, i) {
      return (
        <GameRow row={row} key={i} ind={i} dark={this.props.dark}/>
      )
    }.bind(this));
    return (
      <div id="display">
        {rows}
      </div>
    )
  }
});


var App = React.createClass({
    gameStatus: {},
    componentDidMount: function() {
      window.addEventListener("keydown", this.handleKeyDown);
      if (this.props.dWidth % 2 === 0) this.props.dWidth++;
      if (this.props.dHeight % 2 === 0) this.props.dHeight++;
    },
    componentWillUnmount: function() {
      window.removeEventListener("keydown", this.handleKeyDown);
    },
    whatsAround : function (r, c) {
      var floorMap = this.gameStatus.matrix;
      var out = 'Nothing around you...';
      for(var i = r-1; i <= r+1; i++) {
        for (var j = c-1; j <= c+1; j++) {
          if(!(i === r && j === c)) {
            if (floorMap[i][j].cellType !== 'empty' && floorMap[i][j].cellType !== 'wall') {
              switch (floorMap[i][j].cellType) {
                case 'enemy':
                  out = 'A ' + floorMap[i][j].data.name + ' is near You.'
                  if (floorMap[i][j].data.power === 1000) {
                    out += ' He is very strong. You must kill him.'
                  } else if (floorMap[i][j].data.power > 70) {
                    out += ' He looks Strong.'
                  }
                  break;
                case 'weapon' :
                case 'health':
                  out = 'You see a ' + floorMap[i][j].data.name + '.'
                  break;
                default :
                  out = floorMap[i][j].cellType;
              }
              break;
            }
          }
        }
      }
      return out;
    },
    gameMove: function(r, c) {
      if (this.gameStatus.running) {
        var i = this.gameStatus.player.position.row;
        var j = this.gameStatus.player.position.col;
        var floorMap = this.gameStatus.matrix;
        var currentCell = this.gameStatus.matrix[i][j];
        var nextCell = this.gameStatus.matrix[r][c];
        var newState = {info: ''};
        if (nextCell.cellType !== 'enemy' && nextCell.cellType !== 'wall') {
          switch (nextCell.cellType) {
            case 'empty' :
              break;
            case 'weapon' :
              var wp = nextCell.data;
              newState.info = 'You picked a ' + wp.name + '. '; // Test
              newState.weapon = this.gameStatus.player.weapon = wp.name;
              newState.attackMax = this.gameStatus.player.attackMax = wp.power;
              newState.attackMin = this.gameStatus.player.attackMin
                = Math.floor(this.gameStatus.player.attackMax
                  * this.gameStatus.player.currentLevel / 10);
              break;
            case 'health' :
            newState.info = 'You picked a ' + nextCell.data.name + '. '; // Test
            newState.health = this.gameStatus.player.health
              = this.gameStatus.player.health + nextCell.data.power;
              break;
          }
          currentCell.cellType = 'empty';
          nextCell.cellType = 'player';
          currentCell.data = undefined;
          this.gameStatus.player.position.row = r;
          this.gameStatus.player.position.col = c;
          if (this.state.dMode) _setExplored(floorMap, r, c);
          newState.inSight = this.getInSight();
          newState.info += this.whatsAround(r, c);
          this.setState(newState);
        } else if (nextCell.cellType === 'enemy'){
          // Handle Fight
          var maxAtt = this.gameStatus.player.attackMax;
          var minAtt = this.gameStatus.player.attackMin;
          var eAtt = nextCell.data.power;
          var playerAttack = Math.floor(Math.random()*(maxAtt - minAtt + 1) + minAtt);
          var enemyAttack = Math.floor(Math.random()*(eAtt - 0.5*eAtt + 1) + 0.5*eAtt );
          nextCell.data.power -= playerAttack;
          if(nextCell.data.power > 0) {
            this.gameStatus.player.health -= eAtt;
            if ( this.gameStatus.player.health > 0) {
              // Enemy is Alive
              this.setState({
                health: this.gameStatus.player.health,
                info: 'You hit the ' + nextCell.data.name + '. He is still alive...'
              });
            } else {
              // You died
              this.gameStatus.running = false;
              currentCell.data = {dead: true};
              this.setState({
                health: 0,
                inSight: this.getInSight(),
                info: 'You have been killed ! Please press [r] to restart the game.'
              });
            }
          } else {
            // You killed the enemy
            var enemy = nextCell.data.name;
            var xp = this.gameStatus.player.xp += 20;
            if (this.gameStatus.player.currentLevel < 10
              && xp >= this.gameStatus.levels[this.gameStatus.player.currentLevel]) {
              // Upgrade levels
              newState.level = ++this.gameStatus.player.currentLevel;
              newState.attackMin = this.gameStatus.player.attackMin
                = Math.floor(maxAtt * this.gameStatus.player.currentLevel / 10);
            };
            newState.toNext
              = this.gameStatus.levels[this.gameStatus.player.currentLevel] - xp;
            currentCell.cellType = 'empty';
            nextCell.cellType = 'player';
            newState.info = 'You killed the ' + nextCell.data.name + '. ';
            currentCell.data = undefined;
            this.gameStatus.player.position.row = r;
            this.gameStatus.player.position.col = c;
            if (this.state.dMode) _setExplored(floorMap, r, c);
            newState.inSight = this.getInSight();
            newState.xp = this.gameStatus.player.xp;

            if (enemy !== 'Dragon') {
              newState.info += this.whatsAround(r, c);
            } else {
              newState.info += ' The Princess is free. The End. Press [r] to play again.'
              this.gameStatus.running = false;
            }

            this.setState(newState);          }
        }
      }
    },
    handleKeyDown: function(event) {
      var r = this.gameStatus.player.position.row;
      var c = this.gameStatus.player.position.col;
      var floorMap = this.gameStatus.matrix;
      event.preventDefault();

      switch (event.keyCode) {
        case 68 : //d
          if (!this.state.dMode) _setExplored(floorMap, r, c);
          this.setState({dMode : !this.state.dMode});
          return;
        case 82 : //r
          if (!this.gameStatus.running) {
            this.setState(this.initGame());
          }
          break;
        case 37: // Arrows L-U-R-D
          this.gameMove(r, c-1);
          break;
        case 38:
          this.gameMove(r-1, c);
          break;
        case 39:
          this.gameMove(r, c+1);
          break;
        case 40:
          this.gameMove(r+1, c);
          break;
        default:
      }
    },
    initGame: function() {
      var floorMap = this.gameStatus.matrix = DungeonGenerator.generate({
        maxRoomSize: 11,
        minRoomSize: 11,
        rooms: 30,
        padding: 2,
        rows: 151,
        cols: 151,
      });

      this.gameStatus.displayWindow = {
        row: 0,
        col: 0,
        height: this.props.dHeight,
        width: this.props.dWidth
      };

      this.gameStatus.levels = [20, 40, 60, 80, 120, 180, 220 , 260, 320, 400, 400];
      this.gameStatus.player = {
        health: 100,
        currentLevel: 0,
        toNextLevel: this.gameStatus.levels[0],
        xp: 0,
        attackMin: 0,
        attackMax: 10,
        weapon : 'Bare Hands'
      };

      this.gameStatus.running = true;

      var pos = _randomPlace(floorMap, 'player', {}, 3, 10000)
      if(pos && _randomPlace(floorMap, 'enemy', {name: 'Dragon', power: 1000}, 3, 10000)) {
        this.gameStatus.player.position = {row: pos.row, col: pos.col};
        _setExplored(floorMap, pos.row, pos.col);

        this.gameStatus.weapons = [
          {
            name: 'Stick',
            power: 30
          }, {
            name: 'Knife',
            power: 60
          }, {
            name: 'Chain',
            power: 100
          }, {
            name: 'Sword',
            power: 200
          }, {
            name: 'Magic Sword',
            power: 350
          }
        ];

        this.gameStatus.weapons.forEach(function(w){
          _randomPlace(floorMap, 'weapon', w, 3, 5000);
        });

        var enemies = ['Troll', 'Zombie', 'Goblin', 'Vampire', 'Dwarf'];
        var healthItems = ['Potion', 'Mushroom', 'Soothing Lotion', 'Healing Spell'];

        var count = 0;
        var totalHeath = 0;
        do {
          var p = Math.floor(Math.random()*30 + 1)*10;
            if (_randomPlace(floorMap, 'health', {
            name: healthItems[Math.floor(Math.random()*healthItems.length)],
            power: p
          }, 3, 5000)) {
            totalHeath += p;
          }
          count++;
        }while(totalHeath < 2200 && count < 5000)

        for ( var i = 0; i < 20; i++)
          _randomPlace(floorMap, 'enemy', {
            name: enemies[Math.floor(Math.random()*enemies.length)],
            power: Math.floor(Math.random()*25 + 1)*10
          }, 3, 5000);

        return {
          inSight: this.getInSight(),
          dMode: true,
          info: this.whatsAround(pos.row, pos.col),
          health: this.gameStatus.player.health,
          weapon: this.gameStatus.player.weapon,
          attackMin : this.gameStatus.player.attackMin,
          attackMax : this.gameStatus.player.attackMax,
          level: this.gameStatus.player.currentLevel,
          toNext: this.gameStatus.player.toNextLevel,
          xp : this.gameStatus.player.xp
        };
      } else {
        throw(new Error('Unable to place base character'));
      }
    },
    getInSight: function() {
      var floorMap = this.gameStatus.matrix;
      var pRow = this.gameStatus.player.position.row;
      var pCol = this.gameStatus.player.position.col;

      var sideH = (this.props.dWidth-1)/2;
      if((pCol - sideH >= 0) && (pCol + sideH < floorMap[0].length)) {
        this.gameStatus.displayWindow.col = pCol - sideH;
      } else if (pCol - sideH < 0) {
        this.gameStatus.displayWindow.col = 0;
      } else {
        this.gameStatus.displayWindow.col = floorMap[0].length - this.props.dWidth;
      }

      var sideV = (this.props.dHeight-1)/2;
      if(pRow - sideV >= 0 && pRow + sideV < floorMap.length) {
        this.gameStatus.displayWindow.row = pRow - sideV;
      } else if (pRow - sideV < 0) {
        this.gameStatus.displayWindow.row = 0;
      } else {
        this.gameStatus.displayWindow.row = floorMap.length - this.props.dHeight;
      }
      var display = [];
        for(var i = this.gameStatus.displayWindow.row;
          i < this.gameStatus.displayWindow.row + this.props.dHeight; i++) {

          var dRow = [];
          for(var j = this.gameStatus.displayWindow.col;
            j < this.gameStatus.displayWindow.col + this.props.dWidth; j++) {

            dRow.push(floorMap[i][j]);
          }
          display.push(dRow);
        }
        return display;
    },
    getInitialState: function() {
      return this.initGame();
    },
    render: function () {
      return (
        <div id="app">
          <div id="head">
            <p id='icon'>>_</p>
            <p>terminal - em-ant@fcc: ~/the_dungeon_quest</p>
            <p id='winfn'>&#9472; &#9633; &#10005;</p>
          </div>
          <div id="appbody">
            <GameDisplay matrix={this.state.inSight} dark={this.state.dMode ? 'true' : 'false'}/>
            <div id="info">
              <p>> Welcome to the Shadow Lands, Knight... </p>
              <p>>
                Health [{this.state.health}],
                Weapon [{this.state.weapon} | {this.state.attackMin}/{this.state.attackMax}],
                XP [{this.state.xp}],
                Level [{this.state.level}],
                Next [{this.state.toNext} XP]</p>
              <p>> Darkness Mode {this.state.dMode ? '[on]' : '[off]'} - Press [d] to toggle.</p>
              <p>> {this.state.info}</p>
            </div>
          </div>
        </div>
      )
    }
});

ReactDOM.render(<App dWidth={55} dHeight={27}/>, document.getElementById('view'));

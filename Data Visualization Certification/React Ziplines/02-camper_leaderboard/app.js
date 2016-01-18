
/******* REACT JSX VERSION **********************

var baseUrl = 'http://fcctop100.herokuapp.com/api/fccusers/top/';

var UserEntry = React.createClass({
    render: function() {

      return (
        <tr >
          <td>{this.props.pos}</td>
          <td><img src={this.props.img}/></td>
          <td>
            <a href={"http://www.freecodecamp.com/"
              + this.props.username} target="_blank">{this.props.username}
            </a>
          </td>
          <td>{this.props.recent}</td>
          <td>{this.props.alltime}</td>
        </tr>
      );
    }
});

var DataTable = React.createClass({

  handleClick: function(where) {
    if(this.state.sortedBy) {
      if(where !== this.state.sortedBy){
        if(!this[where]){
          this.setState({sortedBy: ''});
          // get the JSON data only the first time it is displayed
          // data will be cached in this.recent and this.alltime
          $.getJSON(baseUrl + where,function(data){
            if(this.isMounted()){
              this[where] = data;
              this.setState({
                sortedBy: where
              });
            }
          }.bind(this))
        } else {

          // data is available, only change sort order
          this.setState({
            sortedBy: where
          });
        }
      }
    }
  },
  getInitialState: function() {
    return {
            sortedBy: ''
    };
  },
  componentDidMount: function() {
    $.getJSON(baseUrl + 'recent',function(data){
      if(this.isMounted()){

        // get the JSON data only the first time they are dislayed
        // data will be cached in this.recent and this.alltime
        this.recent = data;
        this.setState({sortedBy: 'recent'});
      }
    }.bind(this))
  },
  render: function () {
    var tableElems = [];
    var users = (this.state.sortedBy === 'recent') ? this.recent : this.alltime;

    // On the first render this.recent and this.alltime are both undefined
    // We need to render an **empty** table !
    if (users) {
      var user;
      for(var i = 0 ; i < users.length; i++){
        user = users[i];
        tableElems.push(<UserEntry pos={i+1} img={user.img} username={user.username} recent={user.recent} alltime={user.alltime}/>);
      }
    }

    return (
      <div>
        <table className="table table-striped table-bordered table-condensed text-center">
         <thead>
           <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Username</th>
              <th onClick={this.handleClick.bind(null,'recent')} className={this.state.sortedBy ? (this.state.sortedBy =='recent' ? 'clickable sortedby' : 'clickable') : ''}>Recent</th>
              <th onClick={this.handleClick.bind(null,'alltime')} className={this.state.sortedBy ? (this.state.sortedBy == 'recent' ? 'clickable' : 'clickable sortedby') : ''}>Alltime</th>
            </tr>
         </thead>
         <tbody>
         {tableElems}
         </tbody>
        </table>
        <p className={tableElems.length ? 'hidden' : 'info'}>Loading...</p>
      </div>
      )
    }
});

var App = React.createClass({
  render: function () {
  return (
    <div>
      <div className="header">
        <h1>Camper Leaderboard<br/><small>by <a href="http://www.freecodecamp.com/em-ant" target="_blank">em-ant</a> for freeCodeCamp</small></h1>
      </div>
      <div className="container">
        <DataTable/>
      </div>
    </div>
    )
  }
});

React.render(<App/>, document.getElementById('view'));


*************************************************
******** Compiled JS ES5 below ( Babel ) *******/

"use strict";

var baseUrl = 'http://fcctop100.herokuapp.com/api/fccusers/top/';

var UserEntry = React.createClass({
  displayName: "UserEntry",

  render: function render() {

    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        this.props.pos
      ),
      React.createElement(
        "td",
        null,
        React.createElement("img", { src: this.props.img })
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "a",
          { href: "http://www.freecodecamp.com/" + this.props.username, target: "_blank" },
          this.props.username
        )
      ),
      React.createElement(
        "td",
        null,
        this.props.recent
      ),
      React.createElement(
        "td",
        null,
        this.props.alltime
      )
    );
  }
});

var DataTable = React.createClass({
  displayName: "DataTable",

  handleClick: function handleClick(where) {
    if (this.state.sortedBy) {
      if (where !== this.state.sortedBy) {
        if (!this[where]) {
          this.setState({ sortedBy: '' });
          // get the JSON data only the first time it is displayed
          // data will be cached in this.recent and this.alltime
          $.getJSON(baseUrl + where, (function (data) {
            if (this.isMounted()) {
              this[where] = data;
              this.setState({
                sortedBy: where
              });
            }
          }).bind(this));
        } else {

          // data is available, only change sort order
          this.setState({
            sortedBy: where
          });
        }
      }
    }
  },
  getInitialState: function getInitialState() {
    return {
      sortedBy: ''
    };
  },
  componentDidMount: function componentDidMount() {
    $.getJSON(baseUrl + 'recent', (function (data) {
      if (this.isMounted()) {

        // get the JSON data only the first time they are dislayed
        // data will be cached in this.recent and this.alltime
        this.recent = data;
        this.setState({ sortedBy: 'recent' });
      }
    }).bind(this));
  },
  render: function render() {
    var tableElems = [];
    var users = this.state.sortedBy === 'recent' ? this.recent : this.alltime;

    // On the first render this.recent and this.alltime are both undefined
    // We need to render an **empty** table !
    if (users) {
      var user;
      for (var i = 0; i < users.length; i++) {
        user = users[i];
        tableElems.push(React.createElement(UserEntry, { pos: i + 1, img: user.img, username: user.username, recent: user.recent, alltime: user.alltime }));
      }
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "table",
        { className: "table table-striped table-bordered table-condensed text-center" },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              null,
              "#"
            ),
            React.createElement(
              "th",
              null,
              "Avatar"
            ),
            React.createElement(
              "th",
              null,
              "Username"
            ),
            React.createElement(
              "th",
              { onClick: this.handleClick.bind(null, 'recent'), className: this.state.sortedBy ? this.state.sortedBy == 'recent' ? 'clickable sortedby' : 'clickable' : '' },
              "Recent"
            ),
            React.createElement(
              "th",
              { onClick: this.handleClick.bind(null, 'alltime'), className: this.state.sortedBy ? this.state.sortedBy == 'recent' ? 'clickable' : 'clickable sortedby' : '' },
              "Alltime"
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          tableElems
        )
      ),
      React.createElement(
        "p",
        { className: tableElems.length ? 'hidden' : 'info' },
        "Loading..."
      )
    );
  }
});

var App = React.createClass({
  displayName: "App",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "header" },
        React.createElement(
          "h1",
          null,
          "Camper Leaderboard",
          React.createElement("br", null),
          React.createElement(
            "small",
            null,
            "by ",
            React.createElement(
              "a",
              { href: "http://www.freecodecamp.com/em-ant", target: "_blank" },
              "em-ant"
            ),
            " for freeCodeCamp"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(DataTable, null)
      )
    );
  }
});

React.render(React.createElement(App, null), document.getElementById('view'));

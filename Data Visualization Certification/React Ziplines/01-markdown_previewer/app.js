
/******* REACT JSX VERSION **********************

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

var parseMarkdown = function(text) {
  return {
    __html: marked(text)
  }
};


var Previewer = React.createClass({
  getInitialState: function() {
    return {
      text: "### Markdown Previewer\nfor [freeCodeCamp](http://www.freecodecamp.com)\n"
        + "___\n ** Hello **, *Markdown* !\n"
        + "```js\nconsole.log('hello, world');\n```\n"
        + "1. Hello\n * World"
    }
  },
  change: function(event) {
    this.setState({text: event.target.value})
  },
  render: function() {
    return (
      < div className="row">
            <div className="col-md-6">
              <textarea id="in"  onChange={this.change} defaultValue={this.state.text}/>
            </div>
            <div className="col-md-6">
              <div id="out" dangerouslySetInnerHTML={parseMarkdown(this.state.text)}/>
            </div>
      < /div>
    );
  }
});

React.render( < Previewer / > , document.getElementById("container"));



*************************************************
******** Compiled JS ES5 below ( Babel ) *******/

"use strict";

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

var parseMarkdown = function parseMarkdown(text) {
  return {
    __html: marked(text)
  };
};

var Previewer = React.createClass({
  displayName: "Previewer",

  getInitialState: function getInitialState() {
    return {
      text: "### Markdown Previewer\nfor [freeCodeCamp](http://www.freecodecamp.com)\n" + "___\n ** Hello **, *Markdown* !\n" + "```js\nconsole.log('hello, world');\n```\n" + "1. Hello\n * World"
    };
  },
  change: function change(event) {
    this.setState({ text: event.target.value });
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-md-6" },
        React.createElement("textarea", { id: "in", onChange: this.change, defaultValue: this.state.text })
      ),
      React.createElement(
        "div",
        { className: "col-md-6" },
        React.createElement("div", { id: "out", dangerouslySetInnerHTML: parseMarkdown(this.state.text) })
      )
    );
  }
});

React.render(React.createElement(Previewer, null), document.getElementById("container"));

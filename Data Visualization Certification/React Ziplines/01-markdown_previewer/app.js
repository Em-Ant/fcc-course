
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
      text: "### Markdown Previewer\nby [em-ant@freeCodeCamp](http://www.freecodecamp.com/em-ant)\n"
        + "___\n ** Hello **, *Markdown* !\n"
        + "```js\nconsole.log('hello, markdown');\n```\n"
        + "1. Hello\n * Markdown"
    }
  },
  change: function(event) {
    this.setState({text: event.target.value})
  },
  render: function() {
    return (
      <div className="container">
      < div className="row">
            <div className="col-md-6">
              <textarea id="in"  onChange={this.change} defaultValue={this.state.text}/>
            </div>
            <div className="col-md-6">
              <div id="out" dangerouslySetInnerHTML={parseMarkdown(this.state.text)}/>
            </div>
      < /div>
      </div>
    );
  }
});

React.render( < Previewer / > , document.getElementById("view"));


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
      text: "### Markdown Previewer\nby [em-ant@freeCodeCamp](http://www.freecodecamp.com/em-ant)\n" + "___\n ** Hello **, *Markdown* !\n" + "```js\nconsole.log('hello, markdown');\n```\n" + "1. Hello\n * Markdown"
    };
  },
  change: function change(event) {
    this.setState({ text: event.target.value });
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
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
      )
    );
  }
});

React.render(React.createElement(Previewer, null), document.getElementById("view"));

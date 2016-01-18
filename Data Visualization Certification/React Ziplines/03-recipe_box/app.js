
/** JSX **********************************************************************


var RecipeForm = React.createClass({
  getInitialState: function () {
    return {recipe: true, ingredients: true};
  },
  validate: function () {
    for (var field in this.state) {
      var obj = {};
      if (this.state[field]) {
        if (this.refs[field].value === '') {
          obj[field] = false;
          this.setState(obj);
        }
      } else {
        if (this.refs[field].value !== '') {
          obj[field] = true;
          this.setState(obj);
        }
      }
    }
  },
  getData: function () {
    if( this.state.recipe && this.state.ingredients) {
      // the form is valid
      return {
        recipe: this.refs.recipe.value,
        ingredients: this.refs.ingredients.value
      }
    } else {
      return null
    }
  },
  setData: function (obj) {
    this.refs.recipe.value = obj.recipe;
    this.refs.ingredients.value = obj.ingredients;
  },
  close: function () {

    // directly resetting the state when closing. No need to re-render !
    this.state = {recipe: true, ingredients: true};
    this.props.closefn();
  },
  render: function() {
    var classes = "recipe_add ";
    classes += (this.props.hide === 'true') ? 'hidden' : '';
    return (
      <div className="recipe_add" className={classes}>
        <div className="squared" onClick={this.close}><i className="fa fa-times"></i>
        </div>
        <input
          placeholder="Recipe Name"
          defaultValue={this.props.recipe}
          ref="recipe"
          onChange={this.validate}
          className = {this.state.recipe ? '' : 'invalid'}
        />
        <textarea
          placeholder="Ingredients &amp; Directions."
          defaultValue={this.props.ingredients}
          ref="ingredients"
          onChange={this.validate}
          className = {this.state.ingredients ? '' : 'invalid'}
        />
      </div>
    )
  }
});

var RecipeEntry = React.createClass({
  render: function() {
    return (
      <div className="listentry">
        <h3 className="entryname" onClick={this.props.editfn}>{this.props.text}</h3>
        <div className="squared" onClick={this.props.deletefn}><i className="fa fa-times"></i>
        </div>
      </div>
    );
  }
});

var RecipeList = React.createClass({
  render: function() {
    var classes = "recipe_list ";
    classes += (this.props.hide === 'true') ? 'hidden' : '';
    var entries = [];
    entries = this.props.recipes.map(function(el,ind){
      return <RecipeEntry
        text={el.recipe}
        key={ind}
        deletefn={this.props.removefn.bind(null,ind)}
        editfn={this.props.updatefn.bind(null,ind)}
        />
    }.bind(this))
    return (

      <div className={classes}>
      <h2>Recipe Box</h2>
        <div className="list_cont">
         <p className={(entries.length === 0) ? 'empty_info' : 'hidden empty_info'}>no recipes</p>
         {entries}
        </div>
      </div>
    );
  }
});

var Box = React.createClass({
  handleRemove: function(ind) {
    var data = this.state.data;
    data.splice(ind,1);
    localStorage.setItem("codepenRecipes",JSON.stringify(data));
    this.setState({data: data});
  },
  handleEdit: function (ind) {
    this.refs.form.setData(this.state.data[ind]);
    console.log(this.state.data[ind])
    this.editIndex = ind;
    this.setState({mode: 'edit'});

  },
  handleCancel: function () {
    this.setState({mode:'list'});
  },
  handleRoundButton: function () {
    if(this.state.mode === 'list') {
      this.refs.form.setData({recipe: 'New Recipe', ingredients: 'Ingredients here !!!'});
      this.editIndex = undefined;
      this.setState({mode: 'edit'});
    } else {
      if(this.editIndex !== undefined) {

        // Editing an old recipe
        var data = this.state.data;
        var recipe = this.refs.form.getData();
        if(recipe !== null) {
          data[this.editIndex] = recipe
          localStorage.setItem("codepenRecipes",JSON.stringify(data));
          this.setState({mode: 'list', data: data});
        }
      } else {

        // Adding a new recipe
        var newRecipe = this.refs.form.getData();
        if (newRecipe !== null) {
          var data = this.state.data;
          data.push(newRecipe);
          localStorage.setItem("codepenRecipes",JSON.stringify(data));
          this.setState({
            mode: 'list',
            data: data
          });
        }
      }
    }
  },
  getInitialState: function () {
    var altData = [
        {recipe: 'Pizza', ingredients: 'Flour, Water, Yeast, Salt,\r\nTomato Sauce, Mozzarella,\r\nOlive Oil'},
        {recipe: 'Spaghetti', ingredients: 'Spaghetti, Salted Boiling Water,\r\nTomatoes, Olive Oil, Garlic,\r\nRed Pepper'},
        {recipe: 'Meatballs', ingredients: 'Ground Beef, Breadcrumbs,\r\nEggs, Parmigiano Cheese,\r\nParsley, Olive Oil'},
      ];

    var stored = localStorage.getItem('codepenRecipes');
    var data = stored ? JSON.parse(stored) : altData;
    return {
      mode: 'list',
      data: data
    }
  },
  render: function () {
    var iconClass = (this.state.mode === 'list') ? "fa fa-plus" : "fa fa-floppy-o";
    return (
      <div className="thebox">
        <RecipeForm
          ref="form"
          recipe="New Recipe"
          ingredients="Form Demo !!!"
          save={this.handleClick}
          hide={this.state.mode === 'list' ? 'true' : null}
          closefn={this.handleCancel}
          dirtyfn={this.setFormDirty}
          />
        <RecipeList
          hide={this.state.mode === 'edit' ? 'true' : null}
          recipes={this.state.data}
          removefn={this.handleRemove}
          updatefn={this.handleEdit}
        />
        <div className="round" onClick={this.handleRoundButton}>
          <h1>
            <i className={iconClass}></i>
          </h1>
        </div>
      </div>
    );
  }
})
React.render(<Box/>,document.getElementById('view'));

*****************************************************************************/
/**** COMPILED JS ES5 (Babel) ***********************************************/

'use strict';

var RecipeForm = React.createClass({
  displayName: 'RecipeForm',

  getInitialState: function getInitialState() {
    return { recipe: true, ingredients: true };
  },
  validate: function validate() {
    for (var field in this.state) {
      var obj = {};
      if (this.state[field]) {
        if (this.refs[field].value === '') {
          obj[field] = false;
          this.setState(obj);
        }
      } else {
        if (this.refs[field].value !== '') {
          obj[field] = true;
          this.setState(obj);
        }
      }
    }
  },
  getData: function getData() {
    if (this.state.recipe && this.state.ingredients) {
      // the form is valid
      return {
        recipe: this.refs.recipe.value,
        ingredients: this.refs.ingredients.value
      };
    } else {
      return null;
    }
  },
  setData: function setData(obj) {
    this.refs.recipe.value = obj.recipe;
    this.refs.ingredients.value = obj.ingredients;
  },
  close: function close() {

    // directly resetting the state when closing. No need to re-render !
    this.state = { recipe: true, ingredients: true };
    this.props.closefn();
  },
  render: function render() {
    var classes = "recipe_add ";
    classes += this.props.hide === 'true' ? 'hidden' : '';
    return React.createElement(
      'div',
      { className: 'recipe_add', className: classes },
      React.createElement(
        'div',
        { className: 'squared', onClick: this.close },
        React.createElement('i', { className: 'fa fa-times' })
      ),
      React.createElement('input', {
        placeholder: 'Recipe Name',
        defaultValue: this.props.recipe,
        ref: 'recipe',
        onChange: this.validate,
        className: this.state.recipe ? '' : 'invalid'
      }),
      React.createElement('textarea', {
        placeholder: 'Ingredients & Directions.',
        defaultValue: this.props.ingredients,
        ref: 'ingredients',
        onChange: this.validate,
        className: this.state.ingredients ? '' : 'invalid'
      })
    );
  }
});

var RecipeEntry = React.createClass({
  displayName: 'RecipeEntry',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'listentry' },
      React.createElement(
        'h3',
        { className: 'entryname', onClick: this.props.editfn },
        this.props.text
      ),
      React.createElement(
        'div',
        { className: 'squared', onClick: this.props.deletefn },
        React.createElement('i', { className: 'fa fa-times' })
      )
    );
  }
});

var RecipeList = React.createClass({
  displayName: 'RecipeList',

  render: function render() {
    var classes = "recipe_list ";
    classes += this.props.hide === 'true' ? 'hidden' : '';
    var entries = [];
    entries = this.props.recipes.map((function (el, ind) {
      return React.createElement(RecipeEntry, {
        text: el.recipe,
        key: ind,
        deletefn: this.props.removefn.bind(null, ind),
        editfn: this.props.updatefn.bind(null, ind)
      });
    }).bind(this));
    return React.createElement(
      'div',
      { className: classes },
      React.createElement(
        'h2',
        null,
        'Recipe Box'
      ),
      React.createElement(
        'div',
        { className: 'list_cont' },
        React.createElement(
          'p',
          { className: entries.length === 0 ? 'empty_info' : 'hidden empty_info' },
          'no recipes'
        ),
        entries
      )
    );
  }
});

var Box = React.createClass({
  displayName: 'Box',

  handleRemove: function handleRemove(ind) {
    var data = this.state.data;
    data.splice(ind, 1);
    localStorage.setItem("codepenRecipes", JSON.stringify(data));
    this.setState({ data: data });
  },
  handleEdit: function handleEdit(ind) {
    this.refs.form.setData(this.state.data[ind]);
    console.log(this.state.data[ind]);
    this.editIndex = ind;
    this.setState({ mode: 'edit' });
  },
  handleCancel: function handleCancel() {
    this.setState({ mode: 'list' });
  },
  handleRoundButton: function handleRoundButton() {
    if (this.state.mode === 'list') {
      this.refs.form.setData({ recipe: 'New Recipe', ingredients: 'Ingredients here !!!' });
      this.editIndex = undefined;
      this.setState({ mode: 'edit' });
    } else {
      if (this.editIndex !== undefined) {

        // Editing an old recipe
        var data = this.state.data;
        var recipe = this.refs.form.getData();
        if (recipe !== null) {
          data[this.editIndex] = recipe;
          localStorage.setItem("codepenRecipes", JSON.stringify(data));
          this.setState({ mode: 'list', data: data });
        }
      } else {

        // Adding a new recipe
        var newRecipe = this.refs.form.getData();
        if (newRecipe !== null) {
          var data = this.state.data;
          data.push(newRecipe);
          localStorage.setItem("codepenRecipes", JSON.stringify(data));
          this.setState({
            mode: 'list',
            data: data
          });
        }
      }
    }
  },
  getInitialState: function getInitialState() {
    var altData = [{ recipe: 'Pizza', ingredients: 'Flour, Water, Yeast, Salt,\r\nTomato Sauce, Mozzarella,\r\nOlive Oil' }, { recipe: 'Spaghetti', ingredients: 'Spaghetti, Salted Boiling Water,\r\nTomatoes, Olive Oil, Garlic,\r\nRed Pepper' }, { recipe: 'Meatballs', ingredients: 'Ground Beef, Breadcrumbs,\r\nEggs, Parmigiano Cheese,\r\nParsley, Olive Oil' }];

    var stored = localStorage.getItem('codepenRecipes');
    var data = stored ? JSON.parse(stored) : altData;
    return {
      mode: 'list',
      data: data
    };
  },
  render: function render() {
    var iconClass = this.state.mode === 'list' ? "fa fa-plus" : "fa fa-floppy-o";
    return React.createElement(
      'div',
      { className: 'thebox' },
      React.createElement(RecipeForm, {
        ref: 'form',
        recipe: 'New Recipe',
        ingredients: 'Form Demo !!!',
        save: this.handleClick,
        hide: this.state.mode === 'list' ? 'true' : null,
        closefn: this.handleCancel,
        dirtyfn: this.setFormDirty
      }),
      React.createElement(RecipeList, {
        hide: this.state.mode === 'edit' ? 'true' : null,
        recipes: this.state.data,
        removefn: this.handleRemove,
        updatefn: this.handleEdit
      }),
      React.createElement(
        'div',
        { className: 'round', onClick: this.handleRoundButton },
        React.createElement(
          'h1',
          null,
          React.createElement('i', { className: iconClass })
        )
      )
    );
  }
});
React.render(React.createElement(Box, null), document.getElementById('view'));

import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

// First we import some modules...
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

// Common CSS
import './index.css';

// Pages
import Home from './pages/Home/Home';
import List from './pages/List/List';
import AddEditContact from './pages/add-edit-contact/add-edit-contact';

const App = props => (
  <div className="container-fluid">
    <header>
      <div className="wrapper">
        <Link to="/"><img src={require('./logo.png')}  /></Link>

        <Link className="add-contact__btn" to="/home">Home</Link>
        <Link className="add-contact__btn" to="/add-contact">Add Contact</Link>
      </div>
    </header>

    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={List} />
      <Route path="home" component={Home} />
      <Route path="add-contact" component={AddEditContact} />
      <Route path="edit-contact/:user_id" component={AddEditContact} />
    </Route>
  </Router>
), document.querySelector('.root-app'));

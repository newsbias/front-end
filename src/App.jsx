import _ from 'lodash';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducer from './redux/reducer';
import Header from './components/Header';
import Search from './components/Search';
import Sites from './components/Sites';
import Footer from './components/Footer';

class App extends React.Component {
  constructor() {
    super();
    this.store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <Header />
          <Search />
          <Sites />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;


import _ from 'lodash';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducer from './redux/reducer';
import HeaderComponent from './components/Header';
import SearchComponent from './components/Search';
import SelectorComponent from './components/Selector';
import SitesComponent from './components/Sites';
import FooterComponent from './components/Footer';

class App extends React.Component {
  constructor() {
    super();
    this.store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <HeaderComponent />
          <SearchComponent />
          <SelectorComponent />
          <SitesComponent />
          <FooterComponent />
        </div>
      </Provider>
    );
  }
}

export default App;


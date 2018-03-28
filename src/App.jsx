import _ from 'lodash';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducer from './redux/reducer';
import HeaderComponent from './components/Header';
import SearchComponent from './components/Search';
import WikiComponent from './components/Wiki';
import ResultsComponent from './components/Results';
import ModulComponent from './components/Modul';
import FooterComponent from './components/Footer';
import './style.scss';

class App extends React.Component {
  constructor() {
    super();
    this.store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="app">
          <HeaderComponent />
          <SearchComponent />
          <WikiComponent />
          <ResultsComponent />
          <ModulComponent />
          <FooterComponent />
        </div>
      </Provider>
    );
  }
}

export default App;


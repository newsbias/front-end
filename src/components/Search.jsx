import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search } from '../redux/actions';
import { filterQuery } from '../utils';
import './styles/search.scss';

const Search = props => (
  <div className="search">
    <input
      type="text"
      placeholder="search"
      onKeyDown={e => props.submit(e)}
    />
  </div>
);

Search.propTypes = {
  submit: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  submit: (e) => {
    if (e && e.keyCode === 13) {
      const q = filterQuery($('input').val());
      dispatch(search(q));
    }
  }
});

export default connect(null, mapDispatchToProps)(Search);

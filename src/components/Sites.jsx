import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Site from './Site';
import './styles/sites.scss';

const Sites = props => (
  <div className="site-list">{
    _.map(props.sites, site => (<Site key={site} id={site} />))
  }</div>
);

Sites.propTypes = {
  sites: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  sites: state.sites
});

export default connect(mapStateToProps, null)(Sites);

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkSite } from '../redux/actions';
import { SITE_NAME_CONFIG } from '../utils';
import './styles/selector.scss';

const Selector = props => (
  <div className="selector card">{
    _.map(props.sites, (enabled, site) => {
      const key = `selector-${site}`;
      const id = `checkbox-${site}`;
      return (
        <div key={key} className="selector-pair" >
          <input id={id} type="checkbox" checked={enabled} onChange={() => props.siteChange(site, !enabled)} />
          <label htmlFor={id}>{SITE_NAME_CONFIG(site)}</label>
        </div>
      );
    })
  }</div>
);

Selector.propTypes = {
  sites: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sites: state.sites
});

const mapDispatchToProps = dispatch => ({
  siteChange: (site, enabled) => dispatch(checkSite({
    [site]: enabled
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Selector);

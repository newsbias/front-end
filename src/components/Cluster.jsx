import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { modul } from '../redux/actions';
import './styles/cluster.scss';

const Cluster = props => (
  <div className="card cluster" onClick={() => props.showModul({ ...props, visible: true })} >
    <h3 className="card-title">{props.title}</h3>
    <img className="cluster-card-image" src={props.image_url} alt="image not found" />
    <p className="spacer"></p>
    <p className="article-count">produced from {props.articles.length} articles</p>
  </div>
);

Cluster.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  articles: PropTypes.array.isRequired,
  image_url: PropTypes.string.isRequired,
  showModul: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  showModul: (data) => dispatch(modul(data))
});

export default connect(null, mapDispatchToProps)(Cluster);

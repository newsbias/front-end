import React from 'react';
import PropTypes from 'prop-types';
import './styles/article.scss';

const Article = props => (
  <a href={props.url} className="article" target="_blank">
    <span className="source" id={props.url}>[ {props.source} ]</span> {props.title}
  </a>
);

Article.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Article;

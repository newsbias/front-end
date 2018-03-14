import React from 'react';
import PropTypes from 'prop-types';
import './styles/article.scss';

const Article = props => (
  <div className="pad card article" id={props.url}>
    <span className="source" id={props.url}>[ {props.source} ]</span> {props.title}
  </div>
);

Article.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Article;

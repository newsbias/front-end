import React from 'react';
import PropTypes from 'prop-types';
import './styles/article.scss';

const Article = props => {
  const source = props.url.split('/');
  return (
    <a href={props.url} className="article" target="_blank">
      <span className="source" id={props.url}>[ {source[2]} ]</span> {props.title}
    </a>
  );
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Article;

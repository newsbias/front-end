import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search } from '../redux/actions';
import ArticleComponent from './Article';

function expandCard(e) {
  console.log(e.target);
}

const Cluster = props => (
  <div className="margin card span cluster">

    <h2 className="pad card-title">{props.title}</h2>
    <p className="pad card-desc">{props.summary}</p>

    <div className="card-expand">{
      _.map(props.articles, (article, idx) => {
        return (
          <ArticleComponent
            key={`article-${idx}`}
            title={article.title}
            source={article.source}
            url={article.url}
          />
        )
      })
    }</div>

    <p className="spacer"></p>
    <p className="article-count">produced from {props.articles.length} articles</p>

  </div>
);

Cluster.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  articles: PropTypes.array.isRequired
};

export default Cluster;

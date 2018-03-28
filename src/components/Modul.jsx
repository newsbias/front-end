import $ from 'jquery';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { modul } from '../redux/actions';
import ArticleComponent from '../components/Article';
import './styles/modul.scss';

const Modul = props => {
  if (!props.visible) {
    return null;
  }

  $('body').css('overflow', 'hidden');

  return (
    <div className="modul">
      <button className="modul-button" onClick={() => props.hide()}>X</button>

      <div className="modul-content">
        <h3>{props.title}</h3>
        <img className="modul-image" src={props.image_url} alt="image not found" />
        <p className="modul-summary">{props.summary}</p>

        <p className="modul-article">articles used in cluster</p>
        <hr />
        {_.chain(props.articles)
          .sortBy(['source'])
          .map((article, idx) => {
            return (
              <ArticleComponent
                key={`article-${idx}`}
                title={article.title}
                source={article.source}
                url={article.url}
              />
            )
          })
          .value()
        }
      </div>
    </div>
  );
};

Modul.propTypes = {
  hide: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  visible: state.modul.visible,
  title: state.modul.title,
  summary: state.modul.summary,
  image_url: state.modul.image_url,
  articles: state.modul.articles
});

const mapDispatchToProps = dispatch => ({
  hide: () => {
    $('body').css('overflow', 'scroll');
    dispatch(modul({ visible: false }))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Modul);

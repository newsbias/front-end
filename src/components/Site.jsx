import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import sentiment from 'sentiment';
import { API_KEY, URL, GRAPH_CONFIG, DATASET_CONFIG } from '../utils';
import './styles/site.scss';


class Site extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      query: null,
      overall: null,
      data: null,
      page: 1,
      error: false
    };
    this.getData = this.getData.bind(this);
    this.parseData = this.parseData.bind(this);
  }


  /**
   * update state with new props
   * @param { object } nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.query !== nextProps.query) {
      this.state.query = nextProps.query;
      this.state.error = false;
      this.state.overall = null;
      this.getData();
    }
  }


  /**
   * make get request to newsapi.org
   */
  getData() {
    if (!_.isEmpty(this.state.query)) {
      const query = `?apiKey=${API_KEY}&sources=${this.state.id}&q=${this.state.query}&page=${this.state.page}`;
      axios.get(URL + query)
        .then(resp => this.parseData(resp.data))
        .catch(() => this.setState({ data: null, error: true }));
    }
  }


  /**
   * parse data for chart.js
   * @param { object } resp
   */
  parseData(resp) {
    const articles = _.sortBy(resp.articles, 'publishedAt');
    const labels = _.map(articles, article => (article.publishedAt.substring(0, article.publishedAt.indexOf('T'))));
    const d = _.map(articles, (article) => {
      const t = article.title || '';
      const a = article.description || '';
      return (sentiment(t).score + sentiment(a).score) / 2;
    });
    const overall = _.mean(d) >= 0 ? 'positive' : 'negative';
    const data = {
      labels,
      datasets: [{ ...DATASET_CONFIG, data: d }]
    };
    this.setState({ overall, data });
  }


  /**
   * render component
   */
  render() {
    return (
      <div className="site">
        <h2>{this.state.id.replace(/-/g, ' ')}</h2>

        { this.state.overall
          ? <div>{this.state.overall} sentiment in general
              <span className="result-count">({this.state.data.datasets[0].data.length} results)</span>
            </div>
          : null
        }
        { this.state.data
          ? <div className="site-content"><Line data={this.state.data} options={GRAPH_CONFIG} /></div>
          : null
        }
        { this.state.error
          ? <div className="site-content"><p>error</p></div>
          : null
        }
      </div>
    );
  }
}


/**
 * prop types
 */
Site.propTypes = {
  id: PropTypes.string.isRequired,
  query: PropTypes.string
};

const mapStateToProps = state => ({
  query: state.query
});

export default connect(mapStateToProps, null)(Site);

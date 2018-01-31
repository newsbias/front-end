import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import sentiment from 'sentiment';
import { API_KEY, URL, GRAPH_CONFIG, DATASET_CONFIG, SITE_NAME_CONFIG } from '../utils';
import './styles/site.scss';


class Site extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      query: null,
      articles: [],
      overall: null,
      data: null,
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
      this.resetState();
      this.state.query = nextProps.query;
      this.getData();
    }
  }


  /**
   * make get request to newsapi.org
   */
  getData() {
    const page = Math.ceil(this.state.articles.length / 20) + 1;
    if (!_.isEmpty(this.state.query)) {
      const query = `?apiKey=${API_KEY}&sources=${this.state.id}&q=${this.state.query}&page=${page}`;
      axios.get(URL + query)
        .then((resp) => {
          console.log(this.state.id, resp);
          this.setState({ articles: this.state.articles.concat(resp.data.articles) });
          this.parseData();
        })
        .catch((error) => {
          console.log(this.state.id, error);
          this.resetState();
          this.setState({ error: true });
        });
    }
  }


  /**
   * reset state
   */
  resetState() {
    this.setState({
      articles: [],
      overall: null,
      data: null,
      error: false
    });
  }


  /**
   * parse data for chart.js
   */
  parseData() {
    const articles = _.sortBy(this.state.articles, 'publishedAt');
    const labels = _.map(articles, article => (article.publishedAt.substring(0, article.publishedAt.indexOf('T'))));
    const d = _.map(articles, (article) => {
      const t = article.title || '';
      const a = article.description || '';
      return (sentiment(t).score + sentiment(a).score) / 10; // 2 for average, 5 to normalize
    });
    const overall = _.mean(d) >= 0 ? 'positive' : 'negative';
    const data = {
      labels,
      datasets: [{ ...DATASET_CONFIG, data: d }]
    };
    this.setState({ overall, data });
  }


  /**
   * load more data
   */
  loadMore() {
    const len = this.state.articles.length;
    if (len % 20 === 0) {
      this.getData();
    }
  }

  /**
   * render component
   */
  render() {
    return (
      <div className="site card" onClick={() => this.loadMore()}>
        <h2 className={`${this.state.overall}`}>{SITE_NAME_CONFIG(this.state.id)}</h2>

        { !_.isEmpty(this.state.articles)
          ? <span className="result-count">{this.state.articles.length} results</span>
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

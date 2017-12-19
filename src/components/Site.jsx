import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import sentiment from 'sentiment';
import './styles/site.scss';


const API_KEY = 'a7dd13e58ca742a2a6b0a54817dae216';


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
      const url = 'https://newsapi.org/v2/everything';
      const query = `?apiKey=${API_KEY}&sources=${this.state.id}&q=${this.state.query}&page=${this.state.page}`;
      axios.get(url + query)
        .then(resp => this.parseData(resp.data))
        .catch(() => this.setState({ data: null, error: true }));
    }
  }


  /**
   * @returns { object } Line config
   */
  getConfig() {
    return {
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: () => null
        }
      }
    };
  }


  /**
   * parse data for chart.js
   * @param { object } resp
   */
  parseData(resp) {
    const labels = _.map(resp.articles, article => (article.publishedAt.substring(0, article.publishedAt.indexOf('T'))));
    const data = _.map(resp.articles, article => (
      (sentiment(article.title).score + sentiment(article.description).score)) / 2
    );
    const overall = _.mean(data) >= 0 ? 'positive' : 'negative';
    const d = {
      labels,
      datasets: [{
        label: 'description',
        fill: false,
        lineTension: 0.1,
        pointBorderColor: 'black',
        pointBackgroundColor: 'black',
        pointHoverRadius: 5,
        pointRadius: 2,
        pointHitRadius: 10,
        backgroundColor: '#64DD17',
        borderColor: '#64DD17',
        data
      }]
    };
    this.setState({
      overall,
      data: d
    });
  }


  /**
   * render component
   */
  render() {
    const config = this.getConfig();
    return (
      <div className="site">
        <h2>{this.state.id.replace(/-/g, ' ')}</h2>

        { this.state.overall
          ? <p>{this.state.overall} sentiment in general</p>
          : null
        }
        { this.state.data
          ? <div className="site-content"><Line data={this.state.data} options={config} /></div>
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

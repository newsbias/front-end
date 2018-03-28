import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import ClusterComponent from './Cluster';
import LoadingComponent from './Loading';
import { resultsUrl } from '../utils';


class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query,
      data: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.query) && nextProps.query !== this.state.query) {
      this.setState({ ...nextProps, data: null });
      axios.get(resultsUrl + nextProps.query)
        .then((resp) => {
          console.log(resp);
          this.setState({ data: resp });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ data: err });
        });
    }
  }

  render() {
    if (_.isEmpty(this.state.query)) {
      return null;
    }

    const header = <h2>search results</h2>;
    let subtitle = null;
    let content = null;

    // loading screen
    if (_.isEmpty(this.state.data)) {
      content = <LoadingComponent />;
    }
    // error in data
    else if (_.isEmpty(this.state.data.data)) {
      content = <div className="error">error fetching data :(</div>;
    }

    else {
      subtitle = <p className="subtitle">constructed {this.state.data.data.length} topic clusters</p>;
      content =
        <div className="grid">{
          _.map(DonaldTrump.data, (cluster, idx) => {
            return (
              <ClusterComponent
                key={`cluster-${idx}`}
                title={cluster.title}
                image_url={cluster.image_url}
                summary={cluster.summary}
                articles={cluster.articles}
              />
            )
          })
        }</div>
    }

    return (
      <div>
        {header}
        {subtitle}
        {content}
      </div>
    );
  }
};

Results.propTypes = {
  query: PropTypes.string
};

const mapStateToProps = state => ({
  query: state.query
});

export default connect(mapStateToProps, null)(Results);

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
      data: null,
      err: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.query) && nextProps.query !== this.state.query) {
      this.setState({ ...nextProps, data: null, err: null });
      console.log(nextProps.query);
      axios.get(resultsUrl, {
        params: {
          q: nextProps.query
        }
      })
        .then((resp) => {
          this.setState({ data: resp.data });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ err });
        });
    }
  }

  render() {
    console.log(this.state);
    if (_.isEmpty(this.state.query)) {
      return null;
    }

    const header = <h2>search results</h2>;
    let subtitle = null;
    let content = null;

    // loading screen
    if (!_.isEmpty(this.state.err)) {
      content = <div className="error">error fetching results</div>;
    }
    // loading
    else if (this.state.data === null) {
      content = <LoadingComponent />;
    }
    // error in data
    else if (_.isEmpty(this.state.data)) {
      content = <div className="error">no results found</div>;
    }

    else {
      subtitle = <p className="subtitle">constructed {this.state.data.length} topic clusters</p>;
      content =
        <div className="grid">{
          _.map(this.state.data, (cluster, idx) => {
            return (
              <ClusterComponent
                key={`cluster-${idx}`}
                title={cluster.keywords}
                // image_url={cluster.image_url}
                // summary={cluster.text}
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

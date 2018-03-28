import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { wikiUrl } from '../utils';
import LoadingComponent from './Loading';
import './styles/wiki.scss';


class Wiki extends React.Component {
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
      axios.get(wikiUrl, {
        params: {
          q: nextProps.query
        }
      })
        .then((resp) => {
          this.setState({ data: resp.data });
        })
        .catch((err) => {
          this.setState({ err });
        });
    }
  }

  render() {
    if (_.isEmpty(this.state.query)) {
      return null;
    }

    const header = <h2>background information</h2>;
    let content = null;

    // loading screen
    if (!_.isEmpty(this.state.err)) {
      content = <div className="error">error fetching background information</div>;
    }
    // loading
    else if (_.isEmpty(this.state.data)) {
      content = <LoadingComponent />;
    }
    // no data
    else if (!this.state.data.found) {
      content = <div className="error">no background information found</div>;
    }
    // valid data
    else {
      content =
        <div className="card">
          <h3 className="card-title">{this.state.data.title}</h3>
          <img src={this.state.data.image} className="wiki-card-image" alt="no image found" />
          <p className="card-summary">{this.state.data.summary}</p>
        </div>;
    }

    // resp data
    return (
      <div>
        {header}
        {content}
      </div>
    );
  }
};

Wiki.propTypes = {
  query: PropTypes.string
};

const mapStateToProps = state => ({
  query: state.query
});

export default connect(mapStateToProps, null)(Wiki);

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
      data: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.query) && nextProps.query !== this.state.query) {
      this.setState({ ...nextProps, data: null });
      axios.get(wikiUrl + nextProps.query)
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

    const header = <h2>background information</h2>;
    let content = null;

    // loading screen
    if (_.isEmpty(this.state.data)) {
      content = <LoadingComponent />;
    }
    // no data
    else if (!this.state.data.found) {
      content = <div className="error">no background data found :(</div>;
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

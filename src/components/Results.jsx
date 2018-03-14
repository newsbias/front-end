import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import ClusterComponent from './Cluster';


import fixture1 from '../fixtures/fixture1.json';
import DonaldTrump from '../fixtures/DonaldTrump.json';



const Results = props => {
  const url = 'https://s3.us-east-2.amazonaws.com/summarized-article-samples/output.json?versionid=null';
  // axios.get(url, {
  //   headers: {'Access-Control-Allow-Origin': '*'}
  // })
  //   .then((resp) => {
  //     console.log(resp);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return (
    <div>
      <p className="result-count">constructed {DonaldTrump.data.length} topic clusters</p>
      <div className="grid">{
        _.map(DonaldTrump.data, (cluster, idx) => {
          return (
            <ClusterComponent
              key={`cluster-${idx}`}
              title={cluster.title}
              summary={cluster.summary}
              articles={cluster.articles}
            />
          )
        })
      }</div>
    </div>
  );
};

Results.propTypes = {
  sites: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sites: state.sites
});

export default connect(mapStateToProps, null)(Results);

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "dva";
import Register from "../auth";
import MessagePlace from "../messagePlace";

@connect(({globalModel}) => ({globalModel}))
class Cabinet extends Component {
  render() {
    const {globalModel}=this.props
    const {user}=globalModel
    return (
      <div>
        {user==null?<Register/>:<MessagePlace/>}

      </div>
    );
  }
}

Cabinet.propTypes = {};

export default Cabinet;

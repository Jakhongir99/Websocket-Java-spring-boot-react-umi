import React, {Component} from 'react';
import {AvField, AvForm} from "availity-reactstrap-validation"
import {Row, Col, Container, Button} from "reactstrap"
import {connect} from "dva";
import SockJsClient from "react-stomp"
import {URL} from '../constants/constants'

@connect(({globalModel}) => ({globalModel}))
class Register extends Component {
  render() {
    const {globalModel,dispatch}=this.props
    const register=(e,v)=>{
      this.props.dispatch({
        type: 'globalModel/register',
        payload: v
      })
    }
    const getUser=(msg)=>{
      console.log(msg);
      dispatch({
        type:"globalModel/updateState",
        payload:{
          user:msg
        }

      })
    }
    return (
      <div>
        <SockJsClient url={URL+'/websocket'} topics={['/topics']}
                      onMessage={getUser}
                      ref={ (client) => { this.clientRef = client }}
        debug={false}
        />
        <Container>
          <AvForm onValidSubmit={register}>
            <Row>
              <AvField name="name" label="Name " placeholder="Enter your name" />
            </Row>
            <Row>
              <Button>Submit</Button>
            </Row>
          </AvForm>
        </Container>
      </div>
    );
  }
}

Register.propTypes = {};

export default Register;

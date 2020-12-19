import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "dva";
import {AvField, AvForm} from "availity-reactstrap-validation"
import {Row, Col, Container, Button} from "reactstrap"
import SockJsClient from "react-stomp";
import {URL} from "../constants/constants"

@connect(({globalModel}) => ({globalModel}))
class MessagePlace extends Component {
  render() {
    const {globalModel,dispatch}=this.props;
    const {user,msg}=globalModel;
    const addMessage=(e,v)=>{
      this.props.dispatch({
        type: 'globalModel/addMessage',
        payload: {
          user:user,
         ...v
        }
      })
    }
    const  getMessages=(msg)=>{
      console.log(msg);
      dispatch({
        type:"globalModel/updateState",
        payload:{
          msg:msg
        }

      })
    }
    return (
      <div>
        <SockJsClient url={URL+'/websocket'} topics={['/message']}
                      onMessage={getMessages}
                      ref={ (client) => { this.clientRef = client }}
                      debug={false}/>
        <Container>
          <h3>{user.name}</h3>
          <AvForm onValidSubmit={addMessage}>
            <Row>
              <AvField name='messageContent'/>
            </Row>
            <Row>
              <Button>submit</Button>
            </Row>
          </AvForm>
          {msg==null?'':msg.map((item,i)=>
            <Row key={item.id}>
              <h3>{item.user.name} : {item.messageContent}</h3>
            </Row>
          )}
        </Container>
      </div>
    );
  }
}

MessagePlace.propTypes = {};

export default MessagePlace;

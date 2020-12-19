import {addMessage, addRegister} from "../pages/service";

export default ({
  namespace: 'globalModel',
  state: {
    user:null,
    msg:null
  },
  subscriptions: {},
  effects: {
    * register({payload},{call,put}){
      yield call(addRegister,payload)
    },
    * addMessage({payload},{call,put}){
      yield call(addMessage,payload)
    }
  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
});

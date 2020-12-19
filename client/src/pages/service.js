import axios from "axios"
import {URL} from "./constants/constants"
export function addRegister(data) {
   axios.post(URL+'/user',data)
}
export function addMessage(data) {
  axios.post(URL+'/message',data)
}

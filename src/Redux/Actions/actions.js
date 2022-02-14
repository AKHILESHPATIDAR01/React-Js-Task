import { FETCH_DATA } from '../Types/types.js';
import axios from 'axios';
export const editData = (data) => {
    return {
        type: FETCH_DATA, 
        data: data
    };
};
export const deleteData = (data) => {
    return {
       type: FETCH_DATA, 
       data: data
    };
};

export function fetchData() {
    return function(dispatch) {
      return axios.get("https://reqres.in/api/users?page=1")
        .then(({ data }) => {
        dispatch({
            type: FETCH_DATA,
            data: data.data
        });
      });
    };
  }

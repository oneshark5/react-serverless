import { SET_MODE } from '../constant';

const initState = 0;

export default function addReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case SET_MODE:
      return data;
    default:
      return preState;
  }
}

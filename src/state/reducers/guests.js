import {
  GET_GROUP,
  ADD_GUEST_SUCCESS,
  ADD_GUEST_FAILURE,
  ADD_GUEST_RESET,
  EDIT_GUEST_SUCCESS,
  EDIT_GUEST_FAILURE,
  EDIT_GUEST_RESET,
  DELETE_GUEST_SUCCESS,
  DELETE_GUEST_FAILURE,
  DELETE_GUEST_RESET
} from '../actions/guests';

let initial = {
  group: {},
  addGuestError: false,
  editGuestError: false,
  deleteGuestError: false
};

export default (state = initial, action) => {
  switch (action.type) {
    case GET_GROUP:
      return {...state, group: action.payload};
    case ADD_GUEST_SUCCESS:
      return {...state, group: action.payload, addGuestError: false};
    case ADD_GUEST_FAILURE:
      return {...state, addGuestError: true};
    case ADD_GUEST_RESET:
      return {...state, addGuestError: false};
    case EDIT_GUEST_SUCCESS:
      return {...state, group: action.payload, editGuestError: false};
    case EDIT_GUEST_FAILURE:
      return {...state, editGuestError: true};
    case EDIT_GUEST_RESET:
      return {...state, editGuestError: false};
    case DELETE_GUEST_SUCCESS:
      return {...state, group: action.payload, deleteGuestError: false};
    case DELETE_GUEST_FAILURE:
      return {...state, deleteGuestError: true};
    case DELETE_GUEST_RESET:
      return {...state, deleteGuestError: false};    
    default:
      return state;
  }
};
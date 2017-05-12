import {
  POLLS_DATA_REQUEST,
  POLLS_DATA_SUCCESS,
  POLLS_DATA_FAILTURE
} from '../const';

const initialState = {
  isRequesting: false,
  isSuccess: false,
  statusText: "",
  polls: [{
    owner: {
      profile: {
        firstName: '',
        lastName: ''
      }
    },
    titile: "",
    options: [{
      name: "",
      votes: 0
    }],
    date: null
  }]
};

export default function (state = initialState, action) {
  switch (action.type){
    case POLLS_DATA_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isSuccess: false,
        statusText: "Requesting polls..."
      });

    case POLLS_DATA_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: true,
        polls: action.payload.data,
        statusText: 'Request successfull'
      });

    case POLLS_DATA_FAILTURE:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: false,
        statusText: `Error while requesting data: ${action.payload.status} ${action.payload.statusText}`
      });

    default:
      return state;
  }
}

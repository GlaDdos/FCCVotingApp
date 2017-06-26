import {
  POLLS_DATA_REQUEST,
  POLLS_DATA_SUCCESS,
  POLLS_DATA_FAILTURE,

  DISMISS_ERROR
} from '../const';

const initialState = {
  isRequesting: false,
  isSuccess: false,
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
  }],
  error: {
    isError: false,
    status: '',
    statusText: ''
  }
};

export default function (state = initialState, action) {
  switch (action.type){
    case POLLS_DATA_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isSuccess: false,
        error: {
          isError: false
        }

      });

    case POLLS_DATA_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: true,
        polls: action.payload.data,
        error: {
          isError: false
        }
      });

    case POLLS_DATA_FAILTURE:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: false,
        error: {
          isError: true,
          status: `${action.payload.status}`,
          statusText: `${action.payload.statusText}`
        }
      });

    case DISMISS_ERROR:
      return Object.assign({}, state, {
          error: {
              isError: false,
              status: '',
              statusText: ''
          }
      });


    default:
      return state;
  }
}

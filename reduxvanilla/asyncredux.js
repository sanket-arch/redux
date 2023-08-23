const redux = require("redux");
const reduxThunk = require("redux-thunk").default;
const axios = require("axios");
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;

const intialState = {
  loading: false,
  users: [],
  error: "",
};

//actions
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

//action creators
const fetchusersrequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const fetchusersuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};
const fetchuserfailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};


const reducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchusersrequest);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user)=>{return user.id});
        dispatch(fetchusersuccess(users));
      })
      .catch((error) => {
        dispatch(fetchuserfailure(error));
      });
  };
};

const store = createStore(reducer, applyMiddleware(reduxThunk));

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUser());

const redux = require("redux");
const reduxLogger = require("redux-logger");

//using middleware to extend the functionality
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

//for combining multiple reducer
const combineReducer = redux.combineReducers;
//creating a store
const createStore = redux.legacy_createStore;

//creating a action
//action is object which contain type of action we want to implement
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";
//action creator is just function which retun a action
function buycake() {
  return {
    type: BUY_CAKE,
  };
}

function buyicecream() {
  return {
    type: BUY_ICECREAM,
  };
}
//intial state
const initialCakeState = {
  numberOfCake: 10,
};

const initialIcecreamState = {
  numberOfIcecream: 20,
};

//reducer(prevState,action)
//state is not mutated only the new state will be returned.
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCake: state.numberOfCake - 1,
      };
    default:
      return state;
  }
};

const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIcecream: state.numberOfIcecream - 1,
      };
    default:
      return state;
  }
};

//root reducer will be passed to the create store to let reducer know what are all reducer it need to watch
const rootreducer = combineReducer({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

//using the create store method of redux we create a store
const store = createStore(rootreducer, applyMiddleware(logger));

//getState() method expose us to use the current state
console.log(store.getState());

//subscribe to the store and it return a function which can be used to unscribe from the store
//anytime a store get updated, it call a callback funtion
const unSubscribe = store.subscribe(() => {});

//dispatch method from the store object is used to dispatch any action we want.
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buyicecream());

//once all the work is finished we can unsubcribe the application from the store
unSubscribe();

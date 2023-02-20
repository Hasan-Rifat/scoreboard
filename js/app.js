const { createStore } = Redux;

//global items
const allMatches = document.querySelector(".all-matches");
const addMatch = document.querySelector(".lws-addMatch");

// single item
const deleteBtn = document.querySelector(".lws-delete").innerText;
const incrementForm = document.querySelector(".incrementForm");
const decrementForm = document.querySelector(".decrementForm");
const initialValue = document.querySelector(".lws-singleResult");

// initialState
const initialState = {
  value: 120, //Math.floor(Math.random() * 120),
  match: [],
};

// action
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const MATCH = "MATCH";

//action creator
const increment = (value) => {
  return {
    type: INCREMENT,
    payload: value,
  };
};

const decrement = (value) => {
  return {
    type: DECREMENT,
    payload: value,
  };
};

const match = (match) => {
  return {
    type: MATCH,
    payload: match,
  };
};

//reducer
const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + action.payload,
      };
    case DECREMENT:
      return {
        ...state,
        value: state.value - action.payload,
      };
    case MATCH:
      return {
        ...state,
        match: [...state.match, action.payload],
      };

    default:
      return state;
  }
};

//store
const store = createStore(matchReducer);

store.subscribe(() => {
  console.log(store.getState().value);
  initialValue.innerText = store.getState().value;
});

// increment Form
incrementForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.increment.value);
  store.dispatch(increment(parseInt(e.target.increment.value)));
  e.target.reset();
});

// decrement Form
decrementForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.decrement.value);
  store.dispatch(decrement(parseInt(e.target.decrement.value)));
  e.target.reset();
});

// match items
addMatch.addEventListener("click", () => {
  allMatches.innerHTML += `<div class="match">
  <div class="wrapper">
    <button class="lws-delete">
      <img src="./image/delete.svg" alt="" />
    </button>
    <h3 class="lws-matchName">Match 1</h3>
  </div>
  <div class="inc-dec">
    <form class="incrementForm">
      <h4>Increment</h4>
      <input type="number" name="increment" class="lws-increment" />
    </form>
    <form class="decrementForm">
      <h4>Decrement</h4>
      <input type="number" name="decrement" class="lws-decrement" />
    </form>
  </div>
  <div class="numbers">
    <h2 class="lws-singleResult">${store.getState().value}</h2>
  </div>
</div>;`;
});

const ResetButton = document.querySelector('.lws-reset')
const AddMatchButton = document.querySelector('.lws-addMatch')
const perentMatch = document.querySelector('.all-matches')



const information = {
    INCREMENT:'INCREMENT',
    DECREMENT:'DECREMENT',
    RESET:'RESET',
    ADDMATCH:'ADDMATCH'
}

// initial state 
const initialState = {
    score:[
        {
            value:0
        }
    ]
}

// action 
const incrementAction = (value)=>{
    return{
        type:information.INCREMENT,
        payload:value
    }
} 
const decrementAction = (value)=>{
    return{
        type:information.DECREMENT,
        payload:value
    }
} 
const addMatchAction = ()=>{
    return{
        type:information.ADDMATCH
    }
} 
const resetAction = ()=>{
    return{
        type:information.RESET
    }
} 

// Reducers 
const counterReducers = (state=initialState,action)=>{
    if(action.type === information.INCREMENT){
        return{
            ...state,
            ...state.score[action.payload.index].value = state.score[action.payload.index].value + action.payload.value
        }
    }
    else if(action.type === information.DECREMENT){
        if(state.score[action.payload.index].value -action.payload.value <0 ){
           return {...state,
            ...state.score[action.payload.index].value = 0}
        }
        return{
            ...state,
            ...state.score[action.payload.index].value = state.score[action.payload.index].value - action.payload.value
            
        }
    }
    else if(action.type === information.ADDMATCH){
        return{
            ...state,
            ...state.score.push({value:0})
        }
    }
    else if(action.type === information.RESET){
        return{
            ...state,
            ...state.score.map((singleArray)=> singleArray.value = 0)
        }
    }
    else{
        return state
    }

}

function mySubmitFunction(event){
    event.preventDeafult()
}

const formIncrement = (evnet,index)=>{
    evnet.preventDefault();
    
    let passIndex = {
        index:index,
        value:event.currentTarget.children[1].value * 1

    }
    store.dispatch(incrementAction(passIndex))
}
const formDecrement = (evnet,index)=>{
    evnet.preventDefault();
    
    let passIndex = {
        index:index,
        value:event.currentTarget.children[1].value * 1

    }
    store.dispatch(decrementAction(passIndex))
    
}



// store 
const store = Redux.createStore(counterReducers)
const render= ()=>{
    
    const state = store.getState()
    console.log(state)
    let info = ''
    state.score.forEach((element,index) => {
        info +=`
        <div class="match">
        <div class="wrapper">
            <button class="lws-delete">
                <img src="./image/delete.svg" alt="" />
            </button>
            <h3 class="lws-matchName">Match ${index + 1}</h3>
        </div>
        <div class="inc-dec">
            <form class="incrementForm" onSubmit={formIncrement(event,${index})}>
                <h4>Increment</h4>
                <input
                    type="number"
                    name="increment"
                    class="lws-increment"
                />
            </form>
            <form class="decrementForm" onSubmit={formDecrement(event,${index})}>
                <h4>Decrement</h4>
                <input
                    type="number"
                    name="decrement"
                    class="lws-decrement"
                  
                />
            </form>
        </div>
        <div class="numbers">
            <h2 class="lws-singleResult" id="customValue">${element.value}</h2>
        </div>
    </div>
        `
    
    });
    perentMatch.innerHTML = info 
}

render()

store.subscribe(render)


AddMatchButton.addEventListener('click',()=>{
    store.dispatch(addMatchAction())
    
})



ResetButton.addEventListener('click',()=>{
    store.dispatch(resetAction())
})
































const redux=require('redux')

//defining action as an object with "type" property
const CAKE_ORDERED = 'CAKE_ORDERED'

function OrderCake(){//function called action creator, returns an action object
    return {
        type: CAKE_ORDERED,
        quantity:1
    }
}


//reducer work
//(prevstate,action )=>newState

const initialState={
    numOfCakes:10
}

const reducer =(state=initialState,action)=>{
     switch(action.type){
        case 'CAKE_ORDERED':
            return{//copy intial state, then include changes using spread op
                ...state,
                numOfCakes:state.numOfCakes-1
            }
        default:
            return state
     }

}

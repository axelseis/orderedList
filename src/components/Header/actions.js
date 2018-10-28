import { dispatchAction } from "../../lib/store.js";

export const actions = {
    SET_FILTER: 'SET_FILTER'
}

export function setFilterSelected(filterId,asc=false) {
    dispatchAction(actions.SET_FILTER, {
        filterId,
        asc
    })
}

export const reducers = {
    [actions.SET_FILTER]: setOrderFilter
}

function setOrderFilter(state, payload) {
    const {filterId} = {...payload};
    const filters = [...state.filters];

    const filterSel = filters.find(filter => filter.id === filterId);
    filterSel.asc = !filterSel.asc;

    const compare = (user1,user2) => {
        let response = 0;

        if(filterSel.asc) {
            response = user1[filterId] > user2[filterId] ? 1 : -1 
        }
        else {
            response = user1[filterId] < user2[filterId] ? 1 : -1
        }
        return response;
    }

    const order = Object.values(state.users).sort(compare).map(user => user.UserId);
    
    return ({
        ...state,
        filters,
        order,
        filterSelected: filterId
    })
}

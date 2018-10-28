import { dispatchAction } from "../../lib/store.js";

export const actions = {
    SET_ORDER_FILTER: 'SET_ORDER_FILTER',
    SET_DATE_FILTER: 'SET_DATE_FILTER'
}

export function sortByOrder(orderId, asc = false) {
    dispatchAction(actions.SET_ORDER_FILTER, {
        orderId,
        asc
    })
}

export function filterByDate(dateIn, dateOut) {
    dispatchAction(actions.SET_DATE_FILTER, {
        dateIn,
        dateOut
    })
}

export const reducers = {
    [actions.SET_ORDER_FILTER]: setOrderFilter,
    [actions.SET_DATE_FILTER]: setDateFilter
}

function setDateFilter(state, payload) {
    const {dateIn=0, dateOut} = {...payload};
    const {order,initialOrder=order,users} = {...state};

    const filteredOrder = initialOrder.filter(UserId => {
        const userDate = users[UserId].EmployeeStartDate;
        const isIn = (!dateIn || (dateIn && userDate > dateIn)) && (!dateOut || (dateOut && userDate < dateOut))
        return isIn;
    },[]);
    
    return ({
        ...state,
        initialOrder,
        order: filteredOrder,
        filters: {
            ...state.filters,
            dateIn,
            dateOut
        }
    })
}

function setOrderFilter(state, payload) {
    const { orderId } = { ...payload };
    const filters = [...state.filters.order];

    const filterSel = filters.find(filter => filter.id === orderId);
    filterSel.asc = !filterSel.asc;

    const compare = (user1, user2) => {
        let response = 0;

        if (filterSel.asc) {
            response = user1[orderId] > user2[orderId] ? 1 : -1
        }
        else {
            response = user1[orderId] < user2[orderId] ? 1 : -1
        }
        return response;
    }

    const order = Object.values(state.users).sort(compare).map(user => user.UserId);

    return ({
        ...state,
        filters: {
            ...state.filters,
            filterSelected: orderId
        },
        order,
    })
}

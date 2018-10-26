import { dispatchAction } from '../../lib/store.js';
import { getUsersJSON } from '../../data/woffuAPI.js';

export const actions = {
    GET_USERS: 'GET_USERS'
}

export function getUsers() {
    getUsersJSON()
        .then(results => {
            dispatchAction(actions.GET_USERS, results)
        })
}

export const reducers = {
    [actions.GET_USERS]: setUsers
}

function setUsers(state, payload) {
    return ({
        ...state,
        users: {...payload}
    })
}


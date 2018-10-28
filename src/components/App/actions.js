import { dispatchAction } from '../../lib/store.js';
import { getUsersJSON } from '../../data/woffuAPI.js';

export const actions = {
    GET_USERS: 'GET_USERS',
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
    const usersArr = [...payload];
    const order = usersArr.map(user => user.UserId);
    
    const users = usersArr.reduce((usersObj,user) => {
        const {AvailableDays,UsedDays,EmployeeStartDate} = {...user};
        const _startTime = new Date(EmployeeStartDate).getTime();
        const _freeTime = Math.round((UsedDays*100) / ((AvailableDays + UsedDays)||1));
        usersObj[user.UserId] = {...user,_freeTime,_startTime};
        return usersObj;
    },{});
    
    return ({
        ...state,
        users,
        order
    })
}
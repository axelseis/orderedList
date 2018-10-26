
import Component from '../../lib/Component.js'
import { initStore } from '../../lib/store.js';
import { initRouter } from '../../lib/router.js';
import "../../lib/logger.js";

import {initialState} from '../../initialState.js';
import Header from '../Header/Header.js';

import { getUsers, reducers } from './actions.js';

const routes = [
    { url: "/" },
    { url: "/orderBy/:paramId" },
    { url: "404", redirect: "/" }
]

export default class App extends Component {
    constructor(className) {
        super(className, [Header]);
        this.initApp();
    }
    
    initApp(){
        initStore([reducers], initialState);
        initRouter(routes, BASE_URL || '');

        getUsers();
    }

    stateToprops(state){
        return ({ 
         })
    }

    render() {
        return(`
            <Header class="Header"></Header>
        `)
    }
}


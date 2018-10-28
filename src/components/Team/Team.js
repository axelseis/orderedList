
import Component from '../../lib/Component.js'
import User from '../User/User.js'
import { dispatchAction } from '../../lib/store.js';
import { actions as libActions } from '../../lib/actions.js';

export default class Team extends Component {
    constructor(className) {
        super(className, [User]);
    }
    
    stateToprops(state){
        const {order=[], App:{perpage=1,page=1}} = {...state}
        const indexOut = page*perpage;
        const indexIn = indexOut - perpage;
        const orderPage = order.slice(indexIn,indexOut);

        return ({
            order: orderPage,
            page,
            maxPages: Math.floor(order.length/perpage)
         })
    }
    
    onClickPageButton(ev){
        const page = ev.currentTarget.getAttribute('pageindex');
        dispatchAction(libActions.SET_APP_PROP, {
            page
        })
    }
    
    render() {
        const {order,page,maxPages} = {...this.props};

        return(`
            <div class="Team__list">
                ${order.map(UserId => `
                    <User id="${UserId}" class="User Team__user"></User>
                `).join('')}
            </div>
            <div class="Team__footer">
                <div class="footer__button button--prev"><</div>
                ${[...Array(maxPages)].map((x,index) => {
                    const selected = (index+1) == page ? 'button--selected' : '';
                    return(`
                        <div class="footer__button button--page ${selected}" pageindex="${index+1}" onClick="onClickPageButton">${index+1}</div>
                    `)
                }).join('')}
                <div class="footer__button button--next">></div>
            </div>
        `)
    }
}


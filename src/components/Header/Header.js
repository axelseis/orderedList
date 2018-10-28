
import Component from '../../lib/Component.js'
import { setFilterSelected } from './actions.js';

export default class Header extends Component {
    constructor(className) {
        super(className);
    }
    
    stateToprops(state){
        const {filters=[],filterSelected} = {...state};
        return ({
            filters,
            filterSelected
        })
    }

    onClickOrder(ev) {
        ev.stopPropagation();
        
        const filterId = ev.currentTarget.getAttribute('filterId');

        setFilterSelected(filterId);
    }
    
    render() {
        return(`
            <div class="Header__logo"></div>
            <div class="Header__filters">
                <div class="Header__filters__date"></div>
                <div class="Header__filters__order">
                    ${this.props.filters.map(filter => {
                        const selected = filter.id === this.props.filterSelected ? 'property--selected' : '';
                        return(`
                            <div class="Header__order ${selected}" asc="${filter.asc}" filterId="${filter.id}" onClick="onClickOrder">
                                ${filter.title}
                            </div>
                        `)
                    }).join('')}
                </div>
            </div>
        `)
    }
}


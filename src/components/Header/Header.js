
import Component from '../../lib/Component.js'
import { sortByOrder, filterByDate } from './actions.js';

export default class Header extends Component {
    constructor(className) {
        super(className);
    }
    
    stateToprops(state){
        const {filters:{order=[],filterSelected,minTime=0,maxTime=0}} = {...state};

        return ({
            orderFilters: order,
            filterSelected,
            minTime,
            maxTime
        })
    }

    onClickOrder(ev) {
        ev.stopPropagation();
        
        const filterId = ev.currentTarget.getAttribute('filterId');
        sortByOrder(filterId);
    }
    
    onChangeDateInput(ev) {
        console.log('ev', ev)
        const dateIn = this.$dateIn.value;
        console.log('this.$dateIn', this.$dateIn.value)
        const dateOut = this.$dateOut.value;

        filterByDate(dateIn,dateOut)
    }

    render() {
        const minDate = new Date(this.props.minTime).toISOString().slice(0,10);
        const maxDate = new Date(this.props.maxTime).toISOString().slice(0,10);

        const inputProps = `
            type="date" 
            date-format="dd/mm/yyyy"
            min="${minDate}" 
            max="${maxDate}"
        `

        return(`
            <div class="Header__logo"></div>
            <div class="Header__filters">
                <div class="Header__filters__date">
                    <input ${inputProps}
                        id="dateIn" 
                        class="Header__date date--in" 
                        onChange="onChangeDateInput">
                    </input>
                    <input ${inputProps}
                        id="dateOut" 
                        class="Header__date date--out" 
                        onChange="onChangeDateInput">
                    </input>
                </div>
                <div class="Header__filters__order">
                    ${this.props.orderFilters.map(filter => {
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


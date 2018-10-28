
import Component from '../../lib/Component.js'
import { setFilterSelected } from './actions.js';

export default class Header extends Component {
    constructor(className) {
        super(className);

        this.datePickerIn;
        this.datePickerOut;
    }
    
    stateToprops(state){
        const {filters=[],filterSelected,minTime,maxTime} = {...state};
        return ({
            filters,
            filterSelected,
            minTime,
            maxTime
        })
    }

    onClickOrder(ev) {
        ev.stopPropagation();
        
        const filterId = ev.currentTarget.getAttribute('filterId');
        setFilterSelected(filterId);
    }
    
    onFocusDateInInput(ev) {
        if(!this.datePickerIn) {
            this.datePickerIn = flatpickr(this.$dateIn,{
                dateFormat: 'd/m/Y',
                minDate: this.props.minTime,
                maxDate: this.props.maxTime,
            });
            this.datePickerIn.open();
        }
    }

    onFocusDateOutInput(ev) {
        if(!this.datePickerOut) {
            this.datePickerOut = flatpickr(this.$dateOut,{
                dateFormat: 'd/m/Y',
                minDate: this.props.minTime,
                maxDate: this.props.maxTime,
            });
            this.datePickerOut.open();
        }
    }

    render() {

        return(`
            <div class="Header__logo"></div>
            <div class="Header__filters">
                <div class="Header__filters__date">
                    <input 
                        id="dateIn" 
                        class="Header__date date--in" 
                        type="text" 
                        onFocus="onFocusDateInInput">
                    </input>
                    <input 
                        id="dateOut" 
                        class="Header__date date--out" 
                        type="text"
                        onFocus="onFocusDateOutInput">
                    </input>
                </div>
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


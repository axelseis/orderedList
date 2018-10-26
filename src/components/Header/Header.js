
import Component from '../../lib/Component.js'

export default class Header extends Component {
    constructor(className) {
        super(className);
    }
    
    stateToprops(state){
        return ({ 
         })
    }

    
    render() {
        return(`
            <img src="/assets/woffu-logo.png" alt="">
        `)
    }
}


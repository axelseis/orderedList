
import Component from '../../lib/Component.js'
import Row from '../Row/Row.js'

export default class Team extends Component {
    constructor(className) {
        super(className, [Row]);
    }
    
    stateToprops(state){
        const users = state.users;

        return ({
            users
         })
    }
    
    render() {
        const {users=[]} = {...this.props};

        return(`
            <div class="Team__table">
                <div class="Team__header"></div>
                <div class="Team__list">
                    ${users.map(user => `
                        <Row id="${user.UserId}" class="Row Team__row"></Row>
                    `).join('')}
                </div>
            </div>
        `)
    }
}


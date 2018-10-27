
import Component from '../../lib/Component.js'

export default class Row extends Component {
    constructor(className) {
        super(className);
    }
    
    stateToprops(state){
        const user = (state.users || []).find(user => {
            return user.UserId === parseInt(this.domProps.id);
        })

        return ({
            user
        })
    }
    
    render() {
        const {user={}} = {...this.props}
        const avatarStyle = user.ImageURL ? `background-image:url(${user.ImageURL})` : '';
        
        return(`
            <div class="Row__avatar" style="${avatarStyle}">
                ${user.Acronym}
            </div>
            <div class="Row__name">
                ${user.FirstName} ${user.LastName}
            </div>
        `)
    }
}


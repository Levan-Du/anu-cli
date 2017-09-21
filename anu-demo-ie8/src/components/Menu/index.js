const React = require('react');
const ReactRouter = require('react-router');


const { Link } = ReactRouter;

const SubmenuItem = (props) => {
    return (
        <li style={styles.submenuItem}>
            <Link style={styles.submenuItemLink} to={props.to}>{props.title}</Link>
        </li>
    )
}

const Submenu = (props) => {
    var sub = props.data;

    return (
        <ul>
        {sub.map(el =>
            <SubmenuItem to={el.to} title={el.title} />
        )}
        </ul>
    )
}

const MenuItem = (props) => {
    
    return (
        <li>
            <header>
                {props.title}
            </header>
            {
                props.children
            }
        </li>
    )
}

class Menu extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        var { data } = this.props;
        return (
            <ul style={styles.menu}>
            {data.map(el=>
                <MenuItem title={el.title}>
                    <Submenu data={el.sub} />
                </MenuItem>
            )}
            </ul>
        );
    }
}

var styles = {
    menu: {
        height: '100%',
        width:200,
        float:'left'
    },
    submenuItem: {
        paddingLeft: 40
    },
    submenuItemLink: {
        color: '#666'
    }
}

module.exports = Menu;

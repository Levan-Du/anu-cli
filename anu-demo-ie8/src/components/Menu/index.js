const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouterDOM = require('react-router-dom');


const { Link } = ReactRouterDOM;

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
    console.log(props.children);
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
        height: '100%'
    },
    submenuItem: {
        paddingLeft: 40
    },
    submenuItemLink: {
        color: '#ccc'
    }
}

module.exports = Menu;

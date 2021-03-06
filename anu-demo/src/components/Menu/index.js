import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

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

export default class Menu extends React.Component {
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

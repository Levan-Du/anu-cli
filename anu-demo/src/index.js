import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/Menu';
import { HashRouter, Route } from 'react-router-dom';
import Page101 from './scenes/Page101';
import Page102 from './scenes/Page102';
import Page201 from './scenes/Page201';
import Page202 from './scenes/Page202';


var menus = [{
    title: '菜单一',
    sub: [{
        to: '/page101',
        title: 'page101'
    }, {
        to: '/page102',
        title: 'page102'
    }]
}, {
    title: '菜单二',
    sub: [{
        to: '/page201',
        title: 'page201'
    }, {
        to: '/page202',
        title: 'page202'
    }]
}]

const App = () =>
    <div style={styles.container}>
        <aside style={styles.aside} className="clearfix">
            <nav style={styles.nav}>
                <Menu data={menus} />
            </nav>
        </aside>
        <article style={styles.page}>
            <Route path="/page101" component={Page101} />
            <Route path="/page102" component={Page102} />
            <Route path="/Page201" component={Page201} />
            <Route path="/Page202" component={Page202} />
        </article>
    </div>


var styles = {
    container: {
        height: '100%'
    },
    aside: {
        float: 'left',
        height: '100%',
        width: 200,
        color: '#eee',
        background: '#20304f'
    },
    nav: {
        height: '100%'
    },
    page: {
        height: '100%',
        overflow: 'hidden'
    }
}

window.onload = function() {
    window.s = ReactDOM.render(
        <HashRouter>
            <Route path="/" component={App} />
        </HashRouter>,
        document.getElementById('example')
    )
}

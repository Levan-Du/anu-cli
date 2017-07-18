require('./index.css');
const React = require('react');
const ReactDOM = require('react-dom');
const Menu = require('./components/Menu');
const ReactRouterDOM = require('react-router-dom');
const Page101 = require('./scenes/Page101');
const Page102 = require('./scenes/Page102');
const Page201 = require('./scenes/Page201');
const Page202 = require('./scenes/Page202');


const { HashRouter, Route } = ReactRouterDOM;

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

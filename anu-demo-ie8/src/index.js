var styles = require( './index.css');
const React = require( 'react');
const ReactDOM = require('react-dom');


const App = () =>
    <div style={styles.container}>
        <h1>Welcome to use anujs</h1>
    </div>


window.onload = function() {
    window.s = ReactDOM.render(
        <App />,
        document.getElementById('example')
    )
}

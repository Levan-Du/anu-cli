const React = require('react');
const ReactDOM = require('react-dom');

class Select extends React.Component {
    constructor() {
        super()
        this.state = {
            value: 'bbbbb'
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        console.log(e.target.value)
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return <div><select  value={this.state.value} onChange={this.onChange}>
            <option value='aaa'>aaa</option>
            <option value='bbb'>bbb</option>
            <option value='ccc'>ccc</option>
        </select><p>{this.state.value}</p></div>
    }
}
class Input extends React.Component {
    constructor() {
        super()
        this.state = {
            value: 'bbbb'
        }
        this.onInput = this.onInput.bind(this)
    }
    onInput(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return <div><input value={this.state.value} onInput={this.onInput} />{this.state.value}</div>
    }
}
class Radio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        console.log(e.target.value)
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return <span><input type='radio' name={this.props.name} value={this.props.value}  onChange={this.onChange} />{this.state.value+''}</span>
    }
}
class Playground extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '请上下滚动鼠标滚轮'
        }
        this.onWheel = this.onWheel.bind(this)
    }
    onWheel(e) {
        this.setState({
            value: e.wheelDelta
        })
    }
    render() {
        return <div style={{width:300,height:300,backgroundColor:'red',display:'inline-block'}} onWheel={this.onWheel} >{this.state.value}</div>
    }
}
class MouseMove extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '请在绿色区域移动'
        }
        this.onMouseMove = this.onMouseMove.bind(this)
    }
    onMouseMove(e) {
        var v = e.pageX + ' ' + e.pageY;
        this.setState({
            value: v
        })
    }
    render() {
        return <div style={{width:300,height:300,backgroundColor:'#a9ea00',display:'inline-block'}} onMouseMove={this.onMouseMove} >{this.state.value}</div>
    }
}
class FocusEl extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '点我'
        }
        this.onFocus = this.onFocus.bind(this)
    }
    onFocus(e) {
        console.log(e.target.title)
    }
    render() {
        return <input  title={this.props.title} onKeyUp={(e)=>{console.log(e.which)}} style={{width:100,height:50,backgroundColor:'green',display:'inline-block'}} onFocus={this.onFocus} />
    }
}
window.onload = function() {
    window.s = ReactDOM.render(
        <div>
        <Select />
        <Input />
        <Radio name='sex' value="男" />
        <Radio name='sex' value='女'/>
        <p>
            <Playground /> 
            <MouseMove />
            <FocusEl title="aaa" />
            <FocusEl title="bbb" />
        </p>    
    </div>,
        document.getElementById('example'))
}

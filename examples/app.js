import React from 'react'
import {render} from 'react-dom'
import Indicator from '../src'
import style from './app.css'

class App extends React.Component {

    images = ['./images/pen.png', './images/pineapple.png', './images/apple-pen.png']

    state = { index: -1 }

    handleItemShow(index) {
        this.setState({index: index})
    }

    handleItemHide() {
        this.setState({index: -1})
    }

    render() {
        let items = ['Pen', 'Pineapple', 'Apple-Pen'].map((item, index) => (
            <div key={index} className="item">
                <span
                    className="span"
                    onMouseEnter={this.handleItemShow.bind(this, index)}
                    onMouseLeave={this.handleItemHide.bind(this)}
                >
                    {item}
                </span>
            </div>
        ))
        return (
            <div className="menu">
                {   
                    this.state.index != -1 && 
                    <Indicator
                        className="indicator"
                        direction="top"
                        images={this.images}
                        index={this.state.index}
                        offset={{x:0, y:-30}}
                        parent={document.getElementsByClassName('menu')[0]}
                        anchor={document.getElementsByClassName('item')[this.state.index]}
                    >
                        <img src={this.images[this.state.index]}/>
                    </Indicator>
                }
                {items}
            </div>
        )
    }
}

render(<App/>, document.getElementById('app'))

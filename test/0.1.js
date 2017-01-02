import React from 'react'
import {css, creatStyle} from 'aphrodite-freestyle'
import {getDom, getNode, getNodeValue} from 'react-common-tools'

let style = {
    base: {
        indicator:{ position: 'fixed', visibility: 'hidden'}
    }
}

const parent = document.getElementsByClassName('menu')[0]

export default class Indicator extends React.Component{

    state = {style: creatStyle(style)}
    parent = document.getElementsByClassName('menu')[0]
    componentDidMount() {
        let child = document.getElementsByClassName('image')[0]
        let parent = this.parent

        let self = style.base.indicator
        let direction = this.props.direction
        let positioner = this.props.positioner
        let x = positioner.offsetLeft + positioner.offsetWidth * 0.5
        let y = positioner.offsetTop + positioner.offsetHeight * 0.5
        console.log(document.querySelectorAll('.image')[0].width)
        console.log(child.offsetWidth)
        switch (direction) {
            case 'left':
                self.left = parent.offsetLeft - child.offsetWidth
                self.top = y - child.offsetHeight * 0.5
                break
            case 'right':
                self.left = parent.offsetLeft + parent.offsetWidth
                self.top = y - child.offsetHeight * 0.5
                break
            case 'top':
                self.left = x - child.offsetWidth * 0.5
                self.top = parent.offsetTop - child.offsetHeight
                break
            case 'bottom':
                self.left = x - child.offsetWidth * 0.5
                self.top = parent.offsetTop + parent.offsetHeight
                break
        }
        self.visibility = 'visible'
        this.setState({style:creatStyle(style)})
    }

    render() {
        let _style = this.state.style
        return (
            <div className={css(_style.indicator)}>
                <img className="image" src={this.props.images[this.props.index]}/>
            </div>
        )
    }
}
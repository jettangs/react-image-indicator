import React from 'react'
import {css, creatStyle} from 'aphrodite-freestyle'

let style = {
    base: {
        indicator:{ position: 'fixed', visibility: 'hidden'}
    }
}

const SImage = (src,callback) => {
    var img = new Image();
    img.src = src;
    var appname = navigator.appName.toLowerCase();
    if (appname.indexOf("netscape") == -1) { //ie
        img.onreadystatechange = function () {
            if (img.readyState == "complete") {
                callback(img);
            }
        };
    } else {
        img.onload = function () { //firefox
            if (img.complete == true) {
                callback(img);
            }
        };
    }
}

const getTop = e => { 
    var offset = e.offsetTop; 
    if(e.offsetParent!=null) offset+=getTop(e.offsetParent)
    return offset
} 

const getLeft = e => { 
    var offset = e.offsetLeft
    if(e.offsetParent!=null) offset+=getLeft(e.offsetParent)
    return offset
} 

export default class Indicator extends React.Component{

    state = {style: creatStyle(style),imageLoaded:false}

    componentDidMount() {
        
        let props = this.props
        let src = props.images[props.index]

        SImage(src, image => {
            let self = style.base.indicator
            let x = getLeft(props.anchor) + props.anchor.offsetWidth * 0.5
            let y = getTop(props.anchor) + props.anchor.offsetHeight * 0.5
            let width = image.width
            let height = image.height
            let limit = this.props.limit
            let _image = style.base.indicator['*img'] = {}
            _image.width = width+'px'
            _image.height = height+'px'
            if(limit) {
                if(limit.width && !limit.height) {
                    if(width > limit.width) {
                        width = limit.width
                        height = width*(image.height/image.width)
                        _image.width = limit.width+'px'
                        _image.height = height+'px'
                    }
                }else if(limit.height && !limit.width) {
                    if(height > limit.height) {
                        height = limit.height
                        width = height*(image.width/image.height)
                        _image.height = limit.height+'px'
                        _image.width = width+'px'
                    }
                }else {
                    width = limit.width
                    height = limit.height
                    _image.height = height+'px'
                    _image.width = width+'px'
                }
            }

            let pLeft = getLeft(props.parent)
            let pTop = getTop(props.parent)

            if(!props.offset) {
                props.offset = {x:0, y:0}
            }
            
            switch (props.direction) {
                case 'left':
                    self.left = pLeft - width + props.offset.x
                    self.top = y - height * 0.5 + props.offset.y
                    break
                case 'right':
                    self.left = pLeft + props.parent.offsetWidth + props.offset.x
                    self.top = y - height * 0.5 + props.offset.y
                    break
                case 'top':
                    self.left = x - width * 0.5 + props.offset.x
                    self.top = pTop - height + props.offset.y
                    break
                case 'bottom':
                    self.left = x - width * 0.5 + props.offset.x
                    self.top = pTop + props.parent.offsetHeight + props.offset.y
                    break
            }
            self.visibility = 'visible'

            this.setState({style:creatStyle(style),imageLoaded:true})
        })
    }

    render() {
        let _style = this.state.style
        return (
            <div className={this.props.className + ' ' + css(_style.indicator)}>
                {this.state.imageLoaded && <img src={this.props.images[this.props.index]}/>}
            </div>
        )
    }
}
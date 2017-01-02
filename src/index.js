import React from 'react'
import {css, creatStyle} from 'aphrodite-freestyle'

let style = {
    base: {
        indicator:{ position: 'fixed', visibility: 'hidden'}
    }
}
/**
 * 判断图片是否加载完整
 */
const SImage = (src,callback) => {
    var img = new Image();
    img.src = src;
    var appname = navigator.appName.toLowerCase();
    
    if (appname.indexOf("netscape") == -1) {
       //ie
        img.onreadystatechange = function () {
            if (img.readyState == "complete") {
                callback(img);
            }
        };
    } else {
       //firefox
        img.onload = function () {
            if (img.complete == true) {
                callback(img);
            }
        };
    }
}

export default class Indicator extends React.Component{

    state = {style: creatStyle(style)}

    componentDidMount() {
        let props = this.props
        let src = props.images[props.index]
        
        SImage(src, image => {
            let self = style.base.indicator
            let x = props.anchor.offsetLeft + props.anchor.offsetWidth * 0.5
            let y = props.anchor.offsetTop + props.anchor.offsetHeight * 0.5
            switch (props.direction) {
                case 'left':
                    self.left = props.parent.offsetLeft - image.width + props.offset.x
                    self.top = y - image.height * 0.5 + props.offset.y
                    break
                case 'right':
                    self.left = props.parent.offsetLeft + props.parent.offsetWidth + props.offset.x
                    self.top = y - image.height * 0.5 + props.offset.y
                    break
                case 'top':
                    self.left = x - image.width * 0.5 + props.offset.x
                    self.top = props.parent.offsetTop - image.height + props.offset.y
                    break
                case 'bottom':
                    self.left = x - image.width * 0.5 + props.offset.x
                    self.top = props.parent.offsetTop + props.parent.offsetHeight + props.offset.y
                    break
            }
            self.visibility = 'visible'
            this.setState({style:creatStyle(style)})
        })
    }

    render() {
        let _style = this.state.style
        return (
            <div className={this.props.className+' '+css(_style.indicator)}>
                {this.props.children}
            </div>
        )
    }
}
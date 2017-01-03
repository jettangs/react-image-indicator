# react-image-indicator
A float image indicator for react

### Install
`npm install --save react-image-indicator`

### Usage

```javascript
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
                    <Indicator
                        className="indicator"
                        direction="top"
                        images={this.images}
                        index={this.state.index}
                        limit={{height:'60',width:'60'}}
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
```

![](http://7xqhly.com1.z0.glb.clouddn.com/69.gif)

### API
```javascript
/**
 * @param @required {string} direction: 'top', 'left', 'right' or 'bottom'.
 * @param @required {array} images: an array of paths of images.
 * @param @required {number} index: which images to display.
 * @param {object} limit: limit the image size.
 * @param @required {object} parent: the indicator's parent.
 * @param @required {object} anchor: the position reference to display.
 * @param {object} offset: the offset value to adjust the position.
 */

<Indicator
    className="indicator"
    direction="top"
    images={this.images}
    index={this.state.index}
    offset={{x:0, y:-30}}
    limit={{height:'60',width:'60'}}
    parent={document.getElementsByClassName('menu')[0]}
    anchor={document.getElementsByClassName('item')[this.state.index]}
>
```


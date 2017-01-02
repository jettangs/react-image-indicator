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
                    this.state.index != -1 && 
                    <Indicator
                        direction="top"
                        images={this.images}
                        index={this.state.index}
                        offset={{x:0, y:-20}}
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

![](http://7xqhly.com1.z0.glb.clouddn.com/demos.png)

### API
```javascript
/**
 * @param {string} direction: 'top', 'left', 'right' or 'bottom'.
 * @param {array} images: an array of paths of images.
 * @param {number} index: which images to display.
 * @param {object} parent: the indicator's parent.
 * @param {object} anchor: the position reference to display.
 * @param {object} offset: the offset value to adjust the position.
 */

<Indicator
    direction="top"
    images={this.images}
    index={this.state.index}
    offset={{x:0, y:-20}}
    parent={document.getElementsByClassName('menu')[0]}
    anchor={document.getElementsByClassName('item')[this.state.index]}
/>
```


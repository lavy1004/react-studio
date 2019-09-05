import React from 'react'

class Counter extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            score: 0
        }
    }
    getCount = () => {
        
    }
    hanlder = (num) => {
        this.setState({
            score: num
        });
    }

    increment = () => {
        this.setState({
            score: this.state.score + 1
        });
    }

    decrement = () => {
        this.setState({
            score: this.state.score - 1
        });
    }

    render() {
        return (
            <>
                카운트 다운 : {this.state.score}
                <button onClick={this.increment}>증가</button>
                <button onClick={this.decrement}>감소</button>
                <button onClick={this.getCount}>누적값</button>
                누적값 : {this.state.score}
            </>
        )
    }
}

export default Counter
import React from "react";

class AddUserInfo extends React.Component {
    state = {
		name: '',
		address: 'Github/nhatvy1',
		age: ''
	}

    handleOnChangeInput(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleOnChangeAge(event) {
        this.setState({
            age: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.handleAddNewUser({
            id: Math.floor((Math.random()*100)+1) + '-random',
            name: this.state.name,
            age: this.state.age
        })
    }
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm from {this.state.age} <br />
                <form onSubmit={(event)=>this.handleSubmit(event)}>
                    <input 
                        type="text" 
                        value={this.state.name}
                        onChange={(event)=>this.handleOnChangeInput(event)}
                    />
                    <input 
                        type="text" 
                        value={this.state.age}
                        onChange={(event)=>this.handleOnChangeAge(event)}
                    />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddUserInfo
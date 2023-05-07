import React from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component{
    state = {
        listUsers: [
            {id: 1, name: 'HoiDanIT', age:'30'},
            {id: 2, name: 'Eric', age:'22'},
            {id: 3, name: 'Harry', age:'17'},
        ]
    }

    handleAddNewUser = (userObj)=> {
        console.log('Check data: ', userObj)
        this.setState({
            listUsers: [userObj,...this.state.listUsers]
        })
    }

    handleDeleteUser = (userId)=> {
        let listUsersClone = this.state.listUsers
        listUsersClone = listUsersClone.filter(item => item.id !== userId)
        this.setState({
            listUsers:  listUsersClone
        })
    }

    render() {
        // DRY: dont repeat yourself
        return (
            <>
                <AddUserInfo 
                    handleAddNewUser={this.handleAddNewUser}
                /> 
                <br /><br />
                <DisplayInfo 
                    listUsers={this.state.listUsers}
                    handleDeleteUser={this.handleDeleteUser}
                />
            </>
        )
    }
}

export default MyComponent
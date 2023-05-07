import React from "react";
import './DisplayInfo.scss';
import logo from './../logo.svg';

// class DisplayInfo extends React.Component {

//     render() {
//         console.log('Call render')
//         const { listUsers } = this.props
//         return (
//             <div className="display-info-container">
//                 { true && 
//                     <>
//                         { listUsers.map((user, index)=> {
//                             return (
//                                 <div key={index} className={+user.age > 17 ? 'red': null}>
//                                     <div>My name is {user.name}</div>
//                                     <div>My age is {user.age}</div>
//                                     <button
//                                         onClick={()=> this.props.handleDeleteUser(user.id)}
//                                     >Delete</button>
//                                     <hr />
//                                 </div>
//                             )
//                         })}
//                     </>
//                 }
//             </div>
//         )
//     }
// }

const DisplayInfo = (props)=> {
    const { listUsers } = props
    return (
        <div className="display-info-container">
            { true && 
                <>
                    { listUsers.map((user, index)=> {
                        return (
                            <div key={index} className={+user.age > 17 ? 'red': null}>
                                <div>My name is {user.name}</div>
                                <div>My age is {user.age}</div>
                                <button
                                    onClick={()=> props.handleDeleteUser(user.id)}
                                >Delete</button>
                                <hr />
                            </div>
                        )
                    })}
                </>
            }
        </div>
    )
}

export default DisplayInfo
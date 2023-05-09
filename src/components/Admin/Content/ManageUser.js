import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import { useState } from "react";
import TableUser from "./TableUser";

const ManageUser = (props)=> {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    return(
        <div className="manage-user-container">
            <div className="title">
                Manager user
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary mt-3" onClick={()=> setShowModalCreateUser(true)}><FcPlus />Add new users</button>
                </div>
                <div className="table-users-container">
                    <TableUser />
                    <ModalCreateUser 
                        show={showModalCreateUser}
                        setShow={setShowModalCreateUser}
                    />
                </div>
            </div>
        </div>
    )
}

export default ManageUser
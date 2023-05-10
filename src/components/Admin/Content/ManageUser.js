import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import { useState, useEffect } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from '../../../services/apiService';

const ManageUser = (props)=> {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [listUser, setListUser] = useState([])

    useEffect(()=> {
        fetchListUser()
    }, [])

    const fetchListUser = async ()=> {
        let res = await getAllUsers()
        console.log(res)
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }

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
                    <TableUser 
                        listUser={listUser}
                    />
                    <ModalCreateUser 
                        show={showModalCreateUser}
                        setShow={setShowModalCreateUser}
                        fetchListUser={fetchListUser}
                    />
                </div>
            </div>
        </div>
    )
}

export default ManageUser
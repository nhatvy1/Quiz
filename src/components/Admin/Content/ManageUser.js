import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import { useState, useEffect } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from '../../../services/apiService';
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = (props)=> {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})

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

    const handleClickBtnUpdate = (user)=> {
        setShowModalUpdateUser(true)
        setDataUpdate(user)
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
                        handleClickBtnUpdate={handleClickBtnUpdate}
                    />
                    <ModalCreateUser 
                        show={showModalCreateUser}
                        setShow={setShowModalCreateUser}
                        fetchListUser={fetchListUser}
                    />
                    <ModalUpdateUser 
                        show={showModalUpdateUser}
                        setShow={setShowModalUpdateUser}
                        dataUpdate={dataUpdate}
                    />
                </div>
            </div>
        </div>
    )
}

export default ManageUser
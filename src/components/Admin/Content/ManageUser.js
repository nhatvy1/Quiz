import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import { useState, useEffect } from "react";
import TableUser from "./TableUser";
import { getAllUsers, getUserWithPaginate } from '../../../services/apiService';
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDetailUser from "./ModalDetailUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props)=> {
    const LIMIT_USER = 5
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalDetailUser, setShowModalDetailUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

    const [dataUpdate, setDataUpdate] = useState({})
    const [dataUserDetail, setDataUserDetail] = useState({})
    const [dataDelete, setDataDelete] = useState({})

    const [listUser, setListUser] = useState([])

    useEffect(()=> {
        fetchListUserWithPaginate(1)
    }, [])

    const fetchListUser = async ()=> {
        let res = await getAllUsers()
        console.log(res)
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }

    const fetchListUserWithPaginate = async (page)=> {
        let res = await getUserWithPaginate(page, LIMIT_USER)
        console.log('Res.dt: ', res.DT)
        if (res.EC === 0) {
            setListUser(res.DT.users)
            setPageCount(res.DT.totalPages)
            console.log(res.DT.users)
        }
    }

    const handleClickBtnUpdate = (user)=> {
        setShowModalUpdateUser(true)
        setDataUpdate(user)
    }

    const handleClickBtnViewDetail = (user)=> {
        setShowModalDetailUser(true)
        setDataUserDetail(user)
        console.log('Check view detail: ', user)
    }

    const handleClickBtnDelete = (user)=> {
        console.log('Delete user');
        setShowModalDeleteUser(true)
        setDataDelete(user)
    }

    const resetUpdateData = ()=> {
        setDataUpdate({})
    }

    const resetDetailDataUser = ()=> {
        setDataUserDetail({})
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
                    {/* <TableUser 
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnViewDetail={handleClickBtnViewDetail}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate 
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnViewDetail={handleClickBtnViewDetail}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    <ModalCreateUser 
                        show={showModalCreateUser}
                        setShow={setShowModalCreateUser}
                        fetchListUser={fetchListUser}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    <ModalUpdateUser 
                        show={showModalUpdateUser}
                        setShow={setShowModalUpdateUser}
                        dataUpdate={dataUpdate}
                        fetchListUser={fetchListUser}
                        resetUpdateData={resetUpdateData}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                    <ModalDetailUser 
                        show={showModalDetailUser}
                        setShow={setShowModalDetailUser}
                        dataUserDetail={dataUserDetail}
                        resetDetailDataUser={resetDetailDataUser}
                    />

                    <ModalDeleteUser 
                        show={showModalDeleteUser}
                        setShow={setShowModalDeleteUser}
                        dataDelete={dataDelete}
                        fetchListUser={fetchListUser}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default ManageUser
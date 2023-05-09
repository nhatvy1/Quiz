import { useEffect } from "react";
import { useState } from "react";
import { getAllUsers } from '../../../services/apiService';

const TableUser = (props)=> {
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

    console.log('render view 1')

    return (
        <>
            <table className="table table-hover table-bordered mt-5">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((user, index)=> {
                            return (
                                <tr key={index}>
                                    <th>{user.id}</th>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn btn-primary">View</button>
                                        <button className="btn btn-warning mx-3">Update</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={4}>Not found data</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableUser
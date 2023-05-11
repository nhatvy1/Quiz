import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const TableUserPaginate = (props)=> {
    const { listUser, pageCount } = props
    // Invoke when user click to request another page.
    // const [pageCount, setPageCount] = useState(0);
    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(+event.selected+1)
        props.setCurrentPage(+event.selected+1)
        console.log(`User requested page number ${event.selected}`);
    };
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
                                        <button className="btn btn-primary"
                                            onClick={()=>props.handleClickBtnViewDetail(user)}
                                        >View</button>
                                        <button className="btn btn-warning mx-3"
                                            onClick={()=>props.handleClickBtnUpdate(user)}
                                        >Update </button>
                                        <button className="btn btn-danger"
                                            onClick={()=> props.handleClickBtnDelete(user)}
                                        >Delete</button>
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
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    )
}

export default TableUserPaginate
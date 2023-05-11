import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify'; 
import '../../../services/apiService';
import _ from 'lodash';
import { deleteUser } from '../../../services/apiService';

const ModalDeleteUser = (props)=> {
    const { show, setShow, dataDelete } = props
    const handleClose = () => {
        setShow(false);
    }

    const handleDeleteUser = async ()=> {
        let data = await deleteUser(dataDelete.id)
        
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            // await props.fetchListUser()
            props.setCurrentPage(1)
            await props.fetchListUserWithPaginate(1)
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (    
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="alert">
                    <p>Are you sure to delete this <b>{dataDelete.email}</b></p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={()=>handleDeleteUser()}>
                Confirm
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser
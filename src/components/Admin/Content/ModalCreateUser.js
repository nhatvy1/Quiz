import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify'; 
import '../../../services/apiService';
import { postCreateNewUser } from '../../../services/apiService';

function ModalCreateUser(props) {
    const { show, setShow } = props
    const handleClose = () => {
        setShow(false);
        setEmail("")
        setPassword("")
        setUsername("")
        setRole("USER")
        setImage("")
        setPreviewImage("")
    }

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [role, setRole] = useState("USER")
    const [previewImage, setPreviewImage] = useState("")

    const handleUploadImage = (event)=> {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("")
        }
        console.log('Upload file')
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleSubmitUser = async ()=> {
        // validate
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error('Invalid email')
            return 
        }
        
        if (!password) {
            toast.error('Invalid password')
        }

        let data = await postCreateNewUser(email, password, username, role, image)
        console.log('Check response: ', data)
        
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
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
                <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" 
                            value={email}
                            onChange={(event)=>setEmail(event.target.value)}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="inputAddress" className="form-label">Username</label>
                        <input type="text" className="form-control" 
                            value={username}
                            onChange={(event)=>setUsername(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" 
                            value={password}
                            onChange={(event)=>setPassword(event.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputState" className="form-label">Role</label>
                        <select className="form-select" onChange={(event)=>setRole(event.target.value)}>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label label-upload" htmlFor="labelUpliad">
                            <FcPlus />
                            Upload File Image</label>
                        <input type="file" className="form-control" id="labelUpliad" hidden
                            onChange={(event)=>handleUploadImage(event)}
                        />
                    </div>
                    <div className="col-md-12 img-preview">
                        { previewImage ? 
                            <img src={previewImage} />
                            :
                            <span>Preview image</span>
                        }
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={()=>handleSubmitUser()}>
                Saves
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser
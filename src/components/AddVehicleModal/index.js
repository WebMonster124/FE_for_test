import React, {useEffect, useState}from 'react' 
import './addModal.scss'
import axios from 'axios'
import { Modal,Button }from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
const AddVehicleModal = (props) => {
    const add = () => {
        let temp={};
        temp.price = price;
        temp.sku = sku;
        temp.car_model = carModel;
        temp.car_name = carName;
        temp.amount = 0
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/cars`,temp)
        .then((res)=> {
            clearModalData();
            props.fetchCarData();
        })
    }
    const [price,setPrice]=useState('')
    const [sku,setSku]= useState('')
    const [carModel,setCarModel]=useState('')
    const [carName,setCarName]=useState('')
    const clearModalData = () => {
        setPrice('');setCarModel('');setSku('');setCarName('');
    }
    const close = () => {
        clearModalData();
        props.modalClose();
    }
    return(
            <Modal show={props.modalShow} onHide={close}  className="modal" dialogClassName="modal-100w" centered>
                <Modal.Header>
                    <h3>Add Car</h3>
                </Modal.Header>
                <Modal.Body>
                    <div className='input-wrapper'>
                        <label>price:</label>
                        <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}></input>
                    </div>
                    <div className='input-wrapper'>
                        <label>SKU:</label>
                        <input type="text" value={sku} onChange={(e)=>setSku(e.target.value)}></input>
                    </div>
                    <div className='input-wrapper'>
                        <label>CarModel:</label>
                        <input type="text" value={carModel} onChange={(e)=>setCarModel(e.target.value)}></input>
                    </div>
                    <div className='input-wrapper'>
                        <label>CarName:</label>
                        <input type="text" value={carName} onChange={(e)=>setCarName(e.target.value)}></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btns">
                        <Button variant="success" onClick={add}>Add</Button>
                        <Button variant="danger" onClick={close}>Close</Button>
                    </div>
                </Modal.Footer>
            </Modal>
    )
}
export default AddVehicleModal
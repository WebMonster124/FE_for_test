import React,{useState,useEffect} from 'react'
import { Modal,Button } from 'react-bootstrap';
import axios from 'axios'
const InvetoryModal = (props) => {
    const [amount, setAmount] = useState(0)
    const add = () => {
        let temp={};let temp_amount;
        if (props.modalTitle != 'add')
            temp_amount = Number(props.amount) -Number(amount)
        else
            temp_amount = Number(props.amount) + Number(amount)
        if (temp_amount < 0 ) temp.amount = 0;
        axios.put(`${process.env.REACT_APP_API_BASE_URL}/cars/${props.modalid}`,temp)
        .then((res)=> {
            temp={}; 
            if (props.modalTitle != 'add' )
                temp.in_out = -1;
            else
                temp.in_out = 1
           temp.car_id = props.modalid;temp.amount = amount;temp.inout_date = new Date();
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/inventories`,temp)
                .then((res)=>{  
                    clearModalData();
                    props.fetchCarData()
                })
        })
    }
    const clearModalData = () => {
        setAmount('')
    }
    const close = () => {
        clearModalData();
        props.modalClose()
    }
    return(
        <Modal show={props.modalShow} onHide={close}  className="modal" dialogClassName="modal-100w" centered>
            <Modal.Header>
                <h3>{props.modalTitle == 'add' ? 'Add to Investory' : "Sale"}</h3>
            </Modal.Header>
            <Modal.Body>
                <div className='input-wrapper'>
                    <label>amount:</label>
                    <input type="text" value={amount} onChange={(e)=>{if (Number(e.target.value)) setAmount(e.target.value)}}></input>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={add}>{props.modalTitle == 'add' ? 'Add' : "OK"}</Button>
                <Button variant="danger" onClick={close}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default InvetoryModal;
import React,{useEffect, useState}from 'react'
import AddVehicleModal from '../components/AddVehicleModal'
import  axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './admin.scss'
import { Button ,Row, Col } from 'react-bootstrap';
import InventoryModal from '../components/InvetoryModal';
const Admin = () => {
    const [modalShow, setModalShow] = useState(false)
    const [invetoryModalShow, setInvetoryModalShow]= useState(false)
    const [modalTitle, setModalTitle] = useState();
    const [vehicles,setVehicles]= useState([])
    const [id, setId ] = useState()
    const [amount, setAmount]= useState();
    const modalClose = () => {
        setModalShow(false)
    }
    const invetoryModalClose = () => {
        setInvetoryModalShow(false)
    }
    const fetchCarData = () =>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/cars`)
        .then((res)=>{
            setVehicles(res.data)
            setModalShow(false)
            setInvetoryModalShow(false)
            fetchTransactionData()
        })
    }
    const addvehicle = () => {
        setModalShow(true)
    }
    const deleteRecord = (id) => {
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cars/${id}`)
        .then((res)=>{
            fetchCarData();
        })
    }
    const addInvetory = (id,amount) =>{
        setInvetoryModalShow(true)
        setId(id)
        setAmount(amount)
        setModalTitle('add')
    }
    const deleteInvetory = (id,amount) => {
        setInvetoryModalShow(true)
        setId(id)
        setAmount(amount)
        setModalTitle('reduce')
    }
    useEffect(()=>{
        fetchCarData();
    },[])
    const [ transactions,setTransactions] = useState([]);
    const fetchTransactionData = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/inventories`)
        .then((res)=>{
            setTransactions(res.data)
        })
    }
    useEffect(()=>{
        fetchTransactionData(); 
    },[])
 return(
    <div className="admin">
        <div className='container'>
           
            <div className='admin-content'>
                 <h1>Admin Page</h1>
                <div className='admin-content__header'>
                    <Button variant="danger" onClick={addvehicle}>add vehicle</Button>
                </div>
                <div className='admin-content__body'>
                    <div className='inventory'>
                        <table className='vehicle'>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>price</th>
                                    <th>sku</th>
                                    <th>CarModel</th>
                                    <th>CarName</th>
                                    <th>inventory</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                vehicles.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val.id}</td>
                                            <td>{val.price}</td>
                                            <td>{val.sku}</td>
                                            <td>{val.car_model}</td>
                                            <td>{val.car_name}</td>
                                            <td>{val.amount}</td>
                                            <td><Button variant='success'  onClick={()=>addInvetory(val.id, val.amount)}>add to invetory</Button></td>
                                            <td><Button variant='info'  onClick={()=>deleteInvetory(val.id, val.amount)}>sale</Button></td>
                                            <td><Button variant='danger'  onClick={()=>deleteRecord(val.id)}>delete vehicle</Button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='salesRecords'>
                        
                    </div>
                </div>
            </div>
            <div className="transaction">
                        <h1>transaction history</h1>
                        <div className='transaction-content'>
                            <table className='vehicle'>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>carId</th>
                                        <th>amount</th>
                                        <th>sell</th>
                                        <th>date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    transactions.map((val, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{val.id}</td>
                                                <td>{val.car_id}</td>
                                                <td>{val.amount}</td>
                                                <td>{val.in_out === 1 ? "add to invetory":'sale' }</td>
                                                <td>{val.inout_date}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
            </div>
            
        </div>
        
        <AddVehicleModal modalShow={modalShow} modalClose= {modalClose} fetchCarData={fetchCarData}></AddVehicleModal>
        <InventoryModal modalShow={invetoryModalShow} modalid={id} modalTitle={modalTitle} amount={amount} modalClose = {invetoryModalClose} fetchCarData={fetchCarData}></InventoryModal>
    </div>
 )   
}
export {Admin}
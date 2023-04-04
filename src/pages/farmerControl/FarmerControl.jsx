import React from "react";
import "./farmerControl.css";
import Sidebar from "../../Components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function FarmerControl() {

  const [firstname, setFirstname] = useState("");
  const [secondname, setSecondname] = useState("");
  const [acres, setAcres] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id, setId] = useState("");
  const [farmers, setFarmers] = useState([]);


//add farmer
  const addfarmer = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:4000/addfarmer", {
      firstname: firstname,
      secondname: secondname,
      acres: acres,
      quantity: quantity,
    }).then((response) => {
      if (response.data.length > 0) {
        console.log(response.data)
      } else {
        alert("please check there cannot be empty input fields");
      }
    });
  };

//delete farmer
  const deletefarmer =()=>{
    Axios.delete("http://localhost:4000/deletefarmer",{
      data: {id : id},
    }).then((response) =>{
      console.log(response.data);
    })
  };

  //show farmer table
  useEffect(()=>{
    Axios.get('http://localhost:4000/showfarmers')
    .then(res => setFarmers(res.data))
    .catch(err => console.log(err));
  }, []);


  return (
    <div className="farmer-control-div">
      <Sidebar />

      <div className="farmer-control-data">
        <div className="farmer-register">
          <form className="farmer-register-form">
            <input
              type="text"
              placeholder="First name"
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="Second name"
              onChange={(e) => {
                setSecondname(e.target.value);
              }}
              required
            />

            <input
              type="number"
              placeholder="Acres"
              onChange={(e) => {
                setAcres(e.target.value);
              }}
              required
            />

<input
            type="number"
            placeholder="quantity"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            required
          />

            <button onClick={addfarmer}>add</button>
            </form>
            <input type="text"  placeholder="enter id to delete" onChange={(e)=>{ setId(e.target.value)}}/>
            <button onClick={deletefarmer}>delete</button>

        </div>

        <div className="farmer-table-view">
        <table className="table">
          <thead>
            <tr>
              <th>farmer id</th>
              <th>firstn name</th>
              <th>second name</th>
              <th>acres</th>
              <th>fertizer quantity</th>
              <th>status</th>
            </tr>
          </thead>

          <tbody>
            {
              farmers.map((data,i)=>(
                <tr key= {i}>
                  <td>{data.farmer_id}</td>
                  <td>{data.farmer_fname}</td>
                  <td>{data.farmer_sname}</td>
                  <td>{data.acre}</td>
                  <td>{data.fertilizer_quantity}</td>
                  <td>{data.status}</td>

                  {/* <td> <button onClick={()=>{deleteFarmer(data.fertilizer_id)}}>Delete</button></td> */}

                </tr>
              ))
            }
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

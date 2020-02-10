import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table
} from "reactstrap";

import List from "./list";


export default props => {
  const [totalMobils, setTotalMobils] = useState([]);
 
  // User's selections
  const [selection, setSelection] = useState({
    mobil: {
      name: null,
      id: null
    },
    date: new Date(),
    time: null,
    tipe: "Semua Tipe",
  
  });



  // List of potential tipes
  
  const [times] = useState([
    "12JAM",
    "24JAM",
    
  ]);
  // Basic reservation "validation"
  
  const getDate = _ => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const date =
      months[selection.date.getMonth()] +
      " " +
      selection.date.getDate() +
      " " +
      selection.date.getFullYear();
    let time = selection.time.slice(0, -3);
    time = selection.time > 12 ? time + 12 + ":00" : time + ":00";
    console.log(time);
    const datetime = new Date(date + " " + time);
    return datetime;
  };

  const getEmptyMobils = _ => {
    let mobils = totalMobils.filter(mobil => mobil.isAvailable);
    return mobils.length;
  };
 
  useEffect(() => {
    // Check availability of mobils from DB when a date and time is selected
    if (selection.time && selection.date) {
      (async _ => {
        let datetime = getDate();
        let res = await fetch("http://localhost:3005/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            date: datetime
          })
        });
        res = await res.json();
        // Filter available mobils with tipe and group size criteria
        let mobils = res.mobils.filter(
          mobil =>
            (selection.size > 0 ? mobil.capacity >= selection.size : true) &&
            (selection.tipe !== "Semua Tipe"
              ? mobil.tipe === selection.tipe
              : true)
        );
        setTotalMobils(mobils);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.time, selection.date, selection.size, selection.tipe]);

  // Make the reservation if all details are filled out
 const reserve = async _ => {
  const datetime = getDate();
  let res = await fetch("http://localhost:3005/all", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      
      date: datetime,
      mobil: selection.mobil.reservation.id
    })
  });
  res = await res.text();
  console.log("Reserved: " + res);
  
  }; 

  // Clicking on a mobil sets the selection state
  const selectMobil = (mobil_name, mobil_id) => {
    setSelection({
      ...selection,
      mobil: {
        name: mobil_name,
        id: mobil_id
      }
    });
  };

  // lama sewa dropdown
  const getTimes = _ => {
    let newTimes = [];
    times.forEach(time => {
      newTimes.push(
        <DropdownItem
          key={time}
          className="booking-dropdown-item"
          onClick={_ => {
            let newSel = {
              ...selection,
              mobil: {
                ...selection.mobil
              },
              time: time
            };
            setSelection(newSel);
          }}
        >
          {time}
        </DropdownItem>
      );
    });
    return newTimes;
  };

  // Generating mobils from available mobils state
  const getMobils = _ => {
    console.log("Getting mobils");
    if (getEmptyMobils() > 0) {
      let mobils = [];
      totalMobils.forEach(mobil => {
        if (mobil.isAvailable === false) {
          mobils.push(
            <List
              key={mobil._id}
              id={mobil._id}
              name={mobil.name}
              empty
              res={mobil.reservation.name}
              hp={mobil.reservation.phone}
              email={mobil.reservation.email}
              selectMobil={selectMobil}
            />
          );
        } else {
          mobils.push(
            <List
              key={mobil._id}
              id={mobil._id}
              chairs={mobil.capacity}
              name={mobil.name}
              tipe={mobil.tipe}
              harga={mobil.harga}
              selectMobil={selectMobil}
            />
          );
        }
      });
      return mobils;
    }
  };

  return (
    <div>
      {!selection.mobil.id ? (
        <div id="reservation-stuff">
          <Row noGutters className="text-center align-items-center">
            <Col xs="12" sm="3">
              <input
                type="date"
                required="required"
                className="booking-dropdown"
                value={selection.date.toISOString().split("T")[0]}
                onChange={e => {
                  if (!isNaN(new Date(new Date(e.target.value)))) {
                    let newSel = {
                      ...selection,
                      mobil: {
                        ...selection.mobil
                      },
                      date: new Date(e.target.value)
                    };
                    setSelection(newSel);
                  } else {
                    console.log("Invalid date");
                    let newSel = {
                      ...selection,
                      mobil: {
                        ...selection.mobil
                      },
                      date: new Date()
                    };
                    setSelection(newSel);
                  }
                }}
              ></input>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.time === null ? "Pilih Lama Sewa" : selection.time}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getTimes()} 
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
        </Row>
        <div className="table-cont">
         <Table dark>
          <thead>
            <tr>
              <th>Mobil</th>
              <th>Nama Pemesan</th>
              <th>Nomor Hp</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {selection.date && selection.time ? (
                getEmptyMobils() > 0 ? (
                  
                  getMobils()
                  
                ) : (
                  <tbody>no data</tbody>
                )
              ) : (
                <p className="mobil-display-message">
                  Silahkan pilih tanggal dan lama sewa.
                </p>
              )}
        
          </tbody>
          </Table> 
        </div>     
      </div>
      ) : (
        <p></p> )}
    </div>
  );
};

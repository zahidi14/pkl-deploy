import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button
} from "reactstrap";

import List from "./list";


export default props => {
    const [totalMobils, setTotalMobils] = useState([]);
    const [selection, setSelection] = useState({
        mobil: {
          name: null,
          id: null
        },
        date: new Date(),
        time: null,
        tipe: "Semua Tipe",
        size: 0
      });
    
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
        let time = selection.time.slice(0, -2);
        time = selection.time > 12 ? time + 12 + ":00" : time + ":00";
        console.log(time);
        const datetime = new Date(date + " " + time);
        return datetime;
      };
  useEffect(() => {
  
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.time, selection.date, selection.size, selection.tipe]);

  // Make the reservation if all details are filled out
  const getEmptyMobils = _ => {
    let mobils = totalMobils.filter(mobil => mobil.isAvailable);
    return mobils.length;
  };
  const selectMobil = (mobil_name, mobil_id) => {
    setSelection({
      ...selection,
      mobil: {
        name: mobil_name,
        
        id: mobil_id
      }
    });
  };


  // Generating mobils from available mobils state
  const getMobils = _ => {
    console.log("Getting mobils");
    if (getEmptyMobils() > 0) {
      let mobils = [];
      totalMobils.forEach(mobil => {
        if (mobil.isAvailable) {
          mobils.push(
            <List
              key={mobil._id}
              id={mobil._id}
              chairs={mobil.capacity}
              name={mobil.name}
              tipe={mobil.tipe}
              harga={mobil.harga}
              empty
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
          <p>{getMobils()}</p>
      </div>
    );
};

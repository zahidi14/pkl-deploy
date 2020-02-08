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

import Mobil from "./mobil";


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
    size: 0
  });

  // User's booking details
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: ""
  });

  // List of potential tipes
  const [tipes] = useState(["Semua Tipe", "MPV", "Minibus"]);
  const [times] = useState([
    "12",
    "24",
    
  ]);
  // Basic reservation "validation"
  const [reservationError, setReservationError] = useState(false);

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

  const getEmptyMobils = _ => {
    let mobils = totalMobils.filter(mobil => mobil.isAvailable);
    return mobils.length;
  };

  useEffect(() => {
    // Check availability of mobils from DB when a date and time is selected
    if (selection.time && selection.date) {
      (async _ => {
        let datetime = getDate();
        let res = await fetch("/availability", {
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
    if (
      (booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      console.log("Incomplete Details");
      setReservationError(true);
    } else {
      const datetime = getDate();
      let res = await fetch("/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...booking,
          date: datetime,
          mobil: selection.mobil.id
        })
      });
      res = await res.text();
      console.log("Reserved: " + res);
      props.setPage(2);
    }
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

  // Generate party size dropdown
  const getSizes = _ => {
    let newSizes = [];

    for (let i = 1; i < 20; i++) {
      newSizes.push(
        <DropdownItem
          key={i}
          className="booking-dropdown-item"
          onClick={e => {
            let newSel = {
              ...selection,
              mobil: {
                ...selection.mobil
              },
              size: i
            };
            setSelection(newSel);
          }}
        >
          {i}
        </DropdownItem>
      );
    }
    return newSizes;
  };

  // tipe mobil dropdown
  const getLocations = _ => {
    let newLocations = [];
    tipes.forEach(loc => {
      newLocations.push(
        <DropdownItem
          key={loc}
          className="booking-dropdown-item"
          onClick={_ => {
            let newSel = {
              ...selection,
              mobil: {
                ...selection.mobil
              },
              tipe: loc
            };
            setSelection(newSel);
          }}
        >
          {loc}
        </DropdownItem>
      );
    });
    return newLocations;
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
        if (mobil.isAvailable) {
          mobils.push(
            <Mobil
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
            <Mobil
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
      <Row noGutters className="text-center align-items-center mb-cta">
        <Col>
          <p className="looking-for-mb">
            {!selection.mobil.id ? "Pilih Mobil" : "Konfirmasi Pemesanan"}
            <i
              className={
                !selection.mobil.id
                  ? "fas fa-chair "
                  : "fas fa-clipboard-check "
              }
            ></i>
          </p>
          <p className="selected-mobil">
            {selection.mobil.id
              ? "Anda Menyewa Mobil " + selection.mobil.name 
              : null}
          </p>

          {reservationError ? (
            <p className="reservation-error">
              * Lengkapi data diri.
            </p>
          ) : null}
        </Col>
      </Row>

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
                  {getTimes()} <p>Jam</p>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.tipe}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getLocations()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.size === 0
                    ? "Jumlah Penumpang"
                    : selection.size.toString()}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getSizes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
          <Row noGutters className="mobils-display">
            <Col>
              {getEmptyMobils() > 0 ? (
                <h2 className="available-mobils text-center">{getEmptyMobils()} Mobil Tersedia</h2>
              ) : null}

              {selection.date && selection.time ? (
                getEmptyMobils() > 0 ? (
                  <div>
                    
                    <Row noGutters>{getMobils()}</Row>
                  </div>
                ) : (
                  <p className="mobil-display-message">Mobil sedang tidak tersedia</p>
                )
              ) : (
                <p className="mobil-display-message">
                  Silahkan pilih tanggal dan lama sewa.
                </p>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <div id="confirm-reservation-stuff">
          <Row
            noGutters
            className="text-center justify-content-center reservation-details-container"
          >
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Name"
                className="reservation-input"
                value={booking.name}
                onChange={e => {
                  setBooking({
                    ...booking,
                    name: e.target.value
                  });
                }}
              />
            </Col>
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Phone Number"
                className="reservation-input"
                value={booking.phone}
                onChange={e => {
                  setBooking({
                    ...booking,
                    phone: e.target.value
                  });
                }}
              />
            </Col>
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Email"
                className="reservation-input"
                value={booking.email}
                onChange={e => {
                  setBooking({
                    ...booking,
                    email: e.target.value
                  });
                }}
              />
            </Col>
          </Row>
          <Row noGutters className="text-center">
            <Col>
              <Button
                color="none"
                className="book-mobil-btn"
                onClick={_ => {
                  reserve();
                }}
              >
                Pesan Sekarang
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

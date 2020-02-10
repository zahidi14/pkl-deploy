import React from "react";
import {Button} from "reactstrap";

export default props => {
  return (
    <tr>
        <td>{props.name}</td>
        <td>{props.res}</td>
        <td>{props.hp}</td>
        <td>{props.email}</td>
        <td><Button  onClick={_ => {
          props.empty
            ? props.selectMobil(props.name, props.id)
            : console.log("Tried to select a full mobil");
            
        }}>Hapus</Button></td>
    </tr>
  );
};

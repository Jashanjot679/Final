import React, { useState } from "react";
import { Card, List } from "antd";

import { EditOutlined } from "@ant-design/icons";

import RemoveBoat from "../buttons/RemoveBoat";
import UpdateBoat from "../forms/UpdateBoat";

const getStyles = () => ({
  card: {
    width: "500px",
  },
});

const Boat = (props) => {
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setmake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [personId, setPersonId] = useState(props.personId);
  const [editMode, setEditMode] = useState(false);

  const styles = getStyles();
  // id, year, make, model, price, personId

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "year":
        setYear(value);
        break;
      case "model":
        setModel(value);
        break;
      case "make":
        setmake(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "personId":
        setPersonId(value);
        break;
      default:
        break;
    }
  };

  const handleButtonClick = () => setEditMode(!editMode);

  return (
    <List.Item key={props.id}>
      {editMode ? (
        <UpdateBoat
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          id={props.id}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveBoat
              id={id}
              year={year}
              make={make}
              model={model}
              price={price}
              personId={personId}
            />,
          ]}
          style={styles.card}
        >
          <p>Make: {props.make}</p>
          <p>Model: {props.model}</p>
          <p>Year: {props.year}</p>
          <p>Price: {props.price}</p>
        </Card>
      )}
    </List.Item>
  );
};

export default Boat;

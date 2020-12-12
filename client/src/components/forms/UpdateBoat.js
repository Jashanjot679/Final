import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import { UPDATE_BOAT } from "../../queries";

const UpdateBoat = (props) => {
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setmake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [personId, setPersonId] = useState(props.personId);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, model, make, price, personId } = values;
    updateBoat({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateBoat: {
          __typename: "Boat",
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      },
    });
    props.onButtonClick();
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "year":
        props.updateStateVariable("year", value);
        setYear(value);
        break;
      case "model":
        props.updateStateVariable("model", value);
        setModel(value);
        break;
      case "make":
        props.updateStateVariable("make", value);
        setMake(value);
        break;
      case "price":
        props.updateStateVariable("price", value);
        setPrice(value);
        break;
      case "personId":
        props.updateStateVariable("personId", value);
        setPersonId(value);
        break;
      default:
        break;
    }
  };

  return (
    <Form
      form={form}
      name="update-person-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        year: year,
        model: model,
        make: make,
        price: price,
        personId: personId,
      }}
      size="large"
    >
      <Form.Item
        name="year"
        label="Year"
        rules={[{ required: true, message: "Please input year" }]}
      >
        <Input
          placeholder="i.e. 2010"
          onChange={(e) => updateStateVariable("year", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="model"
        label="Model"
        rules={[{ required: true, message: "Please input model!" }]}
      >
        <Input
          placeholder="i.e. 20W34"
          onChange={(e) => updateStateVariable("model", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="make"
        label="Make"
        rules={[{ required: true, message: "Please input make" }]}
      >
        <Input
          placeholder="i.e. Yamin"
          onChange={(e) => updateStateVariable("make", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please input price!" }]}
      >
        <Input
          placeholder="i.e. 20000"
          onChange={(e) => updateStateVariable("price", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="personId"
        label="personId"
        rules={[{ required: true, message: "Please input personId!" }]}
      >
        <Input
          placeholder="i.e. 1"
          onChange={(e) => updateStateVariable("personId", e.target.value)}
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Person
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateBoat;

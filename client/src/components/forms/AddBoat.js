import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { Form, Input, Button } from "antd";

import { v4 as uuidv4 } from "uuid";

import { ADD_BOAT, GET_BOATS } from "../../queries";

const AddBoat = () => {
  const [id] = useState(uuidv4());
  const [addBoat] = useMutation(ADD_BOAT);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, model, make, price } = values;

    addBoat({
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
        addBoat: {
          __typename: "Boat",
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      },
      update: (proxy, { data: { addBoat } }) => {
        const data = proxy.readQuery({ query: GET_BOATS });
        proxy.writeQuery({
          query: GET_BOATS,
          data: {
            ...data,
            boats: [...data.boats, addBoat],
          },
        });
      },
    });
  };

  return (
    <Form
      form={form}
      name="add-boat-form"
      layout="inline"
      onFinish={onFinish}
      size="large"
      style={{ marginBottom: "40px" }}
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input  year!" }]}
      >
        <Input placeholder="i.e. 2010" />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input model!" }]}
      >
        <Input placeholder="i.e. 2020W1" />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input  make!" }]}
      >
        <Input placeholder="i.e. Yami" />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input price!" }]}
      >
        <Input placeholder="i.e. 2000" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Boat
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddBoat;

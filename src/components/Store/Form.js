import React, { useState } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import Map from "../Map/Map";
import axios from "axios";

export default function StoreForm() {
  const companies = [
    { id: 0, name: "Choose compagny" },
    { id: 1, name: "Carrefour" },
    { id: 2, name: "Franprix" },
    { id: 3, name: "Monoprix" },
    { id: 4, name: "Casino" }
  ];

  const [values, setValues] = useState({
    name: "",
    company: 0,
    address: "",
    city: "",
    zipcode: 0
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.id]: event.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const storeData = {
      name: values.name,
      company: parseInt(values.company),
      address: values.address,
      city: values.city,
      zipcode: parseInt(values.zipcode)
    };

    axios.post("/stores", storeData).then(result => console.log(result));
  };

  return (
    <div>
      <Container>
        <h1>Add Store</h1>
        <Form onSubmit={onSubmit}>
          <div>
            <Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Store name"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  name="company"
                  onChange={handleChange}
                  as="select"
                >
                  {companies.map(company => (
                    <option value={company.id}>{company.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                onChange={handleChange}
                placeholder="Enter address"
              />
            </Form.Group>
            <Row>
              <Form.Group as={Col} controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  onChange={handleChange}
                  placeholder="City"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="zipcode">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="number"
                  name="zipcode"
                  onChange={handleChange}
                  placeholder="Zipcode"
                />
              </Form.Group>
            </Row>
          </div>
          <div style={{ width: "100%", height: "400px" }}>
            <Map />
          </div>
          <div style={{ margin: "20px" }}></div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

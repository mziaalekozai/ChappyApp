import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import "../styles/Register.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";

const Register = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Form className="main-form">
        <Row className="row">
          <Col xs={8}>
            <Stack gap={3}>
              <h2>Register</h2>
              <h2>{user}</h2>

              <Form.Control type="text" placeholder="Enter Name" />
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Control type="password" placeholder="Enter password" />
              <Button variant="primary" type="submit">
                Register
              </Button>
              <Alert variant="danger">
                <p>An error occured</p>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;

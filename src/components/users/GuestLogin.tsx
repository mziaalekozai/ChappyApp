import { useState } from "react";
import { Button, Alert, Row, Col, Stack } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importera useNavigate för navigering

const GuestLogin = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook för att navigera

  const handleGuestLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/guestLogin"
      );
      console.log("Logged in as guest:", response.data.user);
      setError(""); // Rensa tidigare felmeddelanden vid framgångsrik inloggning
      navigate("/channel"); // Navigera till gästvyn
    } catch (err) {
      let message = "Network or server error"; // Standardmeddelande om inget specifikt felmeddelande fångas
      if (axios.isAxiosError(err)) {
        // Kontrollera om det är ett Axios-fel
        message = err.response?.data.message || message; // Använd felmeddelande från servern om det finns
      }
      setError(message); // Sätt felmeddelande baserat på felet
      console.error("Error during guest login:", message);
    }
  };

  return (
    <div className="main-form">
      <Row>
        <Col xs={12} md={8}>
          <Stack gap={3}>
            <Button variant="primary" onClick={handleGuestLogin}>
              Login as Guest
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
          </Stack>
        </Col>
      </Row>
    </div>
  );
};

export default GuestLogin;

// import { useState } from "react";
// import { Button, Alert, Row, Col, Stack } from "react-bootstrap";
// import axios from "axios"; // Importera AxiosError för typkontroller

// const GuestLogin = () => {
//   const [error, setError] = useState("");

//   const handleGuestLogin = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/user/guestLogin"
//       );
//       console.log("Logged in as guest:", response.data.user);
//       setError(""); // Rensa tidigare felmeddelanden vid framgångsrik inloggning
//     } catch (err) {
//       let message = "Network or server error"; // Standardmeddelande om inget specifikt felmeddelande fångas
//       if (axios.isAxiosError(err)) {
//         // Kontrollera om det är ett Axios-fel
//         message = err.response?.data.message || message; // Använd felmeddelande från servern om det finns
//       }
//       setError(message); // Sätt felmeddelande baserat på felet
//       console.error("Error during guest login:", message);
//     }
//   };

//   return (
//     <div className="main-form">
//       {/* <Form className="main-form"> */}
//       <Row className="row">
//         <Col xs={12} md={8}>
//           <Stack gap={3}>
//             <Button variant="primary" onClick={handleGuestLogin}>
//               Login as Guest
//             </Button>
//             {error && <Alert variant="danger">{error}</Alert>}
//           </Stack>
//         </Col>
//       </Row>
//       {/* </Form> */}
//     </div>
//   );
// };

// export default GuestLogin;

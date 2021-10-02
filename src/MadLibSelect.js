import React, {useState} from "react";
import "./MadLibSelect.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


/**  
 * MadLibSelect Component renders select form for user to choice story title 
 * Title corresponds to a particular template in the parent
*/
const MadLibSelect = ({titles, makeChoice}) => {
  const [title, setTitle] = useState(null);
  
  const handleChange = (evt) => {
    setTitle(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const titleInd = +title.slice(6);
    makeChoice(titleInd);
  }

  return (
    <Form className="MadLibSelect mt-4" onSubmit={handleSubmit}>
      <Row className="justify-content-md-center">
        <Col md="6">
          <Form.Select 
            className="MadLibSelect" 
            id="title" 
            name="title" 
            onChange={handleChange}
            required
          >
            <option selected value="" disabled>Choose a MadLib:</option>
            {titles.map((title, idx) => (
              <option value={`option${idx}`}>{title}</option>
            ))}
          </Form.Select>
          <Button className="m-4" type="submit">Select</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default MadLibSelect;
import React, {useState} from "react";
import { v4 as uuid } from 'uuid';
import "./MadLibForm.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**  
 * MadLibForm Component renders form for input user of words given story prompts
 * Submission sends words to parent MadLib component
 * Parent Madlib component constructs the story and re-renders to display the story
*/
const MadLibForm = ({prompts, writeStory}) => {

  const initialState = prompts.reduce((accum, next) => {
    accum[next] = "";
    return accum;
  }, {});
 
  const [formData, setFormData] = useState(initialState);

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    writeStory(formData);
    setFormData(initialState);
  }

  const renderFields = () => (
    prompts.map(prompt => (
      <Form.Group>
        <Form.Control className="MadLibForm-input mb-3"
            type="text"
            name={prompt}
            placeholder={prompt}
            value={formData.prompt}
            onChange={handleChange}
            required
        />
      </Form.Group>
    ))
  )

  return (
    <Form className="MadLibForm mt-4" onSubmit={handleSubmit}>
      <Row className="justify-content-md-center">
        <Col md="6">
          {renderFields()}
          <Button className="m-4" type="submit">Get Story</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default MadLibForm;

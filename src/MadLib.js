import React, {useState} from "react";
import "./MadLib.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MadLibForm from "./MadLibForm";
import MadLibSelect from "./MadLibSelect";


/**  
 * MadLib Component renders all child components.
 * Intial rendering is of "MadLib" title and MadLibSelect form to choose template.
 * Once template is selected, MadLibForm is rendered for user to input story words.
 * Words from form construct the story which is displayed to user.
 * Options to reset with "Restart" and "Cancel" buttons
*/
const MadLib = ({choices=defaultChoices}) => {
  const [choice, setChoice] = useState(null);
  const [story, setStory] = useState(null);

  // Choose title/template to be used for story construction from array of choices
  const makeChoice = (idx) => {
    setChoice(choices[idx]);
  }

  // Write story given template in state given words object
  const writeStory = (words) => {
    setStory(words);

    const storyWords = choice.template.map(ele => {
      if (choice.prompts.includes(ele)) {
        return words[ele];
      } else {
        return ele;
      }
    });
    setStory(storyWords.join(" ")+".");
  }

  // Reset choice and story state variables, causing a re-rendering to the inital screen
  const reset = () => {
    setChoice(null);
    setStory(null);
  }

  const renderMain = () => {
    // If a story is completed, display the story and restart buttons
    if (story) {
      return (
        <>
          <h2>{choice.title}</h2>
          <p> {story} </p>
          <Button onClick={reset}>Restart</Button>
        </>
      )
    // If a template has been chosen but the story is not yet complete, display the input form and cancel button
    } else if (choice) {
      return (
        <>
          <Row>
            <MadLibForm prompts={choice.prompts} writeStory={writeStory} />
          </Row>
          <Row>
            <Col>
              <Button className="btn-secondary" onClick={reset}>Cancel</Button>
            </Col>
          </Row>
        </>
      )
    // If no template has been chosen, display the choice select form
    } else {
      return <MadLibSelect titles={choices.map(ele => ele.title)} makeChoice={makeChoice}/>;
    }
  }
  return (
    <Container className="MadLib">
      <Row className="m-3 justify-content-center">
        <Col>
          <h1 className="MadLib-heading">Madlibs!</h1>
          {renderMain()}
        </Col>
      </Row>
    </Container>
  )
}

// Template should include each elememnt of prompts
// Prompts must be unique
const defaultChoices = [
  {title: "A love story",
   template: ["There was a", "adjective", "noun1", "who loved a", "color", "noun2"],
   prompts: ["noun1", "noun2", "adjective", "color"]
  },
  {title: "Animal escapades",
   template: ["My", "adjective1", "friend named", "name", "went on a trip to", "place", "with a", "adjective2", "animal"],
   prompts: ["name", "animal", "place", "adjective1", "adjective2"]
  },
  {title: "Short but sweet",
  template: ["The", "adjective", "singular noun", "plural verb"],
  prompts: ["singular noun", "adjective", "plural verb"]
 }
]

export default MadLib;
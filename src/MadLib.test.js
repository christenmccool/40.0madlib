import { render, fireEvent } from '@testing-library/react';
import MadLib from './MadLib';

test('renders without crashing', () => {
  render(<MadLib />);
});

test("if matches snapshot", () => {
  const {asFragment} = render(<MadLib />);
  expect(asFragment()).toMatchSnapshot();
})

test("if select form is on initial rendering of page", () => {
  const {queryByText} = render(<MadLib />);

  expect(queryByText("Choose a MadLib:")).toBeInTheDocument();
  expect(queryByText("Get Story")).not.toBeInTheDocument();
})

test("if select form causes a rending of input form", () => {
  const {queryByText, debug} = render(<MadLib />);

  const selectForm = queryByText("Choose a MadLib:").closest("select");
  const selectBtn = queryByText("Select");

  fireEvent.change(selectForm, {target: {value: 'option0'}});
  fireEvent.click(selectBtn);

  expect(queryByText("Choose a MadLib:")).not.toBeInTheDocument();
  expect(queryByText("Get Story")).toBeInTheDocument();
})

test("if input form causes a rending of story", () => {
  const {queryByText, queryByPlaceholderText, debug} = render(<MadLib />);

  const selectForm = queryByText("Choose a MadLib:").closest("select");
  const selectBtn = queryByText("Select");
  fireEvent.change(selectForm, {target: {value: 'option0'}});
  fireEvent.click(selectBtn);

  const noun1 = queryByPlaceholderText("noun1");
  const noun2 = queryByPlaceholderText("noun2");
  const adjective = queryByPlaceholderText("adjective");
  const color = queryByPlaceholderText("color");
  const submitBtn = queryByText("Get Story");


  fireEvent.change(noun1, { target: { value: 'dog' } });
  fireEvent.change(noun2, { target: { value: 'cat' } });
  fireEvent.change(adjective, { target: { value: 'loud' } });
  fireEvent.change(color, { target: { value: 'blue' } });
  fireEvent.click(submitBtn);

  expect(queryByText("Choose a MadLib:")).not.toBeInTheDocument();
  expect(queryByText("Get Story")).not.toBeInTheDocument();
  expect(queryByText("There was a loud dog who loved a blue cat.")).toBeInTheDocument();
  expect(queryByText("Restart")).toBeInTheDocument();
})

test("if cancel button resets page", () => {
  const {queryByText, queryByPlaceholderText, debug} = render(<MadLib />);

  const selectForm = queryByText("Choose a MadLib:").closest("select");
  const selectBtn = queryByText("Select");
  fireEvent.change(selectForm, {target: {value: 'option0'}});
  fireEvent.click(selectBtn);

  const noun1 = queryByPlaceholderText("noun1");
  const noun2 = queryByPlaceholderText("noun2");
  const adjective = queryByPlaceholderText("adjective");
  const color = queryByPlaceholderText("color");
  const submitBtn = queryByText("Get Story");
  fireEvent.change(noun1, { target: { value: 'dog' } });
  fireEvent.change(noun2, { target: { value: 'cat' } });
  fireEvent.change(adjective, { target: { value: 'loud' } });
  fireEvent.change(color, { target: { value: 'blue' } });

  const cancelBtn = queryByText("Cancel");
  fireEvent.click(cancelBtn);

  expect(queryByText("Choose a MadLib:")).toBeInTheDocument();
  expect(queryByText("Get Story")).not.toBeInTheDocument();
  expect(queryByText("There was a loud dog who loved a blue cat.")).not.toBeInTheDocument();
  expect(queryByText("Restart")).not.toBeInTheDocument();
})

test("if restart button resets page", () => {
  const {queryByText, queryByPlaceholderText, debug} = render(<MadLib />);

  const selectForm = queryByText("Choose a MadLib:").closest("select");
  const selectBtn = queryByText("Select");
  fireEvent.change(selectForm, {target: {value: 'option0'}});
  fireEvent.click(selectBtn);

  const noun1 = queryByPlaceholderText("noun1");
  const noun2 = queryByPlaceholderText("noun2");
  const adjective = queryByPlaceholderText("adjective");
  const color = queryByPlaceholderText("color");
  const submitBtn = queryByText("Get Story");
  fireEvent.change(noun1, { target: { value: 'dog' } });
  fireEvent.change(noun2, { target: { value: 'cat' } });
  fireEvent.change(adjective, { target: { value: 'loud' } });
  fireEvent.change(color, { target: { value: 'blue' } });
  fireEvent.click(submitBtn);

  const restartBtn = queryByText("Restart");
  fireEvent.click(restartBtn);

  expect(queryByText("Choose a MadLib:")).toBeInTheDocument();
  expect(queryByText("Get Story")).not.toBeInTheDocument();
  expect(queryByText("There was a loud dog who loved a blue cat.")).not.toBeInTheDocument();
  expect(queryByText("Restart")).not.toBeInTheDocument();
})
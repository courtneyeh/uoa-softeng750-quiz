import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainButton from '../../components/MainButton/MainButton';

const PRESSED_TEXT = 'Pressed';
const NOT_PRESSED_TEXT = 'Not Pressed';

it('loads pressed button correctly', async () => {
  render(<MainButton initialState={true}/>);
  expect(screen.queryByText(PRESSED_TEXT)).toBeEnabled();
  expect(screen.queryByText(NOT_PRESSED_TEXT)).toBeNull();
});

it('loads not pressed button correctly', async () => {
  render(<MainButton initialState={false}/>);
  expect(screen.queryByText(NOT_PRESSED_TEXT)).toBeEnabled();
  expect(screen.queryByText(PRESSED_TEXT)).toBeNull();
});

it('button text changes when pressed (not pressed to pressed)', async () => {
  render(<MainButton initialState={false}/>);
  const button = screen.getByText(NOT_PRESSED_TEXT);
  fireEvent.click(button);

  expect(screen.queryByText(PRESSED_TEXT)).toBeEnabled();
  expect(screen.queryByText(NOT_PRESSED_TEXT)).toBeNull();
});

it('button text changes when pressed (pressed to not pressed)', async () => {
  render(<MainButton initialState={true}/>);
  const button = screen.getByText(PRESSED_TEXT);
  fireEvent.click(button);

  expect(screen.queryByText(NOT_PRESSED_TEXT)).toBeEnabled();
  expect(screen.queryByText(PRESSED_TEXT)).toBeNull();
});

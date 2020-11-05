import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import AnimalForm from './AnimalForm';

test('renders AnimalForm', () => {
  render(<AnimalForm />);
});

test('user can fill out and submit the form', async () => {
  render(<AnimalForm />);

  const speciesInput = screen.getByLabelText(/species/i);
  const ageInput = screen.getByLabelText(/age/i);
  const notesInput = screen.getByLabelText(/notes/i);

  // console.log(speciesInput);

  // fill out the form (top to bottom)
  fireEvent.change(speciesInput, { target: { value: 'dog' } });
  fireEvent.change(ageInput, { target: { value: '11' } });
  fireEvent.change(notesInput, { target: { value: 'woof!' } });

  // assert the forms have the values
  expect(speciesInput).toHaveValue('dog');

  // submit the form - click button - this will sometimes update the page asynchronously
  const button = screen.getByRole("button", { name: /submit!/i });
  fireEvent.click(button);

  // assert the animal has been added to the list
  const newAnimal = await screen.findByText(/dog/i);
  expect(newAnimal).toBeTruthy();
  // console.log(newAnimal);
  // const newAnimal = await screen.findByText(/dog/i);
  expect(newAnimal).toHaveTextContent(/dog/);
});
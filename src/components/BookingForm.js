import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const BookingForm = ({ onBook }) => {
  const [numSeats, setNumSeats] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numSeats > 7) {
      alert('You can only reserve up to 7 seats at a time.');
      return;
    }
    onBook(numSeats);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 4 }}
    >
      <TextField
        type="number"
        label="Number of Seats"
        variant="outlined"
        value={numSeats}
        onChange={(e) => setNumSeats(Math.min(7, Math.max(1, e.target.value)))}
        inputProps={{ min: 1, max: 7 }}
        sx={{ width: 200 }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ height: 56 }}>
        Book Seats
      </Button>
    </Box>
  );
};

export default BookingForm;

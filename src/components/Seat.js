import React from 'react';
import Button from '@mui/material/Button';

const Seat = ({ seat, isPreview }) => {
  const { is_reserved, row_no, seat_number } = seat;

  return (
    <Button
      variant="contained"
      sx={{
        width: 60,
        height: 60,
        fontSize: '0.8rem',
        backgroundColor: is_reserved
          ? '#d32f2f' // Red for reserved seats
          : isPreview
          ? '#ff9800' // Orange for previewed seats
          : '#4caf50', // Green for available seats
        color: '#fff',
        '&:hover': {
          backgroundColor: is_reserved
            ? '#b71c1c' // Darker red for reserved seats on hover
            : isPreview
            ? '#fb8c00' // Darker orange for previewed seats on hover
            : '#388e3c', // Darker green for available seats on hover
        },
        boxShadow: isPreview ? '0 0 10px rgba(255, 152, 0, 0.5)' : 'none',
        borderRadius: 1,
        border: is_reserved ? '1px solid #b71c1c' : '1px solid #4caf50',
      }}
      disabled={is_reserved} // Disable button for reserved seats
    >
      {row_no}-{seat_number}
    </Button>
  );
};

export default Seat;

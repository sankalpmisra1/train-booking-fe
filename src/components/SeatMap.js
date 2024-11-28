import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Box } from '@mui/material';
import Seat from './Seat';
import BookingForm from './BookingForm';

const SeatMap = () => {
  const [seats, setSeats] = useState([]);
  const [coachFull, setCoachFull] = useState(false);
  const [previewSeats, setPreviewSeats] = useState([]);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/seats');
      setSeats(response.data);

      const availableSeats = response.data.filter(seat => !seat.is_reserved);
      setCoachFull(availableSeats.length === 0); // Set coachFull if no available seats
    } catch (err) {
      console.error('Error fetching seats:', err);
    }
  };

  const handleBooking = async (numSeats) => {
    try {
      const response = await axios.post('http://localhost:5000/api/book', { numSeats });

      alert(`Seats booked: ${response.data.bookedSeats.map(
        (seat) => `Row ${seat.row_no}, Seat ${seat.seat_number}`
      ).join(', ')}`);

      fetchSeats(); // Refresh seat data after booking
      setPreviewSeats([]); // Clear preview seats
    } catch (err) {
      alert(err.response?.data?.message || 'Error booking seats');
    }
  };

  const handleBookingPreview = (numSeats) => {
    const rowSeats = seats.reduce((acc, seat) => {
      if (!seat.is_reserved) {
        if (!acc[seat.row_no]) acc[seat.row_no] = [];
        acc[seat.row_no].push(seat);
      }
      return acc;
    }, {});

    for (let row in rowSeats) {
      if (rowSeats[row].length >= numSeats) {
        setPreviewSeats(rowSeats[row].slice(0, numSeats)); // Highlight seats in one row
        return;
      }
    }

    setPreviewSeats(seats.filter(seat => !seat.is_reserved).slice(0, numSeats)); // Highlight nearby seats
  };

  return (
    <Box sx={{ padding: 4, maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Train Seat Booking
      </Typography>
      {coachFull ? (
        <Typography variant="h6" align="center" color="error" gutterBottom>
          The coach is fully booked. No seats available.
        </Typography>
      ) : (
        <BookingForm
          onBook={(numSeats) => {
            handleBookingPreview(numSeats);
            handleBooking(numSeats);
          }}
        />
      )}
      <Grid container spacing={2} sx={{ marginTop: 4 }}>
        {Array.from({ length: 12 }, (_, rowIndex) => (
          <Grid item xs={12} key={rowIndex}>
            <Typography variant="subtitle1" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
              Row {rowIndex + 1}:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                flexWrap: 'wrap',
              }}
            >
              {seats
                .filter((seat) => seat.row_no === rowIndex + 1)
                .map((seat) => (
                  <Seat
                    key={seat.seat_id}
                    seat={seat}
                    isPreview={previewSeats.some((s) => s.seat_id === seat.seat_id)}
                  />
                ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SeatMap;

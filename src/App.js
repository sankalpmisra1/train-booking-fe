import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import SeatMap from './components/SeatMap';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SeatMap />
    </ThemeProvider>
  );
};

export default App;

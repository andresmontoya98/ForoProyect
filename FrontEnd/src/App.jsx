import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppRouter } from "./router/AppRouter";
import { Box, Container } from "@mui/material";
import './App.css';

function App() {
  return (
    <Box className='page'>
      <Header />
      <Container component="main" className="container" maxWidth="md">
        <AppRouter />
      </Container>
      <Box component="footer" className="foot">
        <Footer />
      </Box>
    </Box>
  );
}

export default App;

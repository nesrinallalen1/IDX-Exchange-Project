
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListingsPage from './pages/ListingsPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <BrowserRouter>

      <nav
        style={{
          padding: '15px 20px',
          backgroundColor: '#333',
          display: 'flex',
          gap: '20px'
        }}
      >
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none'
          }}
        >
          Listings
        </Link>

        <Link
          to="/favorites"
          style={{
            color: 'white',
            textDecoration: 'none'
          }}
        >
          Favorites
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<ListingsPage />}
        />

        <Route
          path="/property/:id"
          element={<PropertyDetailPage />}
        />

        <Route
          path="/favorites"
          element={<FavoritesPage />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
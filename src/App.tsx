import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from 'shared/NavBar';
import { PrivateRoute } from 'shared/PrivateRoute';
import Home from './features/home/Home';
import LoginPage from './features/login/LoginPage';
import NewPizzeria from './features/newpizzeria/NewPizzeria';
import NewReview from './features/reviews/NewReview';
import Reviews from './features/reviews/Reviews';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <NavBar />
        <div className="page">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="reviews/:id" element={<Reviews />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="newreview" element={<NewReview />} />
            <Route
              path="newpizzeria"
              element={
                <PrivateRoute>
                  <NewPizzeria />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="home" />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

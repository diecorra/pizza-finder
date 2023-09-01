import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './features/home/Home';
import LoginPage from './features/login/LoginPage';
import NewPizzeria from './features/newpizzeria/NewPizzeria';
import NewReview from './features/reviews/NewReview';
import Reviews from './features/reviews/Reviews';
import { NavBar } from './shared/components/NavBar';
import { PrivateRoute } from './shared/components/PrivateRoute';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      //refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <hr />
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

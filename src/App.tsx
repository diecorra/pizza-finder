import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import City from './features/city/City';
import Home from './features/home/Home';
import MyReviews from './features/myreviews/MyReviews';
import NewReview from './features/newreview/NewReview';
import Settings from './features/settings/Settings';
import { NavBar } from './shared/components/NavBar';

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
            <Route path="myreviews" element={<MyReviews />} />
            <Route path="newreview" element={<NewReview />} />
            <Route path="settings" element={<Settings />} />
            <Route path="city" element={<City />} />

            <Route path="*" element={<Navigate to="home" />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

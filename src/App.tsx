import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Router from 'Router';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from 'shared/NavBar';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <NavBar />
        <div className="page">
          <Router />
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

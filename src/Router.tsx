import { PrivateRoute } from 'shared/PrivateRoute';
import Home from './features/home/Home';
import LoginPage from './features/login/LoginPage';
import NewPizzeria from './features/newpizzeria/NewPizzeria';
import NewReview from './features/reviews/NewReview';
import Reviews from './features/reviews/Reviews';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HOME, LOGIN, NEWPIZZERIA, NEWREVIEW, REVIEWS } from 'routerPath';

const Router = () => {
  return (
    <Routes>
      <Route path={HOME} element={<Home />} />
      <Route path={REVIEWS} element={<Reviews />} />
      <Route path={`${REVIEWS}/:id`} element={<Reviews />} />
      <Route path={LOGIN} element={<LoginPage />} />
      <Route path={NEWREVIEW} element={<NewReview />} />
      <Route
        path={NEWPIZZERIA}
        element={
          <PrivateRoute>
            <NewPizzeria />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to={HOME} />} />
    </Routes>
  );
};

export default Router;

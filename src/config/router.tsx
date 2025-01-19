import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import ProtectedRoute from './protectedroute';
import Home from '@/pages/home';
import Login from '@/pages/login';
import SignUp from '@/pages/signup';

const RouterComponent = () => {
  const authRoutes = [
    {path: '/login', element: <Login />},
    {path: '/signup', element: <SignUp />},
  ];
  const inAppRoutes = [{path: '/home', element: <Home />}];

  return (
    <Routes>
      {authRoutes.map(({path, element}) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<ProtectedRoute />}>
        {inAppRoutes.map(({path, element}) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
};
export default RouterComponent;

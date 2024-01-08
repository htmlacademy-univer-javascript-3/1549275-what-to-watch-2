import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { getAuthCheckedStatus } from '../../store/user/user.selectors';
import { AppRoute } from '../../data/enums/app-route';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector(getAuthCheckedStatus);

  return isAuth ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;

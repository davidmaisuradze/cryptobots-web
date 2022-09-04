import { BrowserRouter as Router, RouteObject, useRoutes } from 'react-router-dom';
import { routes } from './constants/index';
import { PrivateRoute } from './components';
import { BaseLayout } from './components/UI';
import { CreateItem, Market, collectionRoutes, profileRoutes } from './features';

export const ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <Market/>,
    index: true, 
  },
  {
    path: routes.market,
    element: <Market/>,
  },
  {
    path: routes.createItem,
    element: <CreateItem/>
  },
  {
    element: <PrivateRoute/>,
    children: [
      {
        path: routes.users,
        element: <Market/>
      },
    ]
  },
  ...profileRoutes,
  ...collectionRoutes,
];

const RouteRenderer = () => {
  const element = useRoutes(ROUTES);
  return element;
};

export const MarketRoutes = (): JSX.Element => {
  return (
    <Router>
      <BaseLayout>
        <RouteRenderer/>
      </BaseLayout>
    </Router>
  );
};
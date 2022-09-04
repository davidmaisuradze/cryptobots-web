import { Profile, MyAssets, Created, Sold } from '.';
import { routes } from '../../constants';

export const profileRoutes = [
  {
    path: routes.profile.main,
    element: <Profile />,
    children: [
      { path: routes.profile.children.collected, element: <MyAssets /> },
      { path: routes.profile.children.created, element: <Created /> },
      { path: routes.profile.children.sold, element: <Sold /> },
      { path: routes.profile.children.favourites, element: <p>Favourites</p> },
      { path: routes.profile.children.activityHistory, element: <p>Activity History</p> },
      { path: routes.profile.children.receivedOffers, element: <p>Received Offers</p> },
    ],
  },
];

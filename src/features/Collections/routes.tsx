import { routes } from '../../constants';
import { Collections, CreateCollection, CollectionsList } from '.';

export const collectionRoutes = [
  {
    path: routes.collections.main,
    element: <Collections />,
    children: [
      { path: routes.collections.children.main, element: <CollectionsList /> },
      { path: routes.collections.children.create, element: <CreateCollection /> },
    ],
  },
];

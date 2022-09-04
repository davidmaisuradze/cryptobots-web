export const routes = {
  login: '/login',
  market: '/market',
  createItem: '/create-item',
  users: '/users',
  profile: {
    main: '/profile',
    children: {
      collected: '',
      sold: 'sold',
      favourites: 'favourites',
      created: 'created',
      activityHistory: 'activity-history',
      receivedOffers: 'received-offers'
    }
  },
  collections: {
    main: 'collections',
    children: {
      main: '',
      create: 'create'
    },
  },
};

export const profileDropdownRoutes = [
  {
    title: 'Collected',
    to: `${routes.profile.main}/${routes.profile.children.collected}`,
  },
  {
    title: 'Created',
    to: `${routes.profile.main}/${routes.profile.children.created}`,
  },
  {
    title: 'Sold',
    to: `${routes.profile.main}/${routes.profile.children.sold}`,
  },
  {
    title: 'Collections',
    to: routes.collections.main,
  },
  {
    title: 'Favourites',
    to: `${routes.profile.main}/${routes.profile.children.favourites}`,
  },
  {
    title: 'Activity History',
    to: `${routes.profile.main}/${routes.profile.children.activityHistory}`,
  },
  {
    title: 'Received Offers',
    to: `${routes.profile.main}/${routes.profile.children.receivedOffers}`,
  }
];


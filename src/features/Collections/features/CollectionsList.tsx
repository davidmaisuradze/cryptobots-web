import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../constants';

export const CollectionsList = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([
    {
      id: 'id1',
      name: 'collection1'
    },
    {
      id: 'id2',
      name: 'collection2'
    }
  ]);
  
  return (
    <div className="mt-4">
      <div>
        <button 
          onClick={() => navigate(routes.collections.children.create)}
          className="inline-flex items-center px-5 py-3 mb-4 border border-transparent text-md font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Collection
        </button>
      </div>
      {collections.map(collection => (
        <div key={collection.id}>
          <div>{collection.id}</div>
          <div>{collection.name}</div>
        </div>
      ))}
    </div>
  );
};


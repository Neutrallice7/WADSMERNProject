import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../Components/PlaceList';

const DUMMY_PLACES = [
    {
        id:'p1',
        title: 'Empire State Building',
        description: 'Skyscraper wow',
        imageUrl: 'https://fthmb.tqn.com/sBI2W7YNV4vRSVdbRVfASLH3F6I=/2617x3874/filters:fill(auto,1)/5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg',
        address: '20 W 34th St, New York, NY 10118',
        location: {
            lat: 40.748659926512545,
            lng: -73.98567513234116
        },
        creator: 'u1'
    },
    {
        id:'p2',
        title: 'Emp. State Building',
        description: 'Skyscraper wow',
        imageUrl: 'https://fthmb.tqn.com/sBI2W7YNV4vRSVdbRVfASLH3F6I=/2617x3874/filters:fill(auto,1)/5891665274_cc93622eb7_o-56a3ff3b5f9b58b7d0d4df13.jpg',
        address: '20 W 34th St, New York, NY 10118',
        location: {
            lat: 40.748659926512545,
            lng: -73.98567513234116
        },
        creator: 'u2'
    }
];

const UserPlaces = () => {
    // Filtering user ids and the places
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;

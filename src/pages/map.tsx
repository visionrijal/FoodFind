import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Autosuggest from 'react-autosuggest';

const defaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const highlightedIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type Restaurant = {
  Name: string;
  Address: string;
  Latitude: number;
  Longitude: number;
  id: number;
};

const fetchRoute = async (start: [number, number], end: [number, number]) => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();
    const coordinates = data.routes[0].geometry.coordinates;
    return coordinates.map((coord: [number, number]) => [coord[1], coord[0]]); // Swap lat/lng
  } catch (error) {
    console.error('Error fetching route:', error);
    return [];
  }
};

const MapComponent: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<Restaurant[]>([]);
  const [highlightedRestaurant, setHighlightedRestaurant] = useState<Restaurant | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);

  useEffect(() => {
    fetch('/ktmrestro.json')
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => console.error('Error fetching restaurant data:', error));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => console.error('Error getting user location:', error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const nearby = restaurants.filter((restaurant) => {
        const distance = L.latLng(userLocation).distanceTo([restaurant.Latitude, restaurant.Longitude]);
        return distance <= 3000;
      }).slice(0, 10);
      setFilteredRestaurants(nearby);
    }
  }, [userLocation, restaurants]);

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const filteredSuggestions = inputLength === 0 ? [] : restaurants.filter(
      restaurant => restaurant.Name.toLowerCase().startsWith(inputValue) 
    ).slice(0, 5);

    setSuggestions(filteredSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: Restaurant) => suggestion.Name;

  const renderSuggestion = (suggestion: Restaurant) => (
    <div>
      {suggestion.Name}
    </div>
  );

  const onSuggestionSelected = async (event: React.FormEvent, { suggestion }: { suggestion: Restaurant }) => {
    setHighlightedRestaurant(suggestion);
    setSelectedRestaurant(suggestion);
    if (userLocation) {
      const dist = (L.latLng(userLocation).distanceTo([suggestion.Latitude, suggestion.Longitude]) / 1000).toFixed(2);
      setDistance(dist);

      const route = await fetchRoute(userLocation, [suggestion.Latitude, suggestion.Longitude]);
      setRouteCoordinates(route);
    }
  };

  const handleEnterKey = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const matchedRestaurant = suggestions.find(restaurant => restaurant.Name.toLowerCase() === searchValue.toLowerCase());
      if (matchedRestaurant) {
        await onSuggestionSelected(event as any, { suggestion: matchedRestaurant });
      }
    }
  };

  const clearInput = () => {
    setSearchValue('');
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Search for a restaurant',
    value: searchValue,
    onChange: (event: React.ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => {
      setSearchValue(newValue);
    },
    onKeyDown: handleEnterKey,
    className: 'p-2 border border-gray-300 mt-0.5 rounded-md'
  };

  const MapWrapper = () => {
    const map = useMap();

    useEffect(() => {
      if (highlightedRestaurant) {
        map.setView([highlightedRestaurant.Latitude, highlightedRestaurant.Longitude], 15);
      }
    }, [highlightedRestaurant, map]);

    return null;
  };

  const fetchAndSetRoute = async (start: [number, number] | null, end: [number, number]) => {
    if (!start) return;
    const route = await fetchRoute(start, end);
    setRouteCoordinates(route);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Search Restaurant</h1>
        <div className="flex flex-col md:flex-row mb-8">
          <div className="relative">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected}
            theme={{
              container: 'relative',
              suggestionsContainer: 'absolute mt-1 bg-white border border-gray-300 rounded-md z-50',
              suggestionsList: 'list-none p-0 m-0',
              suggestion: 'p-2 cursor-pointer',
              suggestionHighlighted: 'bg-gray-200'
            }}
            />
            {searchValue && (
              <button
                onClick={clearInput}
                className="absolute right-2 top-1 text-gray-500 text-xl p-1"
                aria-label="Clear"
              >
                &times;
              </button>
            )}

          </div>
          {distance && (
            <div className="mt-4 md:mt-3 md:ml-4">Distance : {distance} km</div>
          )}
        </div>
      </div>

      {userLocation && (
        <div style={{ position: 'relative', zIndex: 1 }}>
        <MapContainer center={userLocation} zoom={15} className="h-96 mb-4">
          <MapWrapper />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={userLocation} icon={defaultIcon}>
            <Tooltip direction="top" offset={[0, -30]} opacity={1} permanent>
              You're here
            </Tooltip>
          </Marker>
          {filteredRestaurants.map((restaurant) => (
            <Marker key={restaurant.id} position={[restaurant.Latitude, restaurant.Longitude]} icon={defaultIcon}>
              <Popup>{restaurant.Name}</Popup>
            </Marker>
          ))}
          {routeCoordinates.length > 0 && (
            <Polyline
              positions={routeCoordinates}
              color="blue"
            />
          )}
          {highlightedRestaurant && (
            <Marker position={[highlightedRestaurant.Latitude, highlightedRestaurant.Longitude]} icon={highlightedIcon}>
              <Popup>{highlightedRestaurant.Name}</Popup>
            </Marker>
          )}
        </MapContainer>
        </div>
      )}

      <h1 className="text-3xl font-bold mt-8 mb-2">Nearby Restaurants</h1>
      <p className=" mb-4">These are the top 10 Restaurants found within 3km radius from your current location</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredRestaurants.map((restaurant) => {
          const distance = userLocation
            ? (L.latLng(userLocation).distanceTo([restaurant.Latitude, restaurant.Longitude]) / 1000).toFixed(2)
            : null;
          return (
            <div key={restaurant.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{restaurant.Name}</h2>
                <p>{restaurant.Address}</p>
                <p>{distance} km away</p>
                <button className="btn btn-primary bg-bumblebee border-none hover:bg-yellow-500 mt-2" onClick={() => {
                  setSelectedRestaurant(restaurant);
                  fetchAndSetRoute(userLocation, [restaurant.Latitude, restaurant.Longitude]);
                }}> Show Route </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapComponent;

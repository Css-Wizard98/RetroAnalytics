import {useEffect, useState} from 'react';

function useRecentLocations() {

    const [Cities, setCities] = useState([]);
    const [Places, setPlaces] = useState([]);

    useEffect(() => {
        fetchFromStorage()
    }, []);

    const fetchFromStorage = () => {
        let RecentCities = JSON.parse(localStorage.getItem('recent_cities')||'[]')
        let RecentPlaces = JSON.parse(localStorage.getItem('recent_places')||'[]')
        if(RecentCities.length>5){
            RecentCities = RecentCities.slice(0,5)
        }
        if(RecentPlaces.length>5){
            RecentPlaces = RecentPlaces.slice(0,5)
        }
        if(RecentCities)
        setCities(RecentCities)
        if(RecentPlaces)
        setPlaces(RecentPlaces)
    }

    const addCity = (newCity) => {
        if(!newCity)
        return
        let cities = [...Cities]
        let exists = false
        cities.forEach(oldCity => {
            if(oldCity.name === newCity.name){
                exists = true
            }
        });

        if(!exists){
            cities.push({...newCity, local:true})
            localStorage.setItem('recent_cities', JSON.stringify(cities))
            fetchFromStorage()
        }
    }

    const addPlace = (newPlace) => {
        if(!newPlace)
        return
        let places = [...Places]
        let exists = false
        places.forEach(oldPlace => {
            if(oldPlace===newPlace){
                exists = true
            }
        })
        if(!exists){
            places.push(newPlace.split('@')[1])
            localStorage.setItem('recent_places', JSON.stringify(places))
            fetchFromStorage()
        }
    }

    const removeCity = (index) => {
        let cities = [...Cities]
        cities.splice(index,1)
        localStorage.setItem('recent_cities',JSON.stringify(cities))
        fetchFromStorage()
    }

    const removePlace = (index) => {
        let places = [...Places]
        places.splice(index,1)
        localStorage.setItem('recent_places',JSON.stringify(places))
        fetchFromStorage()
    }

    return {addCity, addPlace, removeCity, removePlace, recentCities: Cities, recentPlaces: Places};
}

export default useRecentLocations;

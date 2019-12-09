import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import Geolocation from 'react-native-geolocation-service'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Container, Input, Text } from '../components'
import { requestLocation } from '../config/permission'
import { API } from '../config/api'
import SearchAutocomplete from '../components/SearchAutocomplete'
import List from '../components/List'

export default function App() {
  const [location, setLocation] = useState({
    granted: false,
    geolocation: {},
    radius: 500,
    name: ``,
    ready: false,
  })
  const [restaurants, setRestaurants] = useState({
    results: [],
    nextToken: ``,
    loading: false,
  })
  useEffect(() => {
    const locationStatus = async () => {
      try {
        const locationPermission = await requestLocation()
        setLocation({
          ...location,
          granted: locationPermission == `granted`,
        })
        console.log(locationPermission, location)
      } catch (error) {
        setLocation({
          ...location,
          granted: false,
        })
        console.log(error)
      }
    }
    locationStatus()
  }, [])
  const getDirections = () => {
    if (location.granted) {
      Geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          if (!location.name) {
            const { results } = await API.getDirectionByGeo(latitude, longitude)
            setLocation({
              ...location,
              name: results[0].formatted_address,
              geolocation: results[0].geometry.location,
            })
          }
        },
        error => {
          console.log(error.code, error.message)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      )
    }
  }
  return (
    <Container backgroundColor="white" flex={1}>
      <Container
        paddingTop={40}
        backgroundColor="#d4f9f5"
        borderTopRightRadius={30}
        borderTopLeftRadius={30}
        marginTop={10}
      >
        <Container
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          marginBottom={20}
        >
          <Icon
            name="location-pin"
            color="#77cac0"
            size={25}
            style={{ marginRight: -10 }}
          />
          <Text p={20} fontSize={20} color="#77cac0" fontWeight={100}>
            Agregar dirección de entrega
          </Text>
        </Container>
      </Container>
      <SearchAutocomplete
        getDirections={getDirections}
        location={location}
        setLocation={setLocation}
        ready={location.ready}
      />
      <List
        location={location}
        setLocation={setLocation}
        restaurants={restaurants}
        setRestaurants={setRestaurants}
      />
    </Container>
  )
}

import React, { useState, useEffect } from 'react'
import { Switch, Image, FlatList, ActivityIndicator } from 'react-native'
import Slider from '@react-native-community/slider'
import _ from 'lodash'
import { Container } from '..'
import Text from '../Text'
import { API } from '../../config/api'

export default function List({
  location,
  setLocation,
  restaurants = { results: [], nextToken: ``, loading: false },
  setRestaurants,
}) {
  const [onlyOpen, setOnlyOpen] = useState(false)
  const [restaurantsFilter, setRestauranstFilter] = useState(restaurants)
  useEffect(() => {
    if (onlyOpen) {
      setRestauranstFilter({
        ...restaurants,
        results: restaurantsFilter.results.filter(
          restaurant =>
            Object.prototype.hasOwnProperty.call(restaurant, `opening_hours`) &&
            restaurant.opening_hours.open_now,
        ),
      })
    } else {
      setRestauranstFilter(restaurants)
    }
  }, [onlyOpen, restaurants])
  useEffect(() => {
    findRestaurants()
    setRestaurants({ results: [], nextToken: ``, loading: false })
  }, [location])
  const findRestaurants = async () => {
    setRestaurants({ ...restaurants, loading: true })
    if (location.ready) {
      try {
        const { lat, lng } = location.geolocation
        const {
          results,
          next_page_token: nextToken,
        } = await API.getRestaurants(
          lat,
          lng,
          location.radius,
          restaurants.nextToken || ``,
        )
        console.log(results, nextToken)
        setRestaurants({
          results: _.uniqBy(restaurants.results.concat(results), `id`),
          nextToken,
          loading: false,
        })
      } catch (error) {
        setRestaurants({ results: [], nextToken: ``, loading: false })
      }
    }
  }
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1
  }
  return (
    <Container flex={1}>
      <Container
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="baseline"
        p={10}
      >
        <Container>
          <Text alignSelf="center">
            Radio de búsqueda: {location.radius} metros
          </Text>
          <Slider
            minimumValue={50}
            maximumValue={500}
            minimumTrackTintColor="#77cac0"
            maximumTrackTintColor="#77cac0"
            value={location.radius}
            onSlidingComplete={value =>
              setLocation({
                ...location,
                radius: parseInt(value, 10),
              })
            }
          />
        </Container>
        <Container alignItems="center">
          <Text>Buscar solo locales abiertos</Text>
          <Switch
            value={onlyOpen}
            onValueChange={value => setOnlyOpen(value)}
          />
        </Container>
      </Container>
      <Container
        type="ScrollView"
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            findRestaurants()
          }
        }}
      >
        {restaurantsFilter.results.map(restaurant => (
          <Container
            p={10}
            key={restaurant.id}
            borderBottomWidth={1}
            borderColor="#eeeeee"
            flexDirection="row"
          >
            <Container>
              <Image
                source={{ uri: restaurant.icon }}
                style={{ width: 45, height: 45 }}
              />
            </Container>
            <Container marginLeft={10}>
              <Text fontSize={20}>{restaurant.name}</Text>
              <Text color="#b7b7b7">{restaurant.vicinity}</Text>
            </Container>
          </Container>
        ))}
      </Container>
      {restaurants.loading && <ActivityIndicator size="large" />}
    </Container>
  )
}

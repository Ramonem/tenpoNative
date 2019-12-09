import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import Input from '../Input'
import { Container } from '..'
import { API } from '../../config/api'
import shadow from '../../styles/shadow'
import Text from '../Text'
import mockPredictions from '../../mocks/mockPredictions'
import Button from '../Button'

const { width } = Dimensions.get(`screen`)

export default function SearchAutocomplete({
  getDirections,
  setLocation,
  location,
  ready,
}) {
  const [predictions, setPredictions] = useState([])
  const getPrediction = async search => {
    setLocation({ ...location, name: search, ready: false })
    if (search.length > 4) {
      try {
        const { predictions } = await API.getPredictions(search)
        console.log(predictions)
        setPredictions(predictions)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const selectLocation = async id => {
    try {
      const {
        result: { geometry, name },
      } = await API.getGeo(id)
      setLocation({
        ...location,
        geolocation: geometry.location,
        ready: true,
        name,
      })
      setPredictions([])
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container justifyContent="center" alignItems="center" marginTop={-20}>
      <Input
        onFocus={() => getDirections()}
        onChangeText={text => getPrediction(text)}
        onChange={() => console.log(`cambio`)}
        style={shadow.primary}
        fontSize={18}
        width={width}
        p={15}
        backgroundColor="white"
        placeholder="Escribe tu dirección"
        borderRadius={25}
        value={location.name}
        onSubmitEditing={() => getPrediction(location.name)}
      />
      {predictions.length ? (
        <Container backgroundColor="white" width={width} p={10} marginTop={-10}>
          {predictions.map(prediction => (
            <Button
              p={10}
              borderColor="#eeeeee"
              borderBottomWidth={1}
              key={prediction.place_id}
              onPress={() => selectLocation(prediction.place_id)}
            >
              <Text fontSize={22}>
                {prediction.structured_formatting.main_text}
              </Text>
              <Text fontSize={18} color="#b7b7b7">
                {prediction.structured_formatting.secondary_text}
              </Text>
            </Button>
          ))}
        </Container>
      ) : (
        !location.ready && (
          <Container justifyContent="center" alignItems="center" marginTop={30}>
            <Text color="#b7b7b7" fontSize={22}>
              Esperando tu ubicación..
            </Text>
          </Container>
        )
      )}
    </Container>
  )
}

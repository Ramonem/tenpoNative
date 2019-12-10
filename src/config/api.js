import axios from 'axios'

const URL = endpoint =>
  `https://maps.googleapis.com/maps/api/place/${endpoint}/json?key=KEY`

export const API = {}

function validateRequest(request) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await request()
      console.log(data)
      if (data.status === `OK`) {
        resolve(data)
      } else {
        console.error(data.status)
        reject(data.status)
      }
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

API.getPredictions = search =>
  validateRequest(() =>
    axios.get(
      `${URL(`autocomplete`)}&input=${search}&types=geocode&language=es`,
    ),
  )
API.getGeo = id =>
  validateRequest(() => axios.get(`${URL(`details`)}&placeid=${id}`))

API.getRestaurants = (latitude, longitude, radius, pageToken) =>
  validateRequest(() =>
    axios.get(
      `${URL(
        `search`,
      )}&location=${latitude},${longitude}&radius=${radius}&sensor=false&types=restaurant&pagetoken=${pageToken}`,
    ),
  )

API.getDirectionByGeo = (latitude, longitude) =>
  validateRequest(() =>
    axios.get(
      `${URL(`geocode`)}&latlng=${latitude},${longitude}`.replace(`/place`, ``),
    ),
  )

import { PermissionsAndroid } from 'react-native'

const requestLocation = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: `¿Permitir acceder a la ubicación?`,
          message: `Necesitamos tu ubicación para acceder a los restaurantes cercanos`,
          buttonNeutral: `Ask Me Later`,
          buttonNegative: `Cancel`,
          buttonPositive: `OK`,
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        resolve(granted)
      } else {
        reject(granted)
      }
    } catch (error) {
      console.warn(error)
      reject(error)
    }
  })
}

export { requestLocation }

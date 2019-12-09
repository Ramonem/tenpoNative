import styled from 'styled-components/native'
import {
  space,
  border,
  color,
  layout,
  flexbox,
  position,
  shadow,
  compose,
} from 'styled-system'

const Button = styled.TouchableOpacity`
  ${compose(space, border, color, layout, flexbox, position, shadow)}
`
export default Button

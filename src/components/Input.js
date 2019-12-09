import styled from 'styled-components/native'
import {
  typography,
  compose,
  color,
  layout,
  space,
  border,
  flexbox,
  position,
  shadow,
} from 'styled-system'

const Input = styled.TextInput`
  ${compose(
    typography,
    color,
    layout,
    space,
    border,
    flexbox,
    position,
    shadow,
  )}
  box-shadow: 10px 5px 15px rgba(0, 0, 0, 0.15);
`

export default Input

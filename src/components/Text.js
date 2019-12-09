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
} from 'styled-system'

const Text = styled.Text`
  ${compose(
    typography,
    color,
    layout,
    space,
    border,
    flexbox,
    position,
  )}
`

export default Text

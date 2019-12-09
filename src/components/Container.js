import React from 'react'
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

const View = styled.View`
  ${compose(space, border, color, layout, flexbox, position, shadow)}
`

const ScrollView = styled.ScrollView`
  ${compose(space, border, color, layout, flexbox, position, shadow)}
`

export default function Container({ type, children, ...props }) {
  return type === `ScrollView` ? (
    <ScrollView {...props}>{children}</ScrollView>
  ) : (
    <View {...props}>{children}</View>
  )
}

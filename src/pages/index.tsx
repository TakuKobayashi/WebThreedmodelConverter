import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
//import { BabylonScene } from '../components/babylon-scene'
import { ThreeScene } from '../components/three-scene'

const IndexPage = () => (
  <IndexLayout>
    <ThreeScene />
  </IndexLayout>
)

export default IndexPage

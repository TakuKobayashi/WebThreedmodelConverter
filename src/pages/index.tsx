import { useState } from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import { FileMenu } from '../components/file-menu'
//import { BabylonScene } from '../components/babylon-scene'
import { ThreeScene } from '../components/three-scene'

const IndexPage = () => {
  const [threedUrl, setThreedUrl] = useState('')

  const fileUploadHandle = (files: File[]) => {
    console.log(files)
    for (const file of files) {
      setThreedUrl(URL.createObjectURL(file))
    }
  }

  return (
    <IndexLayout>
      <FileMenu onUploadFile={fileUploadHandle} />
      <ThreeScene url={threedUrl} />
    </IndexLayout>
  )
}

export default IndexPage

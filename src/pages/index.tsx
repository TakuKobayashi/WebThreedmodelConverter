import IndexLayout from '../layouts'
import { FileMenu } from '../components/file-menu'
//import { BabylonScene } from '../components/babylon-scene'
import { ThreeScene } from '../threeds/three-scene'

const IndexPage = () => {
  let threeScene: ThreeScene | null = null;
  const handleCanvasLoad = (canvas: HTMLCanvasElement) => {
    threeScene = new ThreeScene(canvas);
  }

  const fileUploadHandle = (files: File[]) => {
    console.log(files)
    for (const file of files) {
      threeScene?.loadVRM(URL.createObjectURL(file))
    }
  }

  const exportFileHandle = (fileFormat: string) => {
    console.log(fileFormat)
    threeScene?.exportFile(fileFormat)
  }

  return (
    <IndexLayout>
      <FileMenu onUploadFile={fileUploadHandle} onExport={exportFileHandle}/>
      <canvas style={{ width: '80vw', height: '40vw' }} ref={handleCanvasLoad} />
    </IndexLayout>
  )
}

export default IndexPage

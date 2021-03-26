import * as React from 'react'
import { WebGLRenderer, Scene, PerspectiveCamera, DirectionalLight, Color } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM } from '@pixiv/three-vrm'

interface LoadURLProps {
  url: string
}

export class ThreeScene extends React.Component<LoadURLProps, {}> {
  private canvas: HTMLCanvasElement | null = null
  private scene: Scene | null = null
  private camera: PerspectiveCamera | null = null
  private renderer: WebGLRenderer | null = null
  private frameId: number | null = null

  constructor(props: LoadURLProps) {
    super(props)
    this.animate = this.animate.bind(this)
  }

  private loadVRM(url: string) {
    const gltfLoader = new GLTFLoader()
    gltfLoader.load(
      url,
      (gltf: Scene) => {
        VRM.from(gltf).then((vrm: VRM) => {
          if (this.scene) {
            this.scene.add(vrm.scene)
          }
        })
      },
      (progress: ProgressEvent) => {
        console.log(progress.loaded / progress.total)
      },
      (error: ErrorEvent) => {
        console.error(error)
      }
    )
  }

  private initScene(canvas: HTMLCanvasElement) {
    if (!canvas) {
      return
    }
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true })
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    this.canvas = canvas
    const scene = new Scene()
    scene.background = new Color(0x212121)

    const directionalLight = new DirectionalLight(0xffffff)
    directionalLight.position.set(0, 1, -2)
    scene.add(directionalLight)

    this.scene = scene
    const camera = new PerspectiveCamera(50, width / height, 0.01)
    camera.position.set(0, 1.5, -1.5)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0.75 * 1.5, 0)
    controls.update()
    this.camera = camera
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer = renderer
    this.animate()
  }

  onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    this.initScene(canvas)
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId!)
    if (this.canvas && this.renderer) {
      this.canvas.removeChild(this.renderer.domElement)
    }
  }

  animate() {
    // 次のフレームを要求
    this.frameId = window.requestAnimationFrame(this.animate)
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }

  render() {
    const loadVrmUrl = this.props.url
    if (loadVrmUrl) {
      this.loadVRM(loadVrmUrl)
    }
    return (
      <div>
        <canvas style={{ width: '80vw', height: '40vw' }} ref={this.onCanvasLoaded} />
      </div>
    )
  }
}

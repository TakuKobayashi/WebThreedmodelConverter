import * as React from 'react'
import { WebGLRenderer, Scene, PerspectiveCamera, DirectionalLight, Color } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM } from '@pixiv/three-vrm'
export class ThreeScene {
  private canvas: HTMLCanvasElement
  private scene: Scene | null = null
  private camera: PerspectiveCamera | null = null
  private renderer: WebGLRenderer | null = null
  private frameId: number | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.animate = this.animate.bind(this)
    this.initScene();
  }

  loadVRM(url: string) {
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

  exportFile(fileType: string){

  }

  private initScene() {
    const renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true })
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
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

  clear() {
    cancelAnimationFrame(this.frameId!)
    if (this.canvas && this.renderer) {
      this.canvas.removeChild(this.renderer.domElement)
    }
  }

  private animate() {
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

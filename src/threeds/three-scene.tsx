import { WebGLRenderer, Scene, PerspectiveCamera, DirectionalLight, Color } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GLTFExporter } from "three/examples/js/exporters/GLTFExporter";
import { VRM } from '@pixiv/three-vrm'
export class ThreeScene {
  private canvas: HTMLCanvasElement
  private scene: Scene
  private renderer: WebGLRenderer
  private objScene: Scene | null = null
  private camera: PerspectiveCamera | null = null
  private frameId: number | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.scene = new Scene()
    this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true })
    this.animate = this.animate.bind(this)
    this.initScene();
  }

  loadVRM(url: string) {
    const gltfLoader = new GLTFLoader()
    gltfLoader.load(
      url,
      (gltf: Scene) => {
        VRM.from(gltf).then((vrm: VRM) => {
          console.log(vrm)
          this.scene.add(vrm.scene)
          this.objScene = vrm.scene
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
    if(!this.objScene){
      return;
    }
    const exporter = new GLTFExporter();
    exporter.parse(this.objScene, (gltf: any) => {
      console.log( gltf );
      const blob =  new Blob([JSON.stringify(gltf)], { type: 'text/json' });
      this.downloadFile("sample.gltf", blob)
    }, {});
  }

  downloadFile(fileName: string, fileBlob: Blob){
    const jsonURL = window.URL.createObjectURL(fileBlob);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute('download', fileName);
    link.click();
    document.body.removeChild(link);
  }

  private initScene() {
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    this.scene.background = new Color(0x212121)

    const directionalLight = new DirectionalLight(0xffffff)
    directionalLight.position.set(0, 1, -2)
    this.scene.add(directionalLight)

    const camera = new PerspectiveCamera(50, width / height, 0.01)
    camera.position.set(0, 1.5, -1.5)
    const controls = new OrbitControls(camera, this.renderer.domElement)
    controls.target.set(0, 0.75 * 1.5, 0)
    controls.update()
    this.camera = camera
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
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
}

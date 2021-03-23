import {Component} from 'react'
import { Engine, Scene, SceneLoader, ArcRotateCamera, Vector3, DirectionalLight } from "@babylonjs/core";

import 'babylon-vrm-loader'
const path = require('path')

export class BabylonScene extends Component<{}, {}> {
  private canvas: HTMLCanvasElement | null = null
  private scene: Scene | null = null

  constructor(props: any) {
    super(props)
  }

  componentDidMount() {}

  private async loadVRM(url: string): Promise<void> {
    if(!this.scene){
      return;
    }
    const dirname = path.dirname(url)
    const filename = path.basename(url)
    console.log(dirname)
    console.log(filename)
    const loadScene = await SceneLoader.AppendAsync(dirname + "/", filename,  this.scene)
  }

  private initScene(canvas: HTMLCanvasElement) {
    if (!canvas) {
      return
    }
    const engine = new Engine(canvas, true);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.canvas = canvas
    const scene = new Scene(engine);
    engine.runRenderLoop(() => {
      scene.render();
    });
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      engine.resize();
    });
    this.scene = scene;
    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 3, new Vector3(0, 1, 0), scene);
    camera.attachControl(canvas, true);
    const light = new DirectionalLight("light", new Vector3(0, -1, 0), scene);

    this.loadVRM('https://taptappun.s3-ap-northeast-1.amazonaws.com/test/AliciaSolid.vrm')
  }

  onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    this.initScene(canvas)
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <canvas ref={this.onCanvasLoaded} />
      </div>
    )
  }
}

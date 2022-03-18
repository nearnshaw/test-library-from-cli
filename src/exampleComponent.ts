@Component('rotatorComponent')
export class RotatorComponent {
  constructor(public speed: number = 1) {}
}

@Component('coin')
export class CoinComponent {
  public isConverted: boolean = false
  constructor() {}
}

class RotatorSystem {
  group = engine.getComponentGroup(RotatorComponent)

  update(dt: number) {
    for (let entity of this.group.entities) {
      const transform = entity.getComponent(Transform)

      let speed = entity.getComponent(RotatorComponent).speed

      transform.rotate(Vector3.Up(), dt * speed)
    }
  }
}

engine.addSystem(new RotatorSystem())

class UpdateCoinsSystem {
  group = engine.getComponentGroup(CoinComponent)

  update(dt: number) {
    for (let entity of this.group.entities) {
      if (!entity.getComponent(CoinComponent).isConverted) {
        entity.getComponent(CoinComponent).isConverted = true

        // entity.addComponentOrReplace(new GLTFShape('assets/coin.glb'))
        // entity.addComponentOrReplace(
        //   new AudioSource(new AudioClip('assets/coinPickup.mp3'))
        // )

        entity.addComponentOrReplace(
          new OnPointerDown(
            () => {
              //   entity.getComponent(AudioSource).playOnce()
              engine.removeEntity(entity)
            },
            { hoverText: 'Pick up', button: ActionButton.PRIMARY }
          )
        )
      }
    }
  }
}

engine.addSystem(new UpdateCoinsSystem())
//

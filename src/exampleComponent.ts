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
  // this group will contain every entity that has a RotatorComponent
  group = engine.getComponentGroup(RotatorComponent)

  update(dt: number) {
    // iterate over the entities of the group
    for (let entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform)

      let speed = entity.getComponent(RotatorComponent).speed

      // mutate the rotation
      transform.rotate(Vector3.Up(), dt * speed)
    }
  }
}

engine.addSystem(new RotatorSystem())

class UpdateCoinsSystem {
  // this group will contain every entity that has a RotatorComponent
  group = engine.getComponentGroup(CoinComponent)

  update(dt: number) {
    // iterate over the entities of the group
    for (let entity of this.group.entities) {
      if (!entity.getComponent(CoinComponent).isConverted) {
        entity.getComponent(CoinComponent).isConverted = true

        entity.addComponent(new GLTFShape('assets/coin.glb'))
        entity.addComponent(
          new AudioSource(new AudioClip('assets/coinPickup.mp3'))
        )

        entity.addComponent(
          new OnPointerDown(
            () => {
              entity.getComponent(AudioSource).playOnce()
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

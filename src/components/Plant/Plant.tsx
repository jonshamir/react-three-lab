import { useControls } from "leva";
import { Euler } from "three";
import { range, saturate } from "../utils";
import { Leaf } from "./Leaf";

const GOLDEN_ANGLE = 2.39996;

interface PlantProps {
  age: number;
  position?: [number, number, number];
  rotation?: Euler;
}

export function Plant({ age: n, ...props }: PlantProps) {
  const { matureAge } = useControls({
    matureAge: { value: 180, min: 1, max: 300, step: 1 },
  });
  const layerHeight = 0.03;
  return (
    <group rotation-z={saturate(-0.5) * Math.PI} {...props}>
      {range(0, n).map((i) => {
        const age = saturate((n - i) / matureAge); // 0 = new, 1 = mature
        const dyingStage = saturate((age - 0.5) * 2); // 0 = not dying, 1 = dead
        const growingStage = Math.pow(saturate(age * 2), 0.3); // 0 = new, 1 = fully grown

        // rotation
        const yaw = GOLDEN_ANGLE * i + 0.02 * n;
        const pitch = Math.PI * (1.5 - 0.5 * age) - dyingStage * 1.4;
        const rotation = new Euler(pitch, yaw, 0);
        rotation.order = "YXZ";

        // position
        // const y = -(1 + ageIndex * layerHeight);
        // const y = i * layerHeight;
        const y = Math.pow(growingStage, 0.3) * i * layerHeight;

        return (
          <Leaf
            key={i}
            age={growingStage}
            position={[0, y, 0]}
            rotation={rotation}
          />
        );
      })}
    </group>
  );
}

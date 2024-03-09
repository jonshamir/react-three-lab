import { useRef } from "react";
import { CubicBezierCurve3, Euler, Mesh, Vector3 } from "three";
import { saturate } from "../utils";

interface LeafProps {
  position: [number, number, number];
  age: number;
  rotation?: Euler;
}

export function Leaf({ age, ...props }: LeafProps) {
  const meshRef = useRef<Mesh>(null!);

  const length = age * 0.5;

  const controlPointOffset = Math.pow(saturate(age - 0.2), 3) * 0.6;

  const point1 = new Vector3(0, -length, 0);
  const controlPoint1 = new Vector3(0, -length * 0.3, controlPointOffset);
  const controlPoint2 = new Vector3(0, length * 0.3, controlPointOffset);
  const point2 = new Vector3(0, length, 0);

  const curve = new CubicBezierCurve3(
    point1,
    controlPoint1,
    controlPoint2,
    point2
  );

  return (
    <group {...props}>
      <mesh position-z={length / 2} rotation-x={Math.PI / 2} ref={meshRef}>
        {/* <boxGeometry args={[0.1, 0.1, length]} translate-z={3} /> */}
        {/* <cylinderGeometry args={[0.1, 0.1, length, 3, 4]} /> */}
        <tubeGeometry args={[curve, 20, 0.1, 4, false]} />
        <meshNormalMaterial flatShading={true} />
      </mesh>
    </group>
  );
}

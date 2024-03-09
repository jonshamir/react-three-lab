import { useRef } from "react";
import {
  CubicBezierCurve3,
  Euler,
  Mesh,
  QuadraticBezierCurve3,
  Shape,
  ShapeUtils,
  Vector3,
} from "three";
import { saturate } from "../utils";

interface LeafProps {
  position: [number, number, number];
  age: number;
  rotation?: Euler;
}

export function Leaf({ age, ...props }: LeafProps) {
  const meshRef = useRef<Mesh>(null!);

  const length = age * 0.5;
  const width = age * 0.05;

  const controlPointOffset = Math.pow(saturate(age - 0.2), 3) * 0.6;

  const point1 = new Vector3(0, -length, 0);
  const controlPoint = new Vector3(0, 0, controlPointOffset);
  const point2 = new Vector3(0, length, 0);

  const curve = new QuadraticBezierCurve3(point1, controlPoint, point2);

  const crossSectionShape = new Shape();
  crossSectionShape.moveTo(0, width);
  crossSectionShape.lineTo(width * 2, 0);
  crossSectionShape.lineTo(0, -width);
  crossSectionShape.lineTo(-width * 2, 0);
  crossSectionShape.lineTo(0, width);

  const extrudeSettings = {
    steps: 10,
    depth: 16,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 1,
    bevelSegments: 4,
    extrudePath: curve,
  };

  return (
    <group {...props}>
      <mesh position-z={length} rotation-x={Math.PI / 2} ref={meshRef}>
        {/* <boxGeometry args={[0.1, 0.1, length]} translate-z={3} /> */}
        {/* <cylinderGeometry args={[0.1, 0.1, length, 3, 4]} /> */}
        {/* <tubeGeometry args={[curve, 20, 0.1, 4, false]} /> */}
        <extrudeGeometry args={[crossSectionShape, extrudeSettings]} />
        <meshNormalMaterial flatShading={true} />
      </mesh>
    </group>
  );
}

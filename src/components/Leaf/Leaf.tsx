import { useRef } from "react";
import { Euler, Mesh } from "three";

interface LeafProps {
  position: [number, number, number];
  age: number;
  rotation?: Euler;
}

export function Leaf({ age, ...props }: LeafProps) {
  const meshRef = useRef<Mesh>(null!);

  const length = age * 1;

  return (
    <group {...props}>
      <mesh position-z={length / 2} rotation-x={Math.PI / 2} ref={meshRef}>
        {/* <boxGeometry args={[0.1, 0.1, length]} translate-z={3} /> */}
        <cylinderGeometry args={[0.1, 0.1, length, 3, 4]} />
        <meshNormalMaterial flatShading={true} />
      </mesh>
    </group>
  );
}

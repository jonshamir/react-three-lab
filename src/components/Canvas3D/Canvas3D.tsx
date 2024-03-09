import styled from "@emotion/styled";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useState } from "react";
import { Plant } from "../Plant/Plant";

const Canvas3DContainer = styled.div`
  width: 90vw;
  height: 90vh;
  background-color: #363a44;
  outline: 2px solid black;

  canvas {
    image-rendering: pixelated;
  }
`;

export function Canvas3D() {
  const { n } = useControls({
    n: { value: 160, min: 0, max: 220, step: 1 },
  });

  const [age, setAge] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAge((age) => (age + 1) % 230);
    }, 30);
    return () => clearInterval(interval);
  });

  const agee = Math.max(0, age - 20);

  return (
    <Canvas3DContainer>
      <Canvas
        camera={{ fov: 15, position: [0, 5, -10] }}
        gl={{ antialias: true }}
      >
        <OrbitControls position={[0, 0, 0]} />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

        <Plant age={n} position={[0, -3, 0]} />
        {/* <Leaf age={0.8} position={[0, 0, 0]} /> */}
      </Canvas>
    </Canvas3DContainer>
  );
}

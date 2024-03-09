import styled from "@emotion/styled";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
  Noise,
} from "@react-three/postprocessing";
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

  const frame = Math.max(0, age - 20);

  return (
    <Canvas3DContainer>
      <Canvas
        camera={{ fov: 15, position: [0, 5, -10] }}
        gl={{ antialias: true, clearColor: 0x363a44 }}
      >
        <color attach="background" args={["#363a44"]} />
        <OrbitControls position={[0, 0, 0]} />
        <ambientLight intensity={Math.PI / 2} />

        <Plant age={frame} position={[0, -3, 0]} />

        <EffectComposer>
          <BrightnessContrast brightness={0} contrast={0} />
          <HueSaturation hue={0.1} saturation={0} />
          {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
          <Noise opacity={0.1} />
        </EffectComposer>
      </Canvas>
    </Canvas3DContainer>
  );
}

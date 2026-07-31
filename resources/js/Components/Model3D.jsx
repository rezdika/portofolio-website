import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';

function Model({ url }) {
    const { scene } = useGLTF(url);
    const ref = useRef();

    useFrame((state) => {
        if (!ref.current) return;
        // Gentle auto-rotate
        ref.current.rotation.y += 0.004;
        // Subtle floating
        ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    });

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={1.8}
            position={[0, -0.5, 0]}
        />
    );
}

function Loader() {
    return (
        <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="white" wireframe opacity={0.2} transparent />
        </mesh>
    );
}

export default function Model3D({ url = '/assets/animasi/3D PRINT.glb' }) {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <directionalLight position={[-5, -2, -5]} intensity={0.3} color="#8888ff" />
                <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffffff" />

                <Suspense fallback={<Loader />}>
                    <Model url={url} />
                    <ContactShadows
                        position={[0, -1.5, 0]}
                        opacity={0.3}
                        scale={4}
                        blur={2}
                        far={2}
                        color="#000000"
                    />
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.8}
                    autoRotate={false}
                />
            </Canvas>
        </div>
    );
}

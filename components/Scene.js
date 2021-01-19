import * as THREE from 'three';
import { Suspense, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, extend, useLoader } from "react-three-fiber";
import { Physics, useBox, usePlane } from "use-cannon";
import { useDrag } from "react-use-gesture";
import GLTFLoader from 'three-gltf-loader';

function Plane(props) {
  const [ref] = usePlane(() => ({ mass: 0, ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <shadowMaterial attach="material" color="#fff" opacity={0.5} />
    </mesh>
  )
}

//individual letter component
function Letter({url, id, ...props}) {
  const [position, setPosition] = useState(); //useState stores a persistent state and takes a function when state updates
  const [quaternion, setQuaternion] = useState([0, 0, 0, 0]);
  const { size, viewport } = useThree(); //hook to detect size of viewport
  const aspect = size.width / viewport.width; //aspect ratio

  //load gltf model
  const { nodes, materials } = useLoader(GLTFLoader, "/models/" + url + ".glb");

  //create a box w initial mass, dimensions, and position
  const [ref, api] = useBox(() => ({ mass: 10, args:[.4, 1, .2], position: props, ...props }))

  //click and drag to move. temporarily sets mass to 0 when dragging, then reset to original mass.
  const bind = useDrag(({ offset: [,], xy: [x, y], first, last }) => {
        if (first) {
            api.mass.set(0);
        } else if (last) {
            api.mass.set(10);
        }
        api.position.set((x - size.width / 2) / aspect, -(y - size.height / 2) / aspect, 0);
    }, { pointerEvents: true });

  //spread operators get value from previous position/quaternion if unchanged
  //stopPropagation disables click events during drags
  return (
    <mesh receiveShadow
      castShadow
      ref={ref}
      geometry={nodes.svgMesh1.geometry}
      position={position} {...bind()}
      quaternion={quaternion} {...bind()}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <meshLambertMaterial attach="material" color={props.color}/>
    </mesh>
  )
}

const Scene = () => {
  // ------CHANGE CMMND COLORS HERE------
  const [letters, setLetters] = useState([
    <Letter url="c"  id={Math.random()} color="#454746" position={[-1, 4, 0]} rotation={[Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0]} />,
    <Letter url="m" id={Math.random()} color="#454746" position={[-.5, 4, 0]} rotation={[Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0]} />,
    <Letter url="m" id={Math.random()} color="#454746" position={[0, 4, 0]} rotation={[Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0]} />,
    <Letter url="n" id={Math.random()} color="#454746" position={[.5, 4, 0]} rotation={[Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0]} />,
    <Letter url="d" id={Math.random()} color="#454746" position={[1, 4, 0]} rotation={[Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0]} />
  ]);
  // ------CHANGE RANDOMIZED COLORS HERE------
  const colors = ["#db668a", "#958c70", "#95c5e2"];

  const start = useRef(false);
  // useFrame executes every frame
  // passing a prop attaches a clock to it that starts upon initialization
  // getElapsedTime() is in seconds
  useFrame((start) => {
    // after 5 seconds, start generating letters
    if (start.clock.getElapsedTime() > 4.5) {
      start.current = true;
      start.clock.start();
    } else if (start.current && (start.clock.getElapsedTime() > 1)) {
      // generate 1 letter per second
      // in the future, fine-tune position to be a normal distributon based on viewport width
      const position = [Math.random()*4*(Math.random() < 0.5 ? -1 : 1), 4, 0];
      const rotation = [Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0];
      var url;
      switch(true) {
        case (Math.random() < 0.2):
          url = 'c';
          break;
        case (Math.random() < 0.4):
          url = 'n';
          break;
        case (Math.random() < 0.6):
          url = 'd';
          break;
        case (Math.random() < 0.8):
          url = 'm';
          break;
        default:
          url = ',&';
      }
      setLetters([...letters,
      <Letter url={url} id={Math.random()} color={colors[Math.floor(Math.random()*(colors.length))]} position={position} rotation={rotation} />]);
      start.clock.start();
    }
  });

  return (
    <>
      <color attach="background" args={['white']} />
      <ambientLight intensity={0.5} />
      <spotLight position={[1, 4, 5]} angle={.8} intensity={1} castShadow/>
      <Physics gravity={[0, -1, 0]} defaultContactMaterial={{ restitution: 0.6 }}>
        <Plane position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} args={[50, 50]}/>
        <Plane position={[0, 1, -2]} args={[50, 50]}/>
        <Suspense fallback={null}>
          {letters}
        </Suspense>
      </Physics>
    </>
  )

}

export default Scene;

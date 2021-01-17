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

function Letter({url, id, position: initialPosition, ...props}) {
  const [position, setPosition] = useState(initialPosition); //useState stores a persistent state and takes a function when state updates
  const [quaternion, setQuaternion] = useState([0, 0, 0, 0]);
  const { size, viewport } = useThree(); //hook to detect size of viewport
  const aspect = size.width / viewport.width; //aspect ratio

  //load gltf model
  const { nodes, materials } = useLoader(GLTFLoader, "/models/" + url + ".glb");

  //create a box w initial mass of 10 and dimensions of .4, 1, .2
  const [ref, api] = useBox(() => ({ mass: 10, args:[.4, 1, .2], position: initialPosition, ...props }))

  //click and drag to move. temporarily sets mass to 0 when dragging, then reset to original mass.
  const bind = useDrag(({ offset: [,], xy: [x, y], first, last }) => {
        if (first) {
            api.mass.set(0);
        } else if (last) {
            api.mass.set(10);
        }
        api.position.set((x - size.width / 2) / aspect, -(y - size.height / 2) / aspect, 0);
    }, { pointerEvents: true });
  // useFrame(state => {
  //   const t = state.clock.getElapsedTime()
  //   api.position.set(Math.sin(t * 2) * 5, Math.cos(t * 2) * 5, 3)
  //   api.rotation.set(Math.sin(t * 6), Math.cos(t * 6), 0)
  // })

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
      <meshLambertMaterial attach="material" color="#32E8C4" />
    </mesh>
  )
}

function Letters({ letters }) {
    return <>
        {letters}
    </>;
}
//
function AddLetter({addLetter}) {
  // //clock for counting frames, no autostart
  const {clock} = useThree(false);
  //letter
  const [letter, set] = useState();
  //letter url
  // const url = useRef('c');
  //letter position
  // const position = useRef();

  //if collide, start a clock
  //every half a second (clock.getDelta() % 0.5), create a letter and add it to all the other letters
  //reset clock

  // useFrame(state => {
  //   if (state.clock.getDelta()==30) {
  //
  //   } else {
  //     return;
  //   }
  //   //
      //every 5 frames, create a letter
      //randomize letter. 0 <= c < .2, .2 <= m < .6, .6 <= n <.8, .8 <= d < 1

      //randomize position
      // position = [Math.random()*4*(Math.random() < 0.5 ? -1 : 1), .5, 0];
      //randomize color from color index
  //   }
  // );
  clock.start();
  //if collide, start a clock
  //every half a second (clock.getDelta() % 0.5), create a letter and add it to letters array
  //reset clock

  //pass setLetters method down from Scene
  return ((clock.getDelta() % 0.5) === 0) ? () => {
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
      default:
        url = 'm';
    }
    const position = [Math.random()*4*(Math.random() < 0.5 ? -1 : 1), 3, 0];
    const rotation = [Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0];
    setLetters([...letters,
    <Letter url={url} id={Math.random()} position={position} rotation={rotation} />])
    clock.start();
  } : null;
}



//create Letters function later to randomize position, mesh, and color
//Canvas attribute onCreated={({ camera }) => camera.lookAt(0, 0 ,-10)}
//take out plane so letters fall thru screen (above suspense)
// ((clock.getDelta() % 0.5) == 0) ? () => {
//   var url;
//   switch(true) {
//     case (Math.random() < 0.2):
//       url = 'c';
//       break;
//     case (Math.random() < 0.4):
//       url = 'n';
//       break;
//     case (Math.random() < 0.6):
//       url = 'd';
//       break;
//     default:
//       url = 'm';
//   }
//   const position = [Math.random()*4*(Math.random() < 0.5 ? -1 : 1), 3, 0];
//   const rotation = [Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0];
//   setLetters([...letters,
//   <Letter url={url} id={Math.random()} position={position} rotation={rotation} />])
// } : null;
const Scene = () => {
  // const start = useRef(false);
  const {clock} = useThree();

  const [letters, setLetters] = useState([
    <>
      <Letter url="c"  id={Math.random()} position={[-1, 4, 0]}rotation={[Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0]} />
      <Letter url="m" id={Math.random()} position={[-.5, 4, 0]}  rotation={[Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0]} />
      <Letter url="m" id={Math.random()} position={[0, 4, 0]} rotation={[Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0]} />
      <Letter url="n" id={Math.random()} position={[.5, 4, 0]} rotation={[Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0]} />
      <Letter url="d" id={Math.random()} position={[1, 4, 0]} rotation={[Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0]} />
    </>
  ]);
  //on collide with ground, call AddLetter that starts a function to add a letter every half a second
  const onCollide = (e) => {
    // console.log(clock.getDelta());
    var position;
    var rotation;
    var obj;
    //determine all variables in useFrame
    //if clock.getDelta() is greater than 1s, determine all variables values and set obj to true
    useFrame(({clock}) => {

    });
    //if obj true, pass values to <Letter /> and return component, set obj to false. else return null
    ((clock.getDelta() % 0.5) == 0) ? () => {
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
        default:
          url = 'm';
      }
      position = [Math.random()*4*(Math.random() < 0.5 ? -1 : 1), 3, 0];
      rotation = [Math.random()*Math.PI/6*(Math.random() < 0.5 ? -1 : 1), Math.random()*-Math.PI/6*(Math.random() < 0.5 ? -1 : 1), 0];
      setLetters([...letters,
      <Letter url={url} id={Math.random()} position={position} rotation={rotation} />])
    } : null;
  };

  return (
    <>
      <color attach="background" args={['white']} />
      <ambientLight intensity={0.5} />
      <spotLight position={[1, 4, 5]} angle={.8} intensity={1} castShadow/>
      <Physics gravity={[0, -1, 0]}>
        <Plane position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} args={[50, 50]} onCollide={onCollide}/>
        <Plane position={[0, 1, -1]} args={[50, 50]}/>
        <Suspense fallback={null}>
          <Letters letters={letters}>
          </Letters>
        </Suspense>
      </Physics>
    </>

  )

}

export default Scene;

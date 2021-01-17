import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

//for loading custom GLTF models
class LoaderObject {
    constructor() {
        this.loader = new GLTFLoader();
        this.models = {};
    }

    getLoader() {
        return this.loader;
    }
}

let Loader = (function () {
    let instance;

    function createInstance() {
        return new LoaderObject();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export default Loader;

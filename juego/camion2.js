import * as THREE from '../libs/three.module.js'
import * as MTT from '../libs/MTLLoader.js'
import * as OBJ from '../libs/OBJLoader.js'

class Camion2 extends THREE.Object3D {
    constructor() {
      super();

      var material = new MTT.MTLLoader()
      var objeto = new OBJ.OBJLoader();

      var that = this;

      material.load('../models/P2/camion2/camion2.mtl',
        function(materiales){
          objeto.setMaterials(materiales);
          objeto.load('../models/P2/camion2/camion2.obj',
            function(objetos){
              objetos.traverse(function(child){child.castShadow = true;})
              objetos.castShadow
              objetos.scale.setScalar(0.2);
              that.add(objetos);
            },
            null, null);});
    }
} 

export { Camion2 }

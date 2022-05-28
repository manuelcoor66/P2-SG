import * as THREE from '../libs/three.module.js'
import * as MTT from '../libs/MTLLoader.js'
import * as OBJ from '../libs/OBJLoader.js'

class Arbol3 extends THREE.Object3D {
    constructor() {
      super();

      var material = new MTT.MTLLoader()
      var objeto = new OBJ.OBJLoader();

      var that = this;

      material.load('../models/P2/Arboles/bueno3.mtl',
        function(materiales){
          objeto.setMaterials(materiales);
          objeto.load('../models/P2/Arboles/bueno3.obj',
          function(objeto){
            objeto.traverse(function(child){child.castShadow = true;})
            objeto.scale.setScalar(2);
              var obj = objeto;
              that.add(obj);
            },
            null, null);});
    }
} 

export { Arbol3 }

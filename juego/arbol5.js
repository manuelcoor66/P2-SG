import * as THREE from '../libs/three.module.js'
import * as MTT from '../libs/MTLLoader.js'
import * as OBJ from '../libs/OBJLoader.js'

class Arbol5 extends THREE.Object3D {
    constructor() {
      super();

      var material = new MTT.MTLLoader()
      var objeto = new OBJ.OBJLoader();

      this.objeto3d = new THREE.Object3D();

      var that = this;

      material.load('../models/P2/Arboles/bueno5.mtl',
        function(materiales){
          objeto.setMaterials(materiales);
          objeto.load('../models/P2/Arboles/bueno5.obj',
          function(objeto){
            objeto.traverse(function(child){child.castShadow = true;})
            objeto.scale.setScalar(3);
              var obj = objeto;
              that.add(obj);
            },
            null, null);});
    }
} 

export { Arbol5 }

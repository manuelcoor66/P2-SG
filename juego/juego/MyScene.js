// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import * as COCHE from './coche1.js'
import * as CAMION from './camion1.js'
import * as CAMION2 from './camion2.js'
import * as ARBOL1 from './arbol1.js'
import * as ARBOL2 from './arbol2.js'
import * as ARBOL3 from './arbol3.js'
import * as ARBOL4 from './arbol4.js'
import * as ARBOL5 from './arbol5.js'
import * as ARBOL6 from './arbol6.js'

// Clases de mi proyecto
import { MyPersonaje } from './MyPersonaje.js'


 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
   this.renderer.shadowMap.enabled = true;
  this.renderer.shadowMap.type = THREE.BasicShadowMap;
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();


    this.personaje = new MyPersonaje(this.gui, myCanvas);
    this.personaje.castShadow = true;
    this.personaje.receiveShadow = false;
    this.personaje.traverse(n => { if ( n.isMesh ) {
      n.castShadow = true; 
      n.receiveShadow = true;
      if(n.material.map) n.material.map.anisotropy = 16; 
    }});



    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		// También se indica dónde se coloca
		this.camera.position.set (-70, 60, 0);
		// Y hacia dónde mira
		this.camera.lookAt(this.personaje.position);

		this.add (this.camera);
    this.add(this.personaje);
 
    this.coche1 = new COCHE.Coche1();
    this.add (this.coche1);
    
    this.camion1 = new CAMION2.Camion2();  
    this.add (this.camion1);

    this.coche2 = new COCHE.Coche1();    
    this.add (this.coche2);
    
    this.camion2 = new CAMION.Camion1();    
    this.add (this.camion2);

    this.camion3 = new CAMION2.Camion2();
    this.add (this.camion3);

    this.camion4 = new CAMION.Camion1();
    this.add (this.camion4);

    this.coche3 = new COCHE.Coche1();
    this.add (this.coche3);

    this.camion5 = new CAMION2.Camion2();
    this.add (this.camion5);

    this.coche4 = new COCHE.Coche1();
    this.add (this.coche4);

    this.coche5 = new COCHE.Coche1();
    this.add (this.coche5);

    this.camion6 = new CAMION.Camion1();
    this.add (this.camion6);

    this.arbol1 = new ARBOL1.Arbol1();
    this.add(this.arbol1);

    this.arbol2 = new ARBOL2.Arbol2();
    this.add(this.arbol2);

    this.arbol3 = new ARBOL3.Arbol3();
    this.add(this.arbol3);

    this.arbol4 = new ARBOL4.Arbol4();
    this.add(this.arbol4);

    this.arbol5 = new ARBOL5.Arbol5();
    this.add(this.arbol5);

    this.arbol6 = new ARBOL6.Arbol6();
    this.add(this.arbol6);
  


    this.initStats();
    //intento recrear la cámara


    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();

		//this.createCamera();
    
    // Un suelo 
    this.createGround ();   
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);
    
    
    // Por último creamos el modelo.
    // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
    // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
    
  }


  
  initStats() {
  
    var stats = new Stats();
    
    stats.setMode(0); // 0: fps, 1: ms
    
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    $("#Stats-output").append( stats.domElement );
    
    this.stats = stats;

    
  }


  createGround1 () {
    // El suelo es un Mesh, necesita una geometría y un material.
    
    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (500,0.2,500);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);
    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    ground.castShadow = false;
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (ground);
  }
  
  createGround () {   
    
    var hierba1 = this.createHierba();
    var calle1 = this.createCalle();
    hierba1.position.y = -25;
    calle1.position.y = -25;
    calle1.position.x = +50; 

    var hierba2 = this.createHierba();
    var calle2 = this.createCalle();
    hierba2.position.y = -25;
    calle2.position.y = -25;
    hierba2.position.x = +100;
    calle2.position.x = +150; 

    var hierba3 = this.createHierba();
    var calle3 = this.createCalle();
    var calle4 = this.createCalle();
    hierba3.position.y = -25;
    calle3.position.y = -25;
    calle4.position.y = -25;
    hierba3.position.x = +200;
    calle3.position.x = +250;
    calle4.position.x = +300;  

    var hierba4 = this.createHierba();
    hierba4.position.y = -25;
    hierba4.position.x = +350;
    /*var linea_de_meta = this.createLineaFinal();
    //linea_de_meta.position.y = 0.25;
    linea_de_meta.position.x = +350;*/
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    calle1.receiveShadow = true;
    hierba1.receiveShadow = true;
    calle2.receiveShadow = true;
    hierba2.receiveShadow = true;
    hierba3.receiveShadow = true;
    calle3.receiveShadow = true;
    calle4.receiveShadow = true;
    hierba4.receiveShadow = true;


    calle1.castShadow = false;
    hierba1.castShadow = false;
    calle2.castShadow = false;
    hierba2.castShadow = false;
    hierba3.castShadow = false;
    calle3.castShadow = false;
    calle4.castShadow = false;
    hierba4.castShadow = false;

    this.add (calle1 ,hierba1, calle2, hierba2, hierba3, calle3, calle4, hierba4);

  }


  /*createLineaFinal () {

    var loader = new THREE.TextureLoader();
    var texture = loader.load( 'texturas/ajedrez.jpg', function ( texture ) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 10, 10 );
    } );


    var loader1 = new THREE.TextureLoader();
    var texture1 = loader1.load( 'texturas/grass-m.jpg', function ( texture1 ) {
    texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
    texture1.offset.set( 0, 0 );
    texture1.repeat.set( 15, 15 );
    } );

    var geometryLinea = new THREE.BoxGeometry (20,10,80);
    
    var Linea_Material =
    [
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), //right side        
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), // bottom side
       new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide }),
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), // front side
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), // front side
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), // back side

    ]
    var material_Linea = new THREE.MeshFaceMaterial(Linea_Material); 
    var Linea = new THREE.Mesh (geometryLinea, material_Linea);

    return Linea;

  }*/




  createCalle () {

    var loader = new THREE.TextureLoader();
    var texture = loader.load( 'texturas/stone.jpg', function ( texture ) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 10, 10 );
    } );


    var loader1 = new THREE.TextureLoader();
    var texture1 = loader1.load( 'texturas/earth.jpg', function ( texture1 ) {
    texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
    texture1.offset.set( 0, 0 );
    texture1.repeat.set( 15, 15 );
    } );

    var geometryStreet = new THREE.BoxGeometry (50,50,180);
    
    var calle_Material =
    [
      new THREE.MeshPhongMaterial( { map: texture1}), //right side        
      new THREE.MeshPhongMaterial( { map: texture1}), // bottom side
      new THREE.MeshPhongMaterial( { map: texture}),
      new THREE.MeshPhongMaterial( { map: texture1}), // front side
      new THREE.MeshPhongMaterial( { map: texture1}), // front side
      new THREE.MeshPhongMaterial( { map: texture1}), // back side

    ]
    var material_street = new THREE.MeshFaceMaterial(calle_Material); 
    var calle = new THREE.Mesh (geometryStreet, material_street);

    return calle;
  }

  createHierba () {

    var loader = new THREE.TextureLoader();
    var texture = loader.load( 'texturas/grass-m.jpg', function ( texture ) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 10, 10 );
    } );

    var loader1 = new THREE.TextureLoader();
    var texture1 = loader1.load( 'texturas/earth.jpg', function ( texture1 ) {
    texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
    texture1.offset.set( 0, 0 );
    texture1.repeat.set( 10, 10 );
    } );
    

    var geometryGrass = new THREE.BoxGeometry (50,50,80);    

    var hierba_Material = 
    [      
      new THREE.MeshPhongMaterial( { map: texture1}), //right side        
      new THREE.MeshPhongMaterial( { map: texture1}), // bottom side
      new THREE.MeshPhongMaterial( { map: texture}),
      new THREE.MeshPhongMaterial( { map: texture1}), // front side
      new THREE.MeshPhongMaterial( { map: texture1}), // front side
      new THREE.MeshPhongMaterial( { map: texture1}), // back side
    ]

    var material_grass = new THREE.MeshFaceMaterial(hierba_Material); 
    var hierba = new THREE.Mesh (geometryGrass, material_grass);

    return hierba;
  }

 

  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante un objeto de control
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightIntensity : 0.5,
      axisOnOff : true
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1)
      .name('Intensidad de la Luz : ')
      .onChange ( (value) => this.setLightIntensity (value) );
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );
    
    return gui;
  }

 
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
   // var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    // La añadimos a la escena
    //this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
   
    var hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.add(hemiLight);

    this.spotLight = new THREE.SpotLight(0xffa95c, 10);
    this.spotLight.position.set(410, 90, 40);
    this.spotLight.castShadow = true;
    this.add(this.spotLight);
 
  }
  
  setLightIntensity (valor) {
    this.spotLight.intensity = valor;
  }
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  } 

  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  getPersonaje(){
    return this.personaje;
  }

  getCamera(){
    return this.camera;
  }

  intersectBoxes (b1, b2) {
    var vectorBetweenBoxes = new THREE.Vector2();
    vectorBetweenBoxes.subVectors (new THREE.Vector2 (b1.position.x, b1.position.z),
                                   new THREE.Vector2 (b2.position.x, b2.position.z));
    return (vectorBetweenBoxes.length() < this.boxSize);
  }


  update () {
    
    if (this.stats) this.stats.update();  

    this.renderer.render (this, this.camera); 
    requestAnimationFrame(() => this.update());
  }

  getMouse(event){
    var mouse = 0;
    mouse = (event.clientX / window.innerWidth) * 2 - 1;
    return mouse;
  }
  
  
  onMouseMove (event) {
    var actual = this.getMouse(event)
    //derecha
    if (actual > X_ant ){
      if (this.personaje.position.z < 35){
      this.personaje.position.z += 3;
      this.camera.position.z += 3;
      }
      //izquierda
    } else if (actual < X_ant ){
      if (this.personaje.position.z > -35){
      this.personaje.position.z -= 3;
      this.camera.position.z -= 3;
      }
    }
      X_ant = actual;
  }

  onMouseClick (event) {
    switch(event.which) {
      case 1:
        this.personaje.position.x += 8;
        this.camera.position.x += 8;
    }
  }
}


//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////


var X_ant = 0;

var xSpeed= 1.0;

//Movimiento Coches

var path = [
  new THREE.Vector3(40, 0, -80),
  new THREE.Vector3(40, 0, 80),
];

var path2 = [
  new THREE.Vector3(60, 0, 80),
  new THREE.Vector3(60, 0, -80),
];

var path3 = [
  new THREE.Vector3(140, 0, -80),
  new THREE.Vector3(140, 0, 80),
];

var path4 = [
  new THREE.Vector3(160, 0, 80),
  new THREE.Vector3(160, 0, -80),
];

var path5 = [
  new THREE.Vector3(240, 0, -80),
  new THREE.Vector3(240, 0, 80),
];

var path6 = [
  new THREE.Vector3(250, 0, 80),
  new THREE.Vector3(250, 0, -80),
];

var path7 = [
  new THREE.Vector3(260, 0, 80),
  new THREE.Vector3(260, 0, -80),
];

var path8 = [
  new THREE.Vector3(270, 0, -80),
  new THREE.Vector3(270, 0, 80),
];

var path9 = [
  new THREE.Vector3(280, 0, -80),
  new THREE.Vector3(280, 0, 80),
];


var path10 = [
  new THREE.Vector3(290, 0, 80),
  new THREE.Vector3(290, 0, -80),
];

var path11 = [
  new THREE.Vector3(300, 0, -80),
  new THREE.Vector3(300, 0, 80),
];



var curva = new THREE.CatmullRomCurve3(path);
var curva2 = new THREE.CatmullRomCurve3(path2);
var curva3 = new THREE.CatmullRomCurve3(path3);
var curva4 = new THREE.CatmullRomCurve3(path4);
var curva5 = new THREE.CatmullRomCurve3(path5);
var curva6 = new THREE.CatmullRomCurve3(path6);
var curva7 = new THREE.CatmullRomCurve3(path7);
var curva8 = new THREE.CatmullRomCurve3(path8);
var curva9 = new THREE.CatmullRomCurve3(path9);
var curva10 = new THREE.CatmullRomCurve3(path10);
var curva11 = new THREE.CatmullRomCurve3(path11);

var origen = {p: 0}
  var destino = {p: 1}


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  scene.coche1.traverse(n => {
      n.castShadow = true;
      n.receiveShadow = true;   
  })

  //Coche1
  scene.coche1.translateY(0.6); 
  var movement = new TWEEN.Tween(origen).to(destino, 5000)
  movement.easing(TWEEN.Easing.Linear.None)
  movement.onUpdate(() => {
      var posicion = curva.getPointAt(origen.p)
      scene.coche1.position.copy(posicion)
    })
    movement.onComplete(() => {origen.p = 0;})
    movement.repeat(Infinity)
    movement.start()


  //Camion1
  scene.camion1.translateY(0.6);
  scene.camion1.rotateY(Math.PI); 
  var movement2 = new TWEEN.Tween(origen).to(destino, 5000)
  movement2.easing(TWEEN.Easing.Linear.None)
  movement2.onUpdate(() => {
      var posicion = curva2.getPointAt(origen.p)
      scene.camion1.position.copy(posicion)
    })
    movement2.onComplete(() => {origen.p = 0;})
    movement2.repeat(Infinity)
    movement2.start()

  //Coche2
  scene.coche2.translateY(0.6);
  var movement3 = new TWEEN.Tween(origen).to(destino, 2000)
  movement3.easing(TWEEN.Easing.Linear.None)
  movement3.onUpdate(() => {
      var posicion3 = curva3.getPointAt(origen.p)
      scene.coche2.position.copy(posicion3)
    })
    movement3.onComplete(() => {origen.p = 0;})
    movement3.repeat(Infinity)
    movement3.start()

  //Camion2
  scene.camion2.translateY(0.6);
  scene.camion2.rotateY(Math.PI);
  var movement4 = new TWEEN.Tween(origen).to(destino, 2000)
  movement4.easing(TWEEN.Easing.Linear.None)
  movement4.onUpdate(() => {
      var posicion = curva4.getPointAt(origen.p)
      scene.camion2.position.copy(posicion)
    })
    movement4.onComplete(() => {origen.p = 0;})
    movement4.repeat(Infinity)
    movement4.start()

  //camion3
  scene.camion3.translateY(0.6);  
  var movement5 = new TWEEN.Tween(origen).to(destino, 3000)
  movement5.easing(TWEEN.Easing.Linear.None)
  movement5.onUpdate(() => {
      var posicion = curva5.getPointAt(origen.p)
      scene.camion3.position.copy(posicion)
    })
    movement5.onComplete(() => {origen.p = 0;})
    movement5.repeat(Infinity)
    movement5.start()

  //camion4
  scene.camion4.translateY(0.6);
  scene.camion4.rotateY(Math.PI);
  var movement6 = new TWEEN.Tween(origen).to(destino, 1000)
  movement6.easing(TWEEN.Easing.Linear.None)
  movement6.onUpdate(() => {
      var posicion = curva6.getPointAt(origen.p)
      scene.camion4.position.copy(posicion)
    })
    movement6.onComplete(() => {origen.p = 0;})
    movement6.repeat(Infinity)
    movement6.start()

  //coche3
  scene.coche3.translateY(0.6);
  scene.coche3.rotateY(Math.PI);
  var movement7 = new TWEEN.Tween(origen).to(destino, 4000)
  movement7.easing(TWEEN.Easing.Linear.None)
  movement7.onUpdate(() => {
      var posicion3 = curva7.getPointAt(origen.p)
      scene.coche3.position.copy(posicion3)
    })
    movement7.onComplete(() => {origen.p = 0;})
    movement7.repeat(Infinity)
    movement7.start()

  //camion5
  scene.camion5.translateY(0.6);
  var movement8 = new TWEEN.Tween(origen).to(destino, 3500)
  movement8.easing(TWEEN.Easing.Linear.None)
  movement8.onUpdate(() => {
      var posicion = curva8.getPointAt(origen.p)
      scene.camion5.position.copy(posicion)
    })
    movement8.onComplete(() => {origen.p = 0;})
    movement8.repeat(Infinity)
    movement8.start()

  //coche4
  scene.coche4.translateY(0.6);
  var movement9 = new TWEEN.Tween(origen).to(destino, 1500)
  movement9.easing(TWEEN.Easing.Linear.None)
  movement9.onUpdate(() => {
      var posicion3 = curva9.getPointAt(origen.p)
      scene.coche4.position.copy(posicion3)
    })
    movement9.onComplete(() => {origen.p = 0;})
    movement9.repeat(Infinity)
    movement9.start()


  //coche5
  scene.coche5.translateY(0.6);
  scene.coche5.rotateY(Math.PI);
  var movement10 = new TWEEN.Tween(origen).to(destino, 4000)
  movement10.easing(TWEEN.Easing.Linear.None)
  movement10.onUpdate(() => {
      var posicion3 = curva10.getPointAt(origen.p)
      scene.coche5.position.copy(posicion3)
    })
    movement10.onComplete(() => {origen.p = 0;})
    movement10.repeat(Infinity)
    movement10.start()

  //camion6
  scene.camion6.translateY(0.6);
  var movement11 = new TWEEN.Tween(origen).to(destino, 3500)
  movement11.easing(TWEEN.Easing.Linear.None)
  movement11.onUpdate(() => {
      var posicion = curva11.getPointAt(origen.p)
      scene.camion6.position.copy(posicion)
    })
    movement11.onComplete(() => {origen.p = 0;})
    movement11.repeat(Infinity)
    movement11.start()

    
  scene.arbol1.translateY(-0.6);
  scene.arbol1.translateX(15);
  scene.arbol1.translateZ(25);

  scene.arbol2.translateY(-0.6);
  scene.arbol2.translateX(80);
  scene.arbol2.translateZ(-15);
  
  scene.arbol3.translateY(-0.6);
  scene.arbol3.translateX(110);
  scene.arbol3.translateZ(30);
  scene.arbol3.rotateY(Math.PI/2);
  
  scene.arbol4.translateY(-0.6);
  scene.arbol4.translateX(190);
  scene.arbol4.translateZ(-30);
  
  scene.arbol5.translateY(-0.6);
  scene.arbol5.translateX(210);
  
  scene.arbol6.translateY(-0.6);
  scene.arbol6.translateX(200);
  scene.arbol6.translateZ(35);

  function updateAnimaciones() {
    TWEEN.update();
    requestAnimationFrame(updateAnimaciones);
  }

  updateAnimaciones()
  colision1()
  colision2()
  colision3()
  colision4()
  colision5()
  colision6()
  colision7()
  colision8()
  colision9()
  colision10()
  colision11()
  colision12()
  colision13()
  colision14()
  colision15()
  colision16()
  colision17()

  function colision1(){
    if(intersectBoxes(scene.personaje, scene.coche1))    
    location.reload(); 
    requestAnimationFrame(colision1);
  }
  
  function colision2(){
    if(intersectBoxes2(scene.personaje, scene.camion1)){      
      location.reload(); 
    }
    requestAnimationFrame(colision2);
  }

  function colision3(){
    if(intersectBoxes(scene.personaje, scene.coche2))
    location.reload(); 
    requestAnimationFrame(colision3);
  }
  
  function colision4(){
    if(intersectBoxes2(scene.personaje, scene.camion2))
    location.reload(); 
    requestAnimationFrame(colision4);
  }

  function colision5(){
    if(intersectBoxes2(scene.personaje, scene.camion3))
    location.reload(); 
    requestAnimationFrame(colision5);
  }

  function colision6(){
    if(intersectBoxes2(scene.personaje, scene.camion4))
    location.reload(); 
    requestAnimationFrame(colision6);
  }

  function colision7(){
    if(intersectBoxes(scene.personaje, scene.coche3))
    location.reload(); 
    requestAnimationFrame(colision7);
  }

  function colision8(){
    if(intersectBoxes2(scene.personaje, scene.camion5))
    location.reload(); 
    requestAnimationFrame(colision8);
  }

  function colision9(){
    if(intersectBoxes(scene.personaje, scene.coche4))
    location.reload(); 
    requestAnimationFrame(colision9);
  }

  function colision10(){
    if(intersectBoxes(scene.personaje, scene.coche5))
    location.reload(); 
    requestAnimationFrame(colision10);
  }

  function colision11(){
    if(intersectBoxes2(scene.personaje, scene.camion6))
    location.reload(); 
    requestAnimationFrame(colision11);
  }

  function colision12(){
    if(intersectBoxes3(scene.personaje, scene.arbol1)) {
      location.reload(); 
    }
    requestAnimationFrame(colision12);
  }

  function colision13(){
    if(intersectBoxes3(scene.personaje, scene.arbol2))
    location.reload(); 
    requestAnimationFrame(colision13);
  }

  function colision14(){
    if(intersectBoxes3(scene.personaje, scene.arbol3))
    location.reload(); 
    requestAnimationFrame(colision14);
  }

  function colision15(){
    if(intersectBoxes3(scene.personaje, scene.arbol4))
    location.reload(); 
    requestAnimationFrame(colision15);
  }

  function colision16(){
    if(intersectBoxes3(scene.personaje, scene.arbol5))
    location.reload(); 
    requestAnimationFrame(colision16);
  }

  function colision17(){
    if(intersectBoxes3(scene.personaje, scene.arbol6))
    location.reload(); 
    requestAnimationFrame(colision17);
  }


    
  function intersectBoxes (b1, b2) {
    var vectorBetweenBoxes = new THREE.Vector2();
   
    vectorBetweenBoxes.subVectors (new THREE.Vector2 (b1.position.x, b1.position.z),
                                   new THREE.Vector2 (b2.position.x, b2.position.z));
    return (vectorBetweenBoxes.length() < 8);
  }
 
  function intersectBoxes2 (b1, b2) {
    var vectorBetweenBoxes = new THREE.Vector2();
   
    vectorBetweenBoxes.subVectors (new THREE.Vector2 (b1.position.x, b1.position.z),
                                   new THREE.Vector2 (b2.position.x, b2.position.z));
    return (vectorBetweenBoxes.length() < 10);
  }
 
  function intersectBoxes3 (b1, b2) {
    var vectorBetweenBoxes = new THREE.Vector2();
   
    vectorBetweenBoxes.subVectors (new THREE.Vector2 (b1.position.x, b1.position.z),
                                   new THREE.Vector2 (b2.position.x, b2.position.z));
    return (vectorBetweenBoxes.length() < 4);
  }

  ComprobarFinal();
  function ComprobarFinal(){
    if(scene.personaje.position.x > 350){
      location.reload(); 
    }
    requestAnimationFrame(ComprobarFinal);
  }


  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());

  window.addEventListener ("mousemove", (event) => scene.onMouseMove(event), true);

  window.addEventListener ("click", (event) => scene.onMouseClick(event), true);

  //Movimiento del pollo
  document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {
      var keyCode = event.which;
      // Izquierda
      if (keyCode == 37) {
        scene.getPersonaje().position.z -= xSpeed;
        scene.getCamera().position.z -= xSpeed;
      // Derecha
      } else if (keyCode == 39) {
        scene.getPersonaje().position.z += xSpeed;
        scene.getCamera().position.z += xSpeed;
      // Volver a la posición inicial  
      } else if (keyCode == 32){
        scene.getPersonaje().position.x = 0;
        scene.getPersonaje().position.z = 0;

        scene.getCamera().position.x = -70;
        scene.getCamera().position.y = 60;
        scene.getCamera().position.z = 0;
        scene.getCamera().lookAt(scene.personaje.position);
      }
  };
  ///////////////////////

  // Que no se nos olvide, la primera visualización.
  scene.update(); 

  var skybox = new THREE.CubeTextureLoader().load([

    "texturas/fondo.png",
    "texturas/fondo.png",
    "texturas/fondo.png",
    "texturas/fondo.png",
    "texturas/fondo.png",
    "texturas/fondo.png"
  ]);

  scene.background = skybox;

  console.log(scene);
  

});
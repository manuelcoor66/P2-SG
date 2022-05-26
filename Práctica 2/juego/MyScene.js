// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

// Clases de mi proyecto
import { MyPersonaje } from './MyPersonaje.js'
import { Mov_Coche1} from './mov_coche1.js'
import { Mov_Camion1} from './mov_camion1.js'
import { Mov_Coche2} from './mov_coche2.js'
import { Mov_Camion2} from './mov_camion2.js'
/*import { Mov_Coche2} from './mov_coche2.js'
import { Mov_Camion2} from './mov_camion2.js'*/


 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

  
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();
    
    this.personaje = new MyPersonaje(this.gui, myCanvas);

    this.personaje1 = new MyPersonaje(this.gui, myCanvas);
    

    
    
    
    

    


    
   

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		// También se indica dónde se coloca
		this.camera.position.set (-70, 60, 0);
		// Y hacia dónde mira
		this.camera.lookAt(this.personaje.position);

		this.add (this.camera);
    this.add(this.personaje, this.personaje1);
    //this.personaje1.translateX(10) ;
    this.coche1 = new Mov_Coche1(this.gui, "recorrido coche1");
    this.coche1.translateY(0.6);   
    
    this.add (this.coche1);

    this.camion1 = new Mov_Camion1(this.gui, "recorrido camion1");
    this.camion1.translateY(0.6);
    this.camion1.rotateY(Math.PI);
    this.camion1.translateX(-21);
    this.add (this.camion1);

    this.coche2 = new Mov_Coche2(this.gui, "recorrido coche2");
    this.coche2.translateY(0.6);
    this.coche2.translateX(100);
    this.add (this.coche2);

    this.camion2 = new Mov_Camion2(this.gui, "recorrido camion2");
    this.camion2.translateY(0.6);
    this.camion2.rotateY(Math.PI);
    this.camion2.translateX(-121);
    this.add (this.camion2);

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
  
  createGround () {   
   

    // Primer Nivel
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

    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (calle1 ,hierba1, calle2, hierba2);
  }




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
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), //right side        
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), // bottom side
       new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide }),
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), // front side
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), // front side
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), // back side

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
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), //right side        
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), // bottom side
       new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide }),
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), // front side
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), // front side
       new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide }), // back side
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
    var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.

    /*this.spotLight = new THREE.SpotLight(0xfcfcfc, 0.7);
    this.spotLight.position.set(2, 30, 5);

    var target = new THREE.Object3D();
    target.position.set(2, 0, 5);
    this.spotLight.target = target;

    this.add(target);
    this.add(this.spotLight);*/
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
    var renderer = new THREE.WebGLRenderer();
    
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

    
    // Se actualiza el resto del modelo
    this.coche1.update();
    this.camion1.update();
    this.coche2.update();
    this.camion2.update();
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.camera); 

    
   /*let cubePersonaje = new THREE.Box3(new THREE.Vector3(),new THREE.Vector3());
    cubePersonaje.setFromObject(this.personaje);*/
    
    
    
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
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
        this.personaje.position.x += 3;
        this.camera.position.x += 3;
    }
  }
}

var X_ant = 0;




var xSpeed= 1.0;
var salto = 5.0;






/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");



//Vamos a intentar hacer colisiones muajaj
var boxGeom = new THREE.BoxBufferGeometry (1,1,1);   
var boxMat = new THREE.MeshPhongMaterial({color: 0xCF0000});   
var box = new THREE.Mesh (boxGeom, boxMat);  
scene.add(box);


  colision()
  function colision(){
    if(intersectBoxes(scene.personaje, scene.personaje1))
      console.log('si');
    scene.personaje1.translateX(0.01);
    requestAnimationFrame(colision);
  }

    
  function intersectBoxes (b1, b2) {
    var vectorBetweenBoxes = new THREE.Vector2();
   
    vectorBetweenBoxes.subVectors (new THREE.Vector2 (b1.position.x, b1.position.z),
                                   new THREE.Vector2 (b2.position.x, b2.position.z));
    return (vectorBetweenBoxes.length() < 1);
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


});




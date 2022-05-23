// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'

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
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();
    
    this.personaje = new MyPersonaje(this.gui, myCanvas);
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		// También se indica dónde se coloca
		this.camera.position.set (-50, 40, 0);
		// Y hacia dónde mira
		this.camera.lookAt(this.personaje.position);

		this.add (this.camera);
    this.add(this.personaje);

    this.initStats();
    //intento recrear la cámara


    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();

		//this.createCamera();
    
    // Un suelo 
    this.createGround ();

    // El cielo
    this.createBackground ();
    
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
    // El suelo es un Mesh, necesita una geometría y un material.
    
    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (50,0.2,50);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);
    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.1;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (ground);
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

  createBackground () {
    /*var materialColor = new THREE.Mesh({ map: THREE.ImageUtils.loadTexture("../imgs/cielo-azul.jpg"), depthTest: false});
    var scene = new MyScene("#WebGL-output");

    this.bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
    this.bgPlane.position.z = -100;
    this.bgPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);

    scene.add(this.bgPlane);*/
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.

    this.spotLight = new THREE.SpotLight(0xfcfcfc, 0.7);
    this.spotLight.position.set(2, 30, 5);

    var target = new THREE.Object3D();
    target.position.set(2, 0, 5);
    this.spotLight.target = target;

    this.add(target);
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


  update () {
    
    if (this.stats) this.stats.update();
    
    // Se actualizan los elementos de la escena para cada frame
    
    // Se actualiza la posición de la cámara según su controlador
    //this.cameraControl.update();
    
    // Se actualiza el resto del modelo
    //this.personaje.updateDerecha();
    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.camera);

   

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
      if (this.personaje.position.z < 20){
      this.personaje.position.z += 3;
      this.camera.position.z += 3;
      }
      //izquierda
    } else if (actual < X_ant ){
      if (this.personaje.position.z > -20){
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

        scene.getCamera().position.x = -50;
        scene.getCamera().position.y = 40;
        scene.getCamera().position.z = 0;
        scene.getCamera().lookAt(scene.personaje.position);
      }
  };
  ///////////////////////

  // Que no se nos olvide, la primera visualización.
  scene.update();



  /*let texture_px = new THREE.TextureLoader().load( 'texts/cielo_px.png');
  let texture_nx = new THREE.TextureLoader().load( 'texts/cielo_nx.png');
  let texture_py = new THREE.TextureLoader().load( 'texts/cielo_py.png');
  let texture_ny = new THREE.TextureLoader().load( 'texts/cielo_ny.png');
  let texture_pz = new THREE.TextureLoader().load( 'texts/cielo_pz.png');
  let texture_nz = new THREE.TextureLoader().load( 'texts/cielo_nz.png');

  let materialArray = [];  
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_px }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_nx }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_py }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ny }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_pz }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_nz }));
    
  for (let i = 0; i < 6; i++)
    materialArray[i].side = THREE.BackSide;
    
  let skyboxGeo = new THREE.BoxGeometry( 10, 10, 10);
  let skybox = new THREE.Mesh( skyboxGeo, materialArray );
  skybox.position.x+=30;
  skybox.position.z+=45;
  this.add( skybox );*/

  var urls = ['texts/cielo_px.png', 'texts/cielo_nx.png', 'texts/cielo_py.png', 
              'texts/cielo_ny.png', 'texts/cielo_pz.png', 'texts/cielo_nz.png'];

  var textureCube = new THREE.CubeTextureLoader().load(urls);

  scene.background = textureCube;

});




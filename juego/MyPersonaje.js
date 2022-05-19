import * as THREE from '../libs/three.module.js'
import * as CSG from '../libs/CSG-v2.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'

class MyPersonaje extends THREE.Object3D {
	constructor(gui) {
		super();

		this.animal = this.crearAnimal();			
		this.add(this.animal);
	}

	crearAnimal() {
		var cabeza = this.crearCabeza()
		var cuerpo = this.crearCuerpo();
		var pata1 = this.crearPata();
		var pata2 = this.crearPata();
		var ala1 = this.crearAla();
		var ala2 = this.crearAla();


		pata1.translateY(-((0.25/2)+1.25));
		pata2.translateY(-((0.25/2)+1.25));
		cuerpo.translateY(2.175);
		ala1.translateY(2.175+0.75);
		ala2.translateY(2.175+0.75);
		cabeza.translateY(2.9);
		cabeza.translateX(1.75);

		pata1.translateZ(0.5);
		pata2.translateZ(-0.5);
		ala1.translateZ(1.125);
		ala2.translateZ(-1.125);

		var animal = new THREE.Object3D();
		animal.add(pata1, pata2, cuerpo, ala1, ala2, cabeza);

		return animal;
	}

	crearCabeza() {
		var cabeza = new THREE.BoxBufferGeometry(1, 1, 1);
		var ojo1 = new THREE.BoxBufferGeometry(0.1, 0.25, 0.25);
		var ojo2 = new THREE.BoxBufferGeometry(0.1, 0.25, 0.25);
		var boca = new THREE.BoxBufferGeometry(0.5, 0.25, 0.8);

		var MatCabeza = new THREE.MeshPhongMaterial({color: 0xE1E2E3});
		var cabezaMesh = new THREE.Mesh(cabeza, MatCabeza);

		var MatOjos = new THREE.MeshPhongMaterial({color: 0x000000});
		var ojo1Mesh = new THREE.Mesh(ojo1, MatOjos);
		var ojo2Mesh = new THREE.Mesh(ojo2, MatOjos);

		var MatBoca = new THREE.MeshPhongMaterial({color: 0xFFD278});
		var bocaMesh = new THREE.Mesh(boca, MatBoca);

		ojo1Mesh.translateY(0.25);
		ojo1Mesh.translateX(0.5);
		ojo1Mesh.translateZ(-0.25);
		ojo2Mesh.translateY(0.25);
		ojo2Mesh.translateX(0.5);
		ojo2Mesh.translateZ(0.25);
		bocaMesh.translateY(-0.2);
		bocaMesh.translateX(0.5);

		cabezaMesh.add(ojo1Mesh);
		cabezaMesh.add(ojo2Mesh);
		cabezaMesh.add(bocaMesh);

		cabezaMesh.translateY(0.5);

		return cabezaMesh;
	}

	crearCuerpo() {
		var cuerpo = new THREE.BoxBufferGeometry(3.25,2,2);

		var Mat = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
		var cuerpoMesh = new THREE.Mesh(cuerpo, Mat);

		return cuerpoMesh;
	}

	crearAla() {
		var ala = new THREE.BoxBufferGeometry(1.5, 1.5, 0.25);

		var Mat = new THREE.MeshPhongMaterial({color: 0xD1D1D1});
		var alaMesh = new THREE.Mesh(ala, Mat);

		alaMesh.translateY(-0.75);

		return alaMesh;
	}

	crearPata() {
		var muslo = new THREE.BoxBufferGeometry(0.25, 1.25, 0.25);
		var pie = new THREE.BoxBufferGeometry(0.5, 0.25/2, 0.25);

		var Mat = new THREE.MeshPhongMaterial({color: 0xFFD278});
		var pieMesh = new THREE.Mesh(pie, Mat);
		
		var MusMesh = new THREE.Mesh(muslo, Mat);
		MusMesh.translateY(1.25/2);
		pieMesh.translateY((0.25/2)/2);
		pieMesh.translateX(0.25);

		var csg = new CSG.CSG();
		csg.union([MusMesh, pieMesh]);

		var final = csg.toMesh();
		final.translateY((0.25/2)+1.25);

		return final;
	}

	/*updateIzquierda () {		

		this.animal.position.z -= 0.1;
		this.camera.position.z -= 0.1;
	}

	updateDerecha () {		

		this.animal.position.z += 0.1;
		this.camera.position.z += 0.1;
	}

	updateDelante () {

		this.animal.position.x += 0.1;
		this.camera.position.x += 0.1;

	}

	getCamera () {
		// En principio se devuelve la única cámara que tenemos
		// Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
		return this.camera;
	  }*/

	
}



export { MyPersonaje };

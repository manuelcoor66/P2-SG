import * as THREE from '../libs/three.module.js'
import * as CSG from '../libs/CSG-v2.js'

class MyPersonaje extends THREE.Object3D {
	constructor(gui) {
		super();

		/*this.humano = this.crearHumano();
		this.pogo = this.crearPogo();

		this.personaje = new THREE.Object3D();
		this.personaje.add(this.humano, this.pogo);*/

		this.animal = this.crearAnimal();

		this.final = new THREE.Object3D()
		this.final.add(this.animal);

		this.add(this.animal);
	}

	crearAnimal() {
		var cabeza = this.crearCabeza()
		var cuerpo = this.crearCuerpo();
		var ala = this.crearAla();

		ala.translateX(-2);

		var animal = new THREE.Object3D();
		animal.add(cabeza, cuerpo, ala);

		return animal;
	}

	crearCabeza() {
		var cabeza = new THREE.BoxBufferGeometry(1,1,1);
		var ojo_derecho = new THREE.BoxBufferGeometry();
		var ojo_izquierdo = new THREE.BoxBufferGeometry();
		var boca = new THREE.BoxBufferGeometry();

		var Mat = new THREE.MeshPhongMaterial({color: 0xCF0000});
		var cabezaMesh = new THREE.Mesh(cabeza, Mat);

		cabezaMesh.translateY(0.5);

		return cabezaMesh;
	}

	crearCuerpo() {
		var cuerpo = new THREE.BoxBufferGeometry(2,2.5,4);
		cuerpo.translate(4, 1.25, 0);

		var Mat = new THREE.MeshPhongMaterial({color: 0xCF0000});
		var cuerpoMesh = new THREE.Mesh(cuerpo, Mat);

		return cuerpoMesh;
	}

	crearAla() {
		var ala = new THREE.BoxBufferGeometry(2, 0.5, 2);

		var Mat = new THREE.MeshPhongMaterial({color: 0xCF0000});
		var alaMesh = new THREE.Mesh(ala, Mat);

		return alaMesh;
	}

	crearPata() {
		var muslo = new THREE.BoxBufferGeometry(2, 0.5, 0.5);
		var pie = new THREE.BoxBufferGeometry(2, 0.25, 0.25);

		var Mat = new THREE.MeshPhongMaterial({color: 0xCF0000});
		var pataMesh = new THREE.Mesh(pie, Mat);

		var csg = new CSG.CSG();
		csg.union([cilExtMesh, toroMesh]);

		return pieMesh;
	}
  
	/*crearHumano() {
		var cabeza = new THREE.SphereBufferGeometry();
		var cuerpo = new THREE.BoxBufferGeometry();
		var brazo = new THREE.BoxBufferGeometry();
		var pierna = new THREE.BoxBufferGeometry();
		var antepierna = new THREE.BoxBufferGeometry();
	}
  
	crearPogo() {
		var manillar = new THREE.BoxBufferGeometry();
		var parte_central = new THREE.CylinderBufferGeometry();
		var reposapies = new THREE.BoxBufferGeometry();
		var rebota = new THREE.CylinderBufferGeometry();
	}*/
}



export { MyPersonaje };

var container;
var camera, scene, renderer, group, particle, raycaster, mouse, INTERSECTED;
var particles = [];
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var PI2 = Math.PI * 2;
init();
animate();

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0,0,400);
    camera.lookAt(scene.position);  

    renderer = new THREE.CanvasRenderer(); 
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container.appendChild( renderer.domElement );
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    // CONTROLS
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    // Group
    group = new THREE.Object3D();
    for ( var i = 0; i < items.length; i++ ) {
        var geometry =new THREE.SphereGeometry( 10, 10, 10 );
        geometry.mergeVertices()
        var material = new THREE.MeshBasicMaterial({
            color: Math.random() * 0x808008 + 0x808080,
        });
        var particle = new THREE.Mesh(geometry, material);
        particle.position.x = Math.random() * 2000 - 1000;
        particle.position.y = Math.random() * 2000 - 1000;
        particle.position.z = Math.random() * 2000 - 1000;
        particle.rotation.y = Math.random() * 2 * Math.PI;
        particle.scale.x = particle.scale.y = particle.scale.z = Math.random() * 12 + 5;
        group.add( particle );
        particle.userData = items[i];
    }
    scene.add( group );

    // RAYCASTING
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Event Listeners
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
}

/**
 * Detects when a particle has been clicked
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function onMouseMove(e) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(group.children);
    if (intersects.length > 0) {
        //get a link from the userData object
        console.log(intersects[0].object.userData);
    }
};

function animate() {
    controls.update();

    //update raycaster with mouse movement  
    raycaster.setFromCamera(mouse, camera);
    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(group.children);
    //count and look after all objects in the diamonds group
    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            //setting up new material on hover
            INTERSECTED.material.color.setHex(Math.random() * 0xff00000 - 0xff00000);
        }
    } else {
        if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
        INTERSECTED = null;
    }

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
var container;
var camera, scene, renderer, group, particle;
var isMouseDown;
var particles = [];
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
init();
animate();

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
    camera.position.z = 1000;
    scene = new THREE.Scene();
    var PI2 = Math.PI * 2;
    var program = function ( context ) {
        context.beginPath();
        context.arc( 0, 0, 0.5, 0, PI2, true );
        context.fill();
    };
    group = new THREE.Group();
    scene.add( group );
    for ( var i = 0; i < items.length; i++ ) {
        var material = new THREE.SpriteCanvasMaterial( {
            color: Math.random() * 0x808008 + 0x808080,
            program: program
        } );
        particle = new THREE.Sprite( material );
        particle.position.x = Math.random() * 2000 - 1000;
        particle.position.y = Math.random() * 2000 - 1000;
        particle.position.z = Math.random() * 2000 - 1000;
        particle.scale.x = particle.scale.y = Math.random() * 20 + 10;
        group.add( particle );
        items[i].particle = particle;
    }
    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    document.addEventListener( 'mouseup', function() { 
        isMouseDown=false; 

    }, false );
    document.addEventListener( 'mousedown', function() { isMouseDown=true; }, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    document.addEventListener('mousedown', onMouseDown, false);
    //
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

//
function onDocumentMouseMove( event ) {
    if (isMouseDown === true) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }
}

function onDocumentTouchStart( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}

function onDocumentTouchMove( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}

/**
 * Detects when a particle has been clicked
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function onMouseDown(e) {
    var vectorMouse = new THREE.Vector3( //vector from camera to mouse
        -(window.innerWidth/2-e.clientX)*2/window.innerWidth,
        (window.innerHeight/2-e.clientY)*2/window.innerHeight,
        -1/Math.tan(22.5*Math.PI/180)); //22.5 is half of camera frustum angle 45 degree
    vectorMouse.applyQuaternion(camera.quaternion);
    vectorMouse.normalize();        

    var vectorObject = new THREE.Vector3(); //vector from camera to object
    for (var i = 0; i < items.length; i ++) {
        var particle = items[i].particle
        vectorObject.set(particle.position.x - camera.position.x,
                         particle.position.y - camera.position.y,
                         particle.position.z - camera.position.z);
        vectorObject.normalize();
        if (vectorMouse.angleTo(vectorObject)*180/Math.PI < 6) {
            console.log(items[i]);
            mouseY = 0;
            mouseX = 0;
        }
    }
    
}

//
function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    // camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    camera.lookAt( scene.position );
    group.rotation.x += ( mouseY - camera.rotation.x ) * 0.00005;
    group.rotation.y += ( - mouseX - camera.rotation.y ) * 0.00005;
    renderer.render( scene, camera );
}
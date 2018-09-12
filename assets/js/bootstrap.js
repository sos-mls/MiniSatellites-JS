Bootstrap = (function() {
    var _container, _camera, _scene, _renderer, _group, _raycaster, _mouse, INTERSECTED, SCREEN_WIDTH, SCREEN_HEIGHT;
    var _current_item = GetItem(1);
    document.getElementById('header').innerHTML = _current_item.name;

    function init() {
        _container = createContainer();
        _scene = new THREE.Scene();
        _camera = createCamera(_scene);
        _renderer = createRenderer(_container);
        THREEx.WindowResize(_renderer, _camera);
        controls = new THREE.OrbitControls( _camera, _renderer.domElement );

        setupGroup();
        setupRaycasting();

        animate();
    }  

    function createContainer() {
        var container = document.createElement( 'div' );
        document.body.appendChild( container );
        return container;
    }

    function createCamera(_scene) {
        SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
        var camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        _scene.add(camera);
        camera.position.set(0,0,10000);
        camera.lookAt(_scene.position);
        return camera;
    }

    function createRenderer(container) {
        var renderer = new THREE.WebGLRenderer( {antialias:true} );
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        container.appendChild( renderer.domElement );
        return renderer;
    }

    function setupGroup() {
        renderScene();

        // add event listener for handling click events on the particle
        document.addEventListener('mouseup', function(event) {
            event.preventDefault();
            _mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            _mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            _raycaster.setFromCamera(_mouse, _camera);
            var intersects = _raycaster.intersectObjects(_group.children);
            if (intersects.length > 0) {
                //get a link from the userData object
                console.log(intersects[0].object.userData.item);
                _current_item = GetItem(intersects[0].object.userData.item.id);
                document.getElementById('header').innerHTML = _current_item.name;
                _scene.remove(_group);
                renderScene();
            }
        }, false);
    }

    function renderScene()
    {
        _group = new THREE.Object3D();
        var particle = null;
        for ( var i = 0; i < _current_item.relations.length; i++ ) {
            particle = createRandomParticle(_current_item.relations[i]);
            _group.add( particle );
            _group.add(createCircle( particle ));
        }

        // add current item to center
        _group.add( createParticle(_current_item, 0xffff00, { x: 0, y: 0, z: 0}, { x: 20, y: 20, z: 20}) );

        _scene.add( _group );
    }

    function createCircle(particle) {
        var radius = Math.sqrt(Math.pow(particle.position.x, 2) + Math.pow(particle.position.y, 2)),
        segments = 64,
        material = new THREE.LineBasicMaterial( { color: 0xffffff } ),
        geometry = new THREE.CircleGeometry( radius, segments );

        // Remove center vertex
        geometry.vertices.shift();


        // To get a closed circle use LineLoop instead (see also @jackrugile his comment):
        var circle = new THREE.LineLoop( geometry, material );
        console.log(particle.position);
        console.log(radius)
        return circle;
    }

    function createRandomParticle(item) {
        var color = Math.random() * 0x808008 + 0x808080;
        var position = {
            x: Math.random() * 4000 - 500,
            y: Math.random() * 4000 - 500,
            z: 0,
        };
        var scaleSize = Math.random() * 12 + 5;
        var scale = {
            x: scaleSize,
            y: scaleSize,
            z: scaleSize,
        };

        return createParticle(
            item,
            Math.random() * 0x808008 + 0x808080,
            position,
            scale
        );
    }

    function createParticle(item, color, position, scale) {
        var geometry =new THREE.SphereGeometry( 10, 10, 10 );
        geometry.mergeVertices();
        var material = new THREE.MeshBasicMaterial({
            color: color,
        });
        var particle = new THREE.Mesh(geometry, material);
        particle.position.x = position.x;
        particle.position.y = position.y;
        particle.position.z = position.z;
        particle.scale.x = scale.x;
        particle.scale.y = scale.y;
        particle.scale.z = scale.z;
        particle.userData = {
            item: item,
            hoverColor: Math.random() * 0x808008 + 0x808080
        };

        return particle;
    }

    function setupRaycasting() {
        _raycaster = new THREE.Raycaster();
        _mouse = new THREE.Vector2();

        // add Event Listener for _mouse vector
        document.addEventListener('mousemove', function() {
            _mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            _mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }, false);
    }

    function handleMouseHover() {
        _raycaster.setFromCamera(_mouse, _camera);
        // calculate objects intersecting the picking ray
        var intersects = _raycaster.intersectObjects(_group.children);
        //count and look after all objects in the diamonds _group
        if (intersects.length > 0) {
            if (INTERSECTED != intersects[0].object && intersects[0].object.userData.item !== undefined) {
                if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
                INTERSECTED = intersects[0].object;
                INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                //setting up new material on hover
                INTERSECTED.material.color.setHex(INTERSECTED.userData.hoverColor);
                document.getElementById('header').innerHTML = INTERSECTED.userData.item.name;
            }
        } else {
            if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            INTERSECTED = null;
            document.getElementById('header').innerHTML = _current_item.name;
        }
    }

    function animate() {
        controls.update();

        if (INTERSECTED === null) {
            _group.rotation.z += 0.005;
        }

        //update _raycaster with _mouse movement  
        handleMouseHover();

        requestAnimationFrame( animate );
        _renderer.render( _scene, _camera );
    }

    return {
        init: init,
        animate: animate
    };
})();

Bootstrap.init();
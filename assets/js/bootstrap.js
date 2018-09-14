Bootstrap = (function() {

    function init() {
        SolarSystem.init(createContainer(), [
            { 
                id: 2,
                importance: Math.random(),
                scale: Math.random(),
                onHover: function() {
                    document.getElementById('header').innerHTML = 'The Secret Life of Bees';
                }
            },
            { 
                id: 3,
                importance: Math.random(),
                scale: Math.random(),
                onHover: function() {
                    document.getElementById('header').innerHTML = 'Das Buch der Bilder';
                }
            },
            { 
                id: 4,
                importance: Math.random(),
                scale: Math.random(),
                onHover: function() {
                    document.getElementById('header').innerHTML = 'Das Knaben Wunderhorn';
                }
            },
            { 
                id: 5,
                importance: Math.random(),
                scale: Math.random(),
                onHover: function() {
                    document.getElementById('header').innerHTML = 'Das Stunden-Buch';
                }
            },
            { 
                id: 6,
                importance: Math.random(),
                scale: Math.random(),
                onHover: function() {
                    document.getElementById('header').innerHTML = 'Day by Day';
                }
            },
            { 
                id: 7,
                importance: Math.random(),
                scale: Math.random(),
                onHover: function() {
                    document.getElementById('header').innerHTML = 'Death and Fame: Poems 1993–1997';
                }
            },
            { 
                id: 8,
                importance: Math.random(),
                scale: Math.random(),
                onHover: function() {
                    document.getElementById('header').innerHTML = 'Dhanu Dnyaniyaachi';
                }
            }
        ])
    }

    function createContainer() {
        var container = document.createElement( 'div' );
        document.body.appendChild( container );
        return container;
    }

    return {
        init: init
    };
})();

SolarSystem = (function() {
    var _container, _planets, _camera, _scene, _renderer, _group, _revolving_planets, _raycaster, _mouse, INTERSECTED, SCREEN_WIDTH, SCREEN_HEIGHT, MAX_RADIUS;
    var MAX_SIZE = { x: 20, y: 20, z: 20};

    function init(container, planets) {
        _container = container;
        _planets = planets;
        _scene = new THREE.Scene();
        _camera = createCamera(_scene);
        _renderer = createRenderer(_container);
        THREEx.WindowResize(_renderer, _camera);
        controls = new THREE.OrbitControls( _camera, _renderer.domElement );

        renderScene();
        setupRaycasting();

        animate();
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

    function renderScene()
    {
        _group = new THREE.Object3D();
        _revolving_planets = [];
        var planet, circle, planet_group;
        for ( var i = 0; i < _planets.length; i++ ) {
            planet = Planet.createRandom(_planets[i], {
                x: _planets[i].scale * MAX_SIZE.x,
                y: _planets[i].scale * MAX_SIZE.y,
                z: _planets[i].scale * MAX_SIZE.z,
            }, _planets[i].importance);
            circle = Planet.createPath( planet );
            planet_group = new THREE.Object3D();
            planet_group.add( planet );
            planet_group.add( circle );
            _group.add(planet_group);
            _revolving_planets.push(planet_group);
        }

        // add current item to center
        _group.add( Planet.create({}, 0xffff00, { x: 0, y: 0, z: 0}, MAX_SIZE) );

        _scene.add( _group );
        MAX_RADIUS = undefined;
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
        var intersects = [];
        for (var i = 0; i < _revolving_planets.length; i ++) {
            var intersections = _raycaster.intersectObjects(_revolving_planets[i].children);
            for (var j = 0; j < intersections.length; j ++) {
                intersects.push(intersections[j]);
            }
        }
        //count and look after all objects in the diamonds _group
        if (intersects.length > 0) {
            if (INTERSECTED != intersects[0].object && intersects[0].object.userData.item !== undefined) {
                if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
                INTERSECTED = intersects[0].object;
                INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                //setting up new material on hover
                INTERSECTED.material.color.setHex(INTERSECTED.userData.hoverColor);
                INTERSECTED.userData.item.onHover();
            }
        } else {
            if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            INTERSECTED = null;
        }
    }

    function animate() {
        controls.update();
        animatePlanets();
        //update _raycaster with _mouse movement  
        handleMouseHover();

        requestAnimationFrame( animate );
        _renderer.render( _scene, _camera );
    }

    /**
     * Updates the speed of the planets if they are not being hovered on.
     */
    function animatePlanets() {
        var speed;
        for (var i = 0; i < _revolving_planets.length; i ++) {
            if (INTERSECTED == null
                || INTERSECTED.userData.item.id !== _revolving_planets[i].children[0].userData.item.id) {
                _revolving_planets[i].rotation.z += calculatePlanetSpeed(_revolving_planets[i].children[1].userData.radius);
            }
        }
    }

    /**
     * Calculates the planets speed by the current radius of the planet around the center.
     * 
     * @param  {float} radius The radius of the planet.
     * @return {float}        The speed of the planet
     */
    function calculatePlanetSpeed(radius) {
        if (MAX_RADIUS == undefined)
            MAX_RADIUS = calculateMaxRadius();
        return ((MAX_RADIUS - radius) / 90000) + 0.001;
    }

    /**
     * Calculates the current max radius of the revolving planets.
     * 
     * @return {float} The max radius.
     */
    function calculateMaxRadius() {
        var maxRadius = 0;
        for (var i = 0; i < _revolving_planets.length; i ++) {
            if (maxRadius < _revolving_planets[i].children[1].userData.radius) {
                maxRadius = _revolving_planets[i].children[1].userData.radius;
            }
        }

        return maxRadius;
    }

    return {
        init: init
    }
})()

Planet = (function() {

    function createPath(planet) {
        var radius = Math.sqrt(Math.pow(planet.position.x, 2) + Math.pow(planet.position.y, 2)),
        segments = 64,
        material = new THREE.LineBasicMaterial( { color: 0xffffff } ),
        geometry = new THREE.CircleGeometry( radius, segments );

        // Remove center vertex
        geometry.vertices.shift();


        // To get a closed path use LineLoop instead (see also @jackrugile his comment):
        var path = new THREE.LineLoop( geometry, material );
        path.userData = {
            radius: radius
        };
        return path;
    }

    function createRandom(item, scale, importance) {
        var color = Math.random() * 0x808008 + 0x808080;
        var position = {
            x: (importance * 4000) + 500,
            y: (importance * 4000) + 500,
            z: 0,
        };
        var scaleSize = Math.random() * 12 + 5;
        return create(
            item,
            Math.random() * 0x808008 + 0x808080,
            position,
            scale
        );
    }

    function create(item, color, position, scale) {
        var geometry =new THREE.SphereGeometry( 10, 10, 10 );
        geometry.mergeVertices();
        var material = new THREE.MeshBasicMaterial({
            color: color,
        });
        var planet = new THREE.Mesh(geometry, material);
        planet.position.x = position.x;
        planet.position.y = position.y;
        planet.position.z = position.z;
        planet.scale.x = scale.x;
        planet.scale.y = scale.y;
        planet.scale.z = scale.z;
        planet.userData = {
            item: item,
            hoverColor: Math.random() * 0x808008 + 0x808080
        };

        return planet;
    }

    return {
        create: create,
        createPath: createPath,
        createRandom: createRandom
    }
})()

Bootstrap.init();
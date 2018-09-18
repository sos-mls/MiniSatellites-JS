import SolarSystem from 'solarsystem-graph'

SolarSystem(createContainer(), [
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
    },
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

function createContainer() {
    var container = document.createElement( 'div' );
    document.body.appendChild( container );
    return container;
}
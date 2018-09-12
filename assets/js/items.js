var itemList = [
    { 
        id: 1,
        name: 'Glass Castle', 
        json: null,
    },
    { 
        id: 2,
        name: 'The Secret Life of Bees', 
        json: null 
    },
    { 
        id: 3,
        name: 'Das Buch der Bilder', 
        json: null 
    },
    { 
        id: 4,
        name: 'Das Knaben Wunderhorn', 
        json: null 
    },
    { 
        id: 5,
        name: 'Das Stunden-Buch', 
        json: null 
    },
    { 
        id: 6,
        name: 'Day by Day', 
        json: null 
    },
    { 
        id: 7,
        name: 'Death and Fame: Poems 1993–1997', 
        json: null 
    },
    { 
        id: 8,
        name: 'Dhanu Dnyaniyaachi', 
        json: null 
    },
    { 
        id: 9,
        name: 'Dictee', 
        json: null 
    },
    { 
        id: 10,
        name: 'Dramatic Lyrics — Robert Browning', 
        json: null 
    },
    { 
        id: 11,
        name: 'Dramatic Romances and Lyrics — Robert Browning', 
        json: null 
    },
    { 
        id: 12,
        name: 'Dramatis Personae — Robert Browning', 
        json: null 
    },
    { 
        id: 13,
        name: 'Duisener Elegien', 
        json: null 
    },
    { 
        id: 14,
        name: 'Early Work – Patti Smith', 
        json: null 
    },
    { 
        id: 15,
        name: 'Eclogues', 
        json: null 
    },
    { 
        id: 16,
        name: 'Edda, Elder Edda', 
        json: null 
    },
    { 
        id: 17,
        name: 'Emblems of a Season of Fury', 
        json: null 
    },
    { 
        id: 18,
        name: 'Empty Mirror: Early Poems', 
        json: null 
    },
    { 
        id: 19,
        name: 'Epistle to a Godson and Other Poems', 
        json: null 
    },
    { 
        id: 20,
        name: 'Exultations', 
        json: null 
    },
    { 
        id: 21,
        name: 'The Exeter Book', 
        json: null 
    },
    { 
        id: 22,
        name: 'Feminine Gospels - Carol Ann Duffy', 
        json: null 
    },
    { 
        id: 23,
        name: 'First Blues: Rags, Ballads & Harmonium Songs 1971 - 1974', 
        json: null 
    },
    { 
        id: 24,
        name: 'Fly by Night', 
        json: null 
    },
    { 
        id: 25,
        name: 'For the Time Being', 
        json: null 
    },
    { 
        id: 26,
        name: 'For the Union Dead', 
        json: null 
    },
    { 
        id: 27,
        name: 'Four Quartets', 
        json: null 
    },
    { 
        id: 28,
        name: 'From Snow to Snow', 
        json: null 
    },
];

window.GetItem = function(itemId) {
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].id == itemId) {
            var item = itemList[i];
            item.relations = GetRelations(itemId);
            return item;
        }
    }
}

window.GetRelations = function(itemId) {
    var relations = [];
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].id != itemId) {
            relations.push(itemList[i]);
        }
    }
    return relations;
}
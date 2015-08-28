var express     = require('express');
var router      = express.Router();             

// local global store --> In Node, this will persist across requests.
// Once you restart the server, this will default back to this original
var _animals = [
    { id: 1, type: 'cat', name: 'Blackjack', age: 20 },
    { id: 2, type: 'horse', name: 'Lightning', age: 12 },
    { id: 3, type: 'dog', name: 'Speedy', age: 2 },
    { id: 4, type: 'cat', name: 'Carrot', age: 8 },
];

// retrieve all
router.get('/animals', function (req, res) {
    res.json(_animals);
});

// retrieve one
router.get('/animals/:id', function (req, res) {
    res.json(_animals.findById(~~req.params.id));
})

// create one
router.post('/animals', function (req, res) {
    var created = _animals.create(req.body);
    // Return whether or not it was successfully created
    res.json({ success: created });
});

// Update one
router.put('/animals/:id', function (req, res) {
    var updated = _animals.update(~~req.params.id, req.body);
    // Return whether or not it was successfully updated
    res.json({ success: updated });
});

// delete one
router.delete('/animals/:id', function (req, res) {
    var deleted = _animals.delete(~~req.params.id);
    // Return whether or not it was successfully deleted
    res.json({ success: deleted });
});

// ----------------------------------------------------------------------------
// Private Methods
// ----------------------------------------------------------------------------

// Store the next ID
_animals.nextId = 5;

_animals.findById = function(id) {
    var index = this.findIndexById(id);
    return (index > -1) ? this[index] : {};
};

_animals.create = function(animal) {
    // Create a safe version of animal
    var myAnimal = this.createSafe(this.nextId, animal);

    // Push to the animals array in memory.
    this.push(myAnimal)

    // Increment id
    this.nextId += 1;

    return true;
};

_animals.update = function(id, animal) {
    var index = this.findIndexById(id);

    // Make sure that this id even exists
    if (index === -1) return false;

    // Create a safe version of animal
    var myAnimal = this.createSafe(id, animal);

    // make the non-undefined fields of myAnimal
    var updatedAnimal = this.merge(id, myAnimal);

    console.log('updated', updatedAnimal);
    console.log('myAnimal', myAnimal);

    // Update animal in the array
    this.splice(index, 1, updatedAnimal);

    return true;
};

_animals.delete = function(id) {
    var index = this.findIndexById(id);

    // Make sure that this id even exists
    if (index === -1) return false;

    // Get that animal out of here!
    this.splice(index, 1);

    return true;
};

_animals.findIndexById = function(id) {
    for (var i=0; i<this.length; i++) {
        if (id === this[i].id) return i;
    }
    return -1;
};

_animals.createSafe = function(id, animal) {
    return {
        id: id,
        type: animal.type,
        name: animal.name,
        age: animal.age
    }
};

_animals.merge = function(id, newAnimal) {
    var index = this.findIndexById(id);

    return {
        id: id,
        type: (newAnimal.type) ? newAnimal.type : this[index].type,
        name: (newAnimal.name) ? newAnimal.name : this[index].name,
        age: (newAnimal.age) ? newAnimal.age : this[index].age
    }
};

module.exports = router;
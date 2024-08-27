import Person from '../models/personModel.js';

// Create and Save a Record of a Model
const createAndSavePerson = (req, res) => {
    const { name, age, favoriteFoods } = req.body;
    const person = new Person({ name, age, favoriteFoods });
    person.save((err, data) => {
        if (err) return res.status(500).send(err);
        res.status(201).send(data);
    });
};

// Create Many Records with model.create
const createManyPeople = (req, res) => {
    const arrayOfPeople = req.body;
    Person.create(arrayOfPeople, (err, people) => {
        if (err) return res.status(500).send(err);
        res.status(201).send(people);
    });
};

// Use model.find() to Search Your Database
const findPeopleByName = (req, res) => {
    const { name } = req.params;
    Person.find({ name }, (err, people) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(people);
    });
};

// Use model.findOne() to Return a Single Matching Document
const findOneByFood = (req, res) => {
    const { food } = req.params;
    Person.findOne({ favoriteFoods: food }, (err, person) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(person);
    });
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (req, res) => {
    const { id } = req.params;
    Person.findById(id, (err, person) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(person);
    });
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (req, res) => {
    const { id } = req.params;
    const foodToAdd = 'hamburger';
    Person.findById(id, (err, person) => {
        if (err) return res.status(500).send(err);
        person.favoriteFoods.push(foodToAdd);
        person.save((err, updatedPerson) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(updatedPerson);
        });
    });
};

// Perform New Updates on a Document Using model.findOneAndUpdate
const findAndUpdate = (req, res) => {
    const { name } = req.params;
    const ageToSet = 20;
    Person.findOneAndUpdate({ name }, { age: ageToSet }, { new: true }, (err, updatedPerson) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(updatedPerson);
    });
};

// Delete One Document Using model.findByIdAndRemove
const removeById = (req, res) => {
    const { id } = req.params;
    Person.findByIdAndRemove(id, (err, removedPerson) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(removedPerson);
    });
};

// MongoDB and Mongoose - Delete Many Documents with model.remove
const removeManyPeople = (req, res) => {
    const nameToRemove = 'Mary';
    Person.remove({ name: nameToRemove }, (err, outcome) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(outcome);
    });
};

// Chain Search Query Helpers to Narrow Search Results
const queryChain = (req, res) => {
    const foodToSearch = 'burritos';
    Person.find({ favoriteFoods: foodToSearch })
        .sort('name')
        .limit(2)
        .select('-age')
        .exec((err, data) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(data);
        });
};

export {
    createAndSavePerson,
    createManyPeople,
    findPeopleByName,
    findOneByFood,
    findPersonById,
    findEditThenSave,
    findAndUpdate,
    removeById,
    removeManyPeople,
    queryChain
};

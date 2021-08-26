const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers.js');
const { zookeepers } = require('../data/zookeepers.json');
const { test, expect } = require('@jest/globals');

jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        {name: "Zoe", id: "aoicwdoin" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Zoe");
    expect(zookeeper.id).toBe("aoicwdoin");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "1",
            name: "Mo",
            age: 35,
            favoriteAnimal: "tiger", 
        },
        {
            id: "2",
            name: "Jim",
            age: 60,
            favoriteAnimal: "bat",
        },
    ];

    const updatedZookeepers = filterByQuery({ favoriteAnimal: "bat" }, startingZookeepers);

    expect (updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "1",
            name: "Mo",
            age: 35,
            favoriteAnimal: "tiger", 
        },
        {
            id: "2",
            name: "Jim",
            age: 60,
            favoriteAnimal: "bat",
        },
    ];

    const result = findById("1", startingZookeepers);

    expect(result.name).toBe("Mo");
});

test("validates age", () => {
    const zookeeper = {
        id: "1",
        name: "Mo",
        age: 35,
        favoriteAnimal: "tiger", 
    };

    const invalidZookeeper = {
        id: "2",
        name: "Jim",
        age: "60",
        favoriteAnimal: "bat",
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});
'use strict';
const {createDataStorage} = require('./jsonstorage/dataStorageLayer');
const storage = createDataStorage();

// console.log(storage.CODES);

storage.getAll().then(moped=>console.log(moped))
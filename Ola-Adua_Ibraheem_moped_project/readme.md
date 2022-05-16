# EXPRESS PROJECT

## Moped data storage(Ola-Adua_Ibraheem_mopeds.json)

### Ola-Adua_Ibraheem_mopeds.json.json

The mopedId is unique

```json
[
  {
    "mopedId": 6,
    "name": "Daddy 1",
    "modelYear": 2012,
    "topspeed": 20,
    "itemsInStock": 150
  },
  {
    "mopedId": 7,
    "name": "Grampa 89",
    "modelYear": 2005,
    "topspeed": 5,
    "itemsInStock": 100
  }
  ...
]
```

### storageConfig.json

```json
{
  "storageFile": "Ola-Adua_Ibraheem_mopeds.json",
  "errorCodes": "errorCodes.js"
}
```

The implementation is wrapped in a createDataStorage function. Function returns DataStorage object.

### public API (methods of DataStorage class)

- getAll()
  - returns an array of all moped/[]
- get(id)
  - returns a moped object/NOT_FOUND
- insert(newMoped)
  - returns INSERT_OK/NOT_INSERTED/ALREADY_IN_USE
- update(moped)
  - returns UPDATE_OK/NOT_UPDATED
- remove(id)
  - returns REMOVE_OK/NOT_FOUND/NOT_REMOVED
- getter for error codes
  - returns an array of error codes

### private API(can be used only inside wrapper function)

- readStorage()
  - returns an array of moped/[]
- writeStorage(data)
  - returns WRITE_OK/WRITE_ERROR
- getFromStorage(key,value)
  - returns an moped object/ null
- addToStorage(newMoped)
  - returns true/false
- updateStorage(updatedMoped)
  - returns true/false
- removeFromStorage(id)
  - returns true/false

### Error codes and messages

```js
const CODES = {
    PROGRAM_ERROR: 0,
    NOT_FOUND:1,
    INSERT_OK:2,
    ...
}
```

The format of an error message is:

```js
const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in the program",
    code: CODES.PROGRAM_ERROR,
    type: "error",
  }),
  NOT_FOUND: (id) => ({
    message: `No employee found with employeeId${id}`,
    code: CODES.NOT_FOUND,
  }),
  INSERT_OK: (ID) => ({
    message: `Employee ${id} was inserted`,
    code: CODES.INSERT_OK,
    type: "info",
  }),
  ...
};
```

error types are `error` or `info`

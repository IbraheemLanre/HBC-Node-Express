# Employee data storage

## employees.json

The employeeId is unique

```json
[
  {
    "employeeId": 1,
    "firstname": "Leila",
    "lastname": "Höikki",
    "department": "ict",
    "salary": 4000
  },
  {
    "employeeId": 2,
    "firstname": "Matt",
    "lastname": "River",
    "department": "ict",
    "salary": 4000
  }
]
```

## storageConfig.json

```json
{
  "storageFile": "employees.json",
  "errorCodes": "errorCodes.js"
}
```

The implementation is wrapped in a createDataStorage function. Function returns DataStorage object.

### public API (methods of DataStorage class)

- getAll()
  - returns an array of all empolyees/[]
- get(id)
  - returns an employee object/NOT_FOUND
- insert(newEmployee)
  - returns INSERT_OK/NOT_INSERTED/ALREADY_IN_USE
- update(updateEmployee)
  - returns UPDATE_OK/NOT_UPDATED
- remmove(id)
  - returns REMOVE_OK/NOT-FOUND/NOT_REMOVED
- getter for error codes
  - returns as array of error codes

### private API(can be used only inside wrapper function)

- readStorage()
  - returns an array of employees/[]
- writeStorage(data)
  - returns WRITE_OK/WRITE_ERROR
- getFromStorage(key,value)
  - returns an employee object/ null
- addToStorage(newEmployee)
  - returns true/false
- updateStorage(updatedEmolyee)
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
};
```

error types are `error` or `info`

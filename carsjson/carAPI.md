# car API

## **getAllCars**

The function _getAllCars_ returns all car object in the array.

## **getCar(key, value)**

The function _getCar_ get all cars that match the given key-value pair. It takes key and value parameters.

The function returns:

- the function returns an array of all cars of the given key-value pair
  -if there is no match, an empty array is returned.

## **getWithModel**

The function _getWithModel_ gets all cars with the given model. It takes the car model as a parameter.

The function returns:

- all cars of the given model.
  -if no car is found then it returns nothing.

## _\*\*getWithLicence_

The function _getWithLicence_ get the car with the given licence number. the licence number is unique. The function takes the licence as a parameter.

The function returns:

- that car object if it found.
- `null` if no car with the given licence was found.

## Server

The server was created to render client data.

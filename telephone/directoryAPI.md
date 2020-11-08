# PHONE DIRECTORY API

## **getAllNumbers**

The function _getAllNumbers_ returns all object in the directory array.

## **getType()**

The function _getType_ get all phone types.

The function returns:

- the function returns an array of phone types.
  -if there is no match, an empty array is returned.

## **getNumbersByType(firstname, lastname, type)**

The function _getNumbersByType_ gets all numbers with the given type from the array. It takes firstname, lastname, type as parameters.

The function returns:

- all the phone numbers with the given parameters.
  -if there is a missing parameter then there's going be an error message. If there's no matching parameter, it returns nothing.

## **getAllNumbersByType(type)**

The function _getAllNumbersByType_ gets all numbers with the given phone type. The function takes the type as a parameter.

The function returns:

- an object with firstname, lastname, and number.
- `null` if no type is found.

## **getName(number)**

The function _getName_ gets all directory with the given phone number. The function takes the number as a parameter.

The function returns:

- an object with firstname and lastname.
- `null` if not found.

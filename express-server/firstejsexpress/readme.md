# FIRST EJS-EXPRESS SERVER

This folder contains codes(server-side) for serving data using express.js and ejs to handle post request. If data is entered and submitted through the form, the submitted data can then be seen after the submit button is clicked.

## pagetemplates
Files in the **pagetemplates** are used for returning data and requests made from the client-side.

## index.js
The **index.js** file is used for handling the post request from the **result.ejs** file.

## indexErrPage.js
This file contains some hardcoded user info (username and password). If an unknown user whose info isn't stored in the user object tries to login he/she would be denied access, an error message is rendered to this effect from the **errorpage.ejs**. However, if the user is present in the user object then his/her info is render on the **result.ejs** page. 

The file **users.ejs** is used to show all user info in the user object.

The file **tableDemo.ejs** is used to render the result of car object.

The file **tableDemoIf.ejs** is used to render the conditional content of the car object. If the car array is empty then a *no cars found* page is dispayed otherwise the car table is displayed. 
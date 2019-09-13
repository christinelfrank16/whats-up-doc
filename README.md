# What's Up Doc?

#### This application assists the user in finding a local doctor, 13-Sept-2019

#### By **Christine Frank**

## Description

This application aids the user in finding a doctor that provides the user's needed service(s). The user can enter a medical issue and the application will match and provide a list of doctors in the local area. Alternatively, the user can search for a doctor by name and receive information about the services they provide.

## Setup/Installation Requirements

#### View a local version of this Site
* Clone this repository to your desktop
* Sign up at https://developer.betterdoctor.com and request an API key
* Create a .env file in the root folder of the local directory
* Create the variable name 'exports.apiKey' and copy **YOUR** api key as the value
  * Ex: exports.apiKey = _{YOUR_API_HERE}_
* Open a command line terminal and route to the local repository (command: cd desktop/galactic-age)
* Run 'npm install' in the command line
* Run 'npm run start' in the command line

## Known Bugs

* No known bugs at this time

## Support and contact details

* Email: christine.braun13@gmail.com
* LinkedIn: https://www.linkedin.com/in/christine-frank/

## Application Specifications
|Behavior|Input|Output|
|:---|:----:|:----:|
|The application displays a list of doctors when the user enters a medical issue in a search bar| "cough"| List of doctors in Portland"|
|The application displays a list of doctors when the user enters a name in a search bar|"Dr.Reinhart"| List of doctors matching input name|
|The application returns the following when search response includes any doctors: first name, last name, address, phone number, website, and whether or not they are accepting new patients|"Dr.Reinhart"|<li>Dr. Elizabeth Reinhart</li>  <li>4687 SW 20th Ave Portland OR 97223</li> <li>Accepting new patients</li>|
|The application provides an error message if the search query returns an error | *Unexpected content in JSON response* | "There was an error, please try again"|
|The application provides a message to the user when no match was found for the search criteria| "BoonesFerry"| Sorry, no match was found for 'BoonesFerry'|


## Technologies Used

* JavaScript
  * jQuery
  * API calls
* Jasmine / Karma
* Webpack

### License

*This application is licensed under the MIT license*

Copyright (c) 2019 **_Christine Frank_**

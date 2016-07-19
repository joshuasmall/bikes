# bikes

A simple AngularJS app used to display a JSON feed of bikes. It uses bootsrap to provide a fluid layout across all devices with a nodejs backend to serve the page.

## To Install

Run `npm install`

If the bower modules do not install automatically run `bower install` (bower may need to be installed globally)

## To Run
Run `npm start`

Then go to [http://localhost:8000](http://localhost:8000) 

## Assumptions
* The sort is meant to be a filter. This is beacuse I feel that if you knew the class of bike you want, you want to only see the compatible bikes.
* The descriptions will always only be one paragraph.
* The user has a fast reliable internet connection.

## Frameworks Used
* CSS: bootstrap 3
* JS: AngularJS

## Notes
A fixed height for each column is needed as the filter function only returns one array and does not give use the array of arrays which were previously used to have multiple rows. As there is only one row we cannot change the display type on the divs as that makes them all be in one line.

The borders have also been removed and a box shadow is used so that there are no double borders and so that there is a full border on each column on all screen sizes.

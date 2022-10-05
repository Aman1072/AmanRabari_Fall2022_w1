// imports go at the top of the JS file
import { getData } from "./modules/dataMiner.js";
// this is an IIfe (immediately invoked function expression)
// this is great for encapsulation code/ making 

(() => {
    console.log('fired');


    //get a referance to the elemnt on page 
    let theTemplate = document.querySelector("#user-template").content,
        theTeam = document.querySelector('.team-section'),
        buttonContainer = document.querySelector('.query-controls');

    
    function changeCopy(profs) {
        //parse the top-level profs from the profs object (the prof names)
        let theProfs = Object.keys(profs);


        theProfs.forEach(prof => {
            //debugger;
            // make copy of the content tag
            let panel = theTemplate.cloneNode(true),
                containers = panel.firstElementChild.children;

            containers[0].querySelector('img').src = `images/${profs[prof].biopic}`;

            containers[1].textContent = profs[prof].name;
            containers[2].textContent = profs[prof].role;
            
            theTeam.appendChild(panel);
        })

    }

    function showJoke(data) {
        // shoe the random chunk norris joke in the UI
        //debugger;

        let theJoke = document.querySelector('.joke-text');

        theJoke.textContent = data.value;
    }

    function retrieveJoke() {
        getData(`https://api.chucknorris.io/jokes/random`, showJoke)
    }

    //let jokeButton = document.querySelector('#get-joke');

    //jokeButton.addEventListener('click', retrieveJoke);
    
    // retrieve our prof data, and then build out the content
    //getData('./data.json', changeCopy);

    function addCategoryButtons(categories) {
        // use the array Filter ,ethod to get rid of the explicit category
        // this returns back evry entry in the category array thatdoes not match "explicit' 
       let activeCats = categories.filter(cat => cat !=="explicit").slice(0, 6),
        tempContainer = new DocumentFragment(); // this ia a virtual peice of html
        //think of it like virtual div element 

        //loop through the categories array and creat button for each category
        activeCats.forEach(button => {
            let buttonEL = document.createElement('button');

            // add css class to new button
            buttonEL.className = 'joke-button';
            // add custom data attribute to new button
            buttonEL.dataset.cat = button;
            //add the text to a new button
            buttonEL.textContent = button;

            tempContainer.appendChild(buttonEL);

        })

        // put all new button in the category in html page
        buttonContainer.appendChild(tempContainer);        
    }

    function getARandomJoke(event) {
        //debugger;
        // check for attribute we want to use in our query
        // if it's does not exit dont run the api call
        // the ! is the not oprater it's means not to oparate the event if click is not on button
        if (!event.target.dataset.cat) {return;} // nothing will execute past this point
        getData(`https://api.chucknorris.io/jokes/random?category=${event.target.dataset.cat}`, showJoke);
    }

    buttonContainer.addEventListener('click', getARandomJoke);

    getData(`https://api.chucknorris.io/jokes/categories`, addCategoryButtons);
})();
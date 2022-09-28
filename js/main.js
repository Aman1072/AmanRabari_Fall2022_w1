// imports go at the top of the JS file
import { profs } from "./modules/data.js";
// this is an IIfe (immediately invoked function expression)
// this is great for encapsulation code/ making 

(() => {
    console.log('fired');

    //get a referance to the elemnt on page 
    let theTemplate = document.querySelector("#user-template").content,
        theTeam = document.querySelector('.team-section');

    
    function changeCopy() {
        //parse the top-level profs from the profs object (the prof names)
        let theProfs = Object.keys(profs);


        theProfs.forEach(prof => {
            //debugger;
            // make copy of the content tag
            let panel = theTemplate.cloneNode(true),
                containers = panel.firstElementChild.children;

            containers[0].querySelector('img').src = `images/${profs[prof].avatar}`;

            containers[1].textContent = profs[prof].name;
            containers[2].textContent = profs[prof].role;
            
            theTeam.appendChild(panel);
        })

    }
    
    changeCopy();
})();
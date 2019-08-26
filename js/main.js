/* Marjana Cowan 8/2019 Project and Portfolio IV */

/*jshint esversion: 6 */

window.addEventListener("load", function () {
    console.log("page loaded");
    var myAssignment = AssignPrototype.getInstance();
});

class AssignPrototype{
    constructor() {
        const page = document.querySelector("body");

        // Contact Form Submit Button Validation
        function validateForm(){
            let contactForm = page.querySelector('#contact form');
            let name = contactForm.querySelector('input[name=name]');
            let email = contactForm.querySelector('input[name=email]');
            let message = contactForm.querySelector('textarea[name=message]');
            let submit = contactForm.querySelector('button');
            let valid = false;
            console.log("Validity State: " + name.validity.valid);
            //allow submit
            let alertText = contactForm.querySelector('p')
            if (name.validity.valid === true){
                if (email.validity.valid === true){
                    if(message.validity.valid === true){
                        submit.classList.remove("disabled");
                        valid  = true;
                    }
                }
            }

            if(!valid){
                let newAlert = document.createElement("p");
                let text = document.createTextNode("Missing required field. Please update");
                newAlert.appendChild(text);
                contactForm.insertAdjacentElement("beforeend", newAlert);
            }
            else{
                alertText.parentNode.removeChild(alertText);
            }

            return valid;
        }

        //Submit Contact Form event handler
        function addContact(event){
            let
        }
    }

    static getInstance(){
        //Is there an instance variable attached to the class?
        //If so, don't create. If not, then it's ok to create.
        if(!AssignPrototype._instance){
            AssignPrototype._instance = new AssignPrototype();
            return AssignPrototype._instance;
        }
        else{
            throw "Error: Singleton already exists."
        }
    }

}
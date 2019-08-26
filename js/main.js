/* Marjana Cowan 8/2019 Project and Portfolio IV */

/*jshint esversion: 6 */

window.addEventListener("load", function () {
    console.log("page loaded");
    var myAssignment = AssignPrototype.getInstance();
});

class AssignPrototype{
    constructor() {
        const page = document.querySelector("body");
        const contactForm = page.querySelector('#contact form');
        const contactSubmit = contactForm.querySelector('button');
        console.log(contactSubmit);

        // Contact Form Submit Button Validation
        function validateForm(){
            let name = contactForm.querySelector('input[name=name]');
            let email = contactForm.querySelector('input[name=email]');
            let phone = contactForm.querySelector('input[name=phone]');
            let message = contactForm.querySelector('textarea[name=message]');
            let valid = false;
            console.log("Validity State: " + name.validity.valid);
            //allow submit
            let alertText = contactForm.querySelector('p');
            if (name.validity.valid === true){
                if (email.validity.valid === true){
                    if(message.validity.valid === true){
                        valid  = true;
                    }
                }
            }

            if(!valid){
                let newAlert = document.createElement("p");
                let text = document.createTextNode("Missing required field. Please update");
                newAlert.appendChild(text);
                newAlert.setAttribute("class", "alert");
                contactForm.insertAdjacentElement("beforeend", newAlert);
            }
            else{
                contactSubmit.classList.remove("disabled");
                name.value = "";
                email.value = "";
                phone.value = "";
                message.value = "";

                if(alertText){
                    alertText.parentNode.removeChild(alertText);
                }
            }

            return valid;
        }

        //Submit Contact Form event handler
        function addContact(event){
            event.preventDefault();
            let valid = validateForm();
            let message = "<div><h2>Thank you!</h2><p>We'll get back to you soon!</p></div>";

            if(valid){
                contactSubmit.setAttribute("class", "disabled");
                contactSubmit.insertAdjacentHTML("afterend", message);
            }
        }

        document.addEventListener('invalid', (function(){
            return function(e){
                //prevent the browser from showing default error bubble/ hint
                e.preventDefault();
            };
        })(), true);

        contactSubmit.addEventListener('click', addContact);

        /* --------------- Mobile Accordion -------------------------*/
        function viewContent(event){
            event.preventDefault();
            console.log(event);
            let section;

            switch(event.target.id){
                case 'head_whatis':
                    section = page.querySelector('#whatis');
                    break;
                case 'head_why':
                    section = page.querySelector('#why');
                    break;
                case 'head_services':
                    section = page.querySelector('#services');
                    break;
                case 'head_blog':
                    section = page.querySelector('#blog');
                    break;
                case 'head_contact':
                    section = page.querySelector('#contact');
                    break;
            }

            console.log(event.target.id);

            if(section){
                let content = section.querySelectorAll('.content_display');
                let short_description = section.querySelector('.mobile_discription');

                switch(content[0].style.display){
                    case 'block':
                        short_description.style.display = "block";
                        break;
                    default:
                        short_description.style.display = "none";
                        break;
                }

                for(let c of content){
                    switch(c.style.display){
                        case 'block':
                            c.style.display = "none";
                            break;
                        default:
                            c.style.display = "block";
                    }
                }


            }
        }

        const sections = page.querySelectorAll('.mobile_nav');
        for(let e of sections){
            e.addEventListener('click', viewContent);
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
            throw "Error: Singleton already exists.";
        }
    }

}
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
        const name = contactForm.querySelector('input[name=name]');
        const email = contactForm.querySelector('input[name=email]');
        const phone = contactForm.querySelector('input[name=phone]');
        const message = contactForm.querySelector('textarea[name=message]');

        function createAlert() {
            let newAlert = document.createElement("p");
            let text = document.createTextNode("Missing required field. Please update");
            newAlert.appendChild(text);
            newAlert.setAttribute("class", "alert");
            return newAlert;
        }

        // Contact Form Submit Button Validation
        function validateForm(event){
            event.preventDefault();
            let valid = false;

            let confirm = contactForm.querySelector('.confirm');
            if(confirm){
                confirm.parentNode.removeChild(confirm);
            }

            //allow submit
            let alertText = contactForm.querySelector('p');
            if (name.validity.valid === true){
                if (email.validity.valid === true){
                    if(message.validity.valid === true){
                        valid  = true;
                    }
                }
            }

            if(valid){
                contactSubmit.classList.remove("disabled");
                let alert = contactForm.querySelector('.alert');
                if(alert){
                    alert.parentNode.removeChild(alert);

                }
            }

            return valid;
        }

        //Submit Contact Form event handler
        function addContact(event){
            event.preventDefault();
            let valid = validateForm(event);
            let confirmation = "<div id='confirm'><h2>Thank you!</h2><p>We'll get back to you soon!</p></div>";

            if(valid){
                name.value = "";
                email.value = "";
                phone.value = "";
                message.value = "";
                contactSubmit.setAttribute("class", "disabled");
                contactSubmit.insertAdjacentHTML("afterend", confirmation);
            }
            else{
                alert = createAlert();
                contactForm.insertAdjacentElement("beforeend", alert);
            }
        }

        document.addEventListener('invalid', (function(){
            return function(e){
                //prevent the browser from showing default error bubble/ hint
                e.preventDefault();
            };
        })(), true);

        name.addEventListener('blur', validateForm);
        email.addEventListener('blur', validateForm);
        phone.addEventListener('blur', validateForm);
        message.addEventListener('blur', validateForm);
        contactSubmit.addEventListener('click', addContact);

        const subscriptionMobileDisplay = page.querySelector('#subscriptionMobileDisplay');

        /*--Subscription form display and submission-- */
        // function to open the modal window on mobile
        function openModal(){
            subscriptionMobileDisplay.classList.remove("not_visible");
        }

        // function to close the modal window
        function closeModal(event){
            event.preventDefault();

            console.log(event);
            if (event.target === subscriptionMobileDisplay) {
                subscriptionMobileDisplay.classList.add("not_visible");
            }
        }

        /* The mobile sized design allows click actions on the subscription icon to open the modal, where as the desktop prevents any click actions via CSS */
        const mobileSubscribeIcon = page.querySelector('footer img');
        mobileSubscribeIcon.addEventListener('click', openModal);
        subscriptionMobileDisplay.addEventListener('click', closeModal);

        const subscriptionForm = page.querySelector('footer form');
        const subscribeSubmit = subscriptionForm.querySelector('button');
        const subscriptionEmail = subscriptionForm.querySelector('.subscribeemail');

        /*-- Subcribe form --*/
        function addSubscription(event){
            event.preventDefault();
            if(subscriptionEmail.validity.valid === true){
                subscribeSubmit.classList.remove("disabled");
            }


        }

        subscribeSubmit.addEventListener('click', addSubscription);

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
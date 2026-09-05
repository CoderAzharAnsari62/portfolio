const contactForm = document.getElementById("contactForm");

const submitButton = document.getElementById("submitButton");

const formStatus = document.getElementById("formStatus");


if (contactForm && submitButton && formStatus) {

    contactForm.addEventListener(
        "submit",

        async function (event) {

            event.preventDefault();


            // Purana message hatao

            formStatus.textContent = "";

            formStatus.className = "form-status";


            // Button change

            submitButton.disabled = true;

            submitButton.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                <span>Sending...</span>
            `;


            const formData = new FormData(contactForm);


            try {

                const response = await fetch(

                    contactForm.action,

                    {
                        method: "POST",

                        body: formData,

                        headers: {
                            "Accept": "application/json"
                        }
                    }

                );


                // Agar response successful nahi hai

                if (!response.ok) {

                    throw new Error(
                        "Message was not accepted."
                    );

                }


                const result =
                    await response.json()
                    .catch(() => ({}));


                // Agar FormSubmit success false bheje

                if (
                    result &&
                    result.success === false
                ) {

                    throw new Error(
                        result.message ||
                        "Message was not delivered."
                    );

                }


                // Form reset

                contactForm.reset();


                // GREEN SUCCESS MESSAGE

                formStatus.textContent =
                    "Message successfully delivered!";


                formStatus.className =
                    "form-status success";


                // Button Delivered

                submitButton.innerHTML = `
                    <i class="fa-solid fa-check"></i>
                    <span>Delivered</span>
                `;


                // 2.2 seconds baad refresh

                setTimeout(function () {

                    window.location.href =
                        window.location.pathname +
                        "#contact";

                }, 2200);


            }

            catch (error) {

                console.error(error);


                // RED ERROR MESSAGE

                formStatus.textContent =
                    "Message not delivered. Please try again.";


                formStatus.className =
                    "form-status error";


                // Button wapas normal

                submitButton.disabled = false;


                submitButton.innerHTML = `
                    <i class="fa-solid fa-paper-plane"></i>
                    <span>Send Message</span>
                `;

            }

        }

    );

}


const
form = document.getElementById("form"),
frontNumberCard = document.getElementById("number-card"),
frontNameCard = document.getElementById("name-card"),
formCardHolder = document.getElementById("cardholder"),
formCardNumber = document.getElementById("card-number"),
formMM = document.getElementById("month"),
formYY = document.getElementById("year"),
formCVC = document.getElementById("cvc"),
cardMM = document.getElementById("mm-card"),
cardYY = document.getElementById("yy-card"),
cardCVC = document.getElementById("card-cvc"),
successMessage = document.querySelector(".success-message"),
continueButton = document.getElementById("btn-continue");

// replacing live CARHOLDER NAME on card front
formCardHolder.onkeyup = function () {
    frontNameCard.innerText = this.value;
}

// card number can have only numbers so we have to replace all other characters
formCardNumber.addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
});

// replacing live CARD NUMBER on card front
formCardNumber.onkeyup = function() {
    frontNumberCard.innerText = this.value;   
 }

//month can have only numbers
formMM.addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^\dA-Z]/g, '');
    if (e.target.value > 12) e.target.value = 12;
});

// replacing live MM on card front
formMM.onkeyup = function () {
    cardMM.innerText = this.value;
    if (formMM.value.length < 2) cardMM.innerText = "0" + this.value;
}

//year can have only numbers
formYY.addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/[^\dA-Z]/g, '');
})

// replacing live YY on card front
formYY.onkeyup = function () {
    cardYY.innerText = this.value;
}

// replacing live CVC on card back
formCVC.onkeyup = function () {
    cardCVC.innerText = this.value;
}

form.addEventListener("submit", (e) => { 
    e.preventDefault();
    checkInputs();
    validateForm()
}) 

//check inputs values
function checkInputs() {
    //get the values typed in inputs 
    const 
    formCardHolderValue = formCardHolder.value.trim(),
    formCardNumberValue = formCardNumber.value.trim(),
    formMMValue = formMM.value.trim(),
    formYYValue = formYY.value.trim(),
    formCVCValue = formCVC.value.trim();

    if(formCardHolderValue === "") {
        setErrorFor (formCardHolder, "Cardholder name can't be blank");
    } else {
        setSuccessFor (formCardHolder);
    }

    if(formCardNumberValue === "") {
        setErrorFor (formCardNumber, "Card number can't be blank");
    } 
    else if (formCardNumberValue.length < 19) {
        setErrorFor (formCardNumber, "Card number is too short");
    } else {
        setSuccessFor (formCardNumber);
    }

    if(formMMValue === "") {
        setErrorFor (formMM, "Month can't be blank");
    } else {
        setSuccessFor (formMM);
    }

    if(formYYValue === "") {
        setErrorFor (formYY, "Year can't be blank");
    } else {
        setSuccessFor (formYY);
    }

    if(formCVCValue === "") {
        setErrorFor (formCVC, "Can't be blank")
    } else if (formCVCValue.length < 3) {
        setErrorFor (formCVC, "CVC is too short")
    } else {
        setSuccessFor (formCVC);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    small.innerText = message;

    formControl.className = "form-control error";
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control";
}

//if there are no errors show success message
function validateForm() {
    if(
        !formCardHolder.parentElement.classList.contains("error") &&
        !formCardNumber.parentElement.classList.contains("error") &&
        !formMM.parentElement.classList.contains("error") &&
        !formYY.parentElement.classList.contains("error") &&
        !formCVC.parentElement.classList.contains("error")
        ) {
            form.classList.add("hide");
            successMessage.classList.replace("hide", "show")
    }
}

//continue button - reset and show the form and update front and back card to initial values
continueButton.addEventListener("click", (e) => {
    form.reset();
    form.classList.remove("hide");
    successMessage.classList.replace("show", "hide");

    //front and back card - set the initial values
    frontNameCard.innerText = "Jane Appleseed";
    frontNumberCard.innerText = "0000 0000 0000 0000";
    cardMM.innerText = "00";
    cardYY.innerText = "00";
    cardCVC.innerText = "000";
})




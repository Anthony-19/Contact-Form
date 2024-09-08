const userInputs = [document.querySelector('#first-name'), document.querySelector('#last-name')];
const userError = [document.querySelector('#first-name + .error'), document.querySelector('#last-name + .error')];
const userComments = document.querySelector('#message');
const commentError = document.querySelector('#message + .error');
const email = document.querySelector('#email');
const emailError = document.querySelector('#email + .error');
const queryType = document.querySelectorAll('.query-type input');
const querytypeError = document.querySelector('.query-type .error');
const enquiryDiv = [document.querySelector('.general-enquiry'), document.querySelector('.support-request')];
const consent = document.querySelector('#consent');
const consentLabel = document.querySelector('.consent');
const consentError = document.querySelector('.form-consent .error');


const validateConsent = () => {
    if(consent.checked) {
        consentError.innerHTML = ''
        return true;
    }
    else {
        consentError.innerHTML = `<p>To submit this form, please consent to being contacted</p>`
        return false;
    }
}

const validateCheckbox  = () => {
    consent.addEventListener('change', () => {
        consentError.innerHTML = ''
    })
}


const validateCheck = () => {
   let isChecked = false;
    queryType.forEach((query) => {
        if(query.checked) {
            querytypeError.innerHTML = '';
            isChecked = true;
            enquiryDiv.forEach((enquiry) => {
                enquiry.style ='';
            })
        }
    } );
    if(isChecked === false) {
        querytypeError.innerHTML = `<p>Please select a query type</p>`;
        enquiryDiv.forEach((enquiry) => {
            enquiry.setAttribute('style', `
                border: 1px solid red;
                `)
            })
       
        return false;

    }
    else {
        queryType.innerHTML = '';
        return true
    }
}


const validateRadio = () => {
    queryType.forEach((radio) => {
        radio.addEventListener('change', () => {
           validateCheck();
        });
    })
}

const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value === '') {
        emailError.innerHTML = `<p>Please enter your email address</p>`;
        email.setAttribute('style',
            `border: 1px solid red;`
        );
        return false;
    }
    else if (!emailRegex.test(email.value)) {
        emailError.innerHTML = `<p>Please enter a valid email address</p>`;
        email.setAttribute('style',
            `border: 1px solid red;`
        );
        return false;
    }
    else{
        emailError.innerHTML = '';
        email.setAttribute('style',
            `border: 1px solid green;`
        );
        return true;
    }
};

const validateEmailInput = () => {
    email.addEventListener('input', () => {
        validateEmail();
    });
};


const validateInputs = (user, index) => {
    if(user.value.trim() === '' || !isNaN(user.value.trim())) {
        userError[index].innerHTML = `<p> ${user.value === '' ? 'Please this field is required' : 'Please enter a valid name'} </p>`
        user.setAttribute('style',
            `border: 1px solid red` 
        )
        return false;
    }

    else{
        userError[index].innerHTML = '';
        userInputs[index].style.border = '1px solid green';
        return true;
    }
}
const validateComment = () => {
    if(userComments.value.trim() === ''){
        commentError.innerHTML = `<p>Please this field is required</p>`;
        userComments.setAttribute('style', 
            `
                border-color: red;
            `
        );
        return false
    }
    else{
        commentError.innerHTML = '';
        userComments.style.borderColor = 'green';
        return true;
    }
}

const validateUser = () => 
    userInputs.forEach((user, index) => {
    user.addEventListener('input', () => {
        validateInputs(user, index);
    });
});

const validateCommentInput = () => {
    userComments.addEventListener('input', () => {
        validateComment();
    });
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    Array.from(userInputs).forEach((userName, index) => {
        // if(validInputs(user,index) === false)
        if(!validateInputs(userName, index)){
           isValid = false;
        }
    })
    if(validateComment() === false){
        isValid = false;
    }
    if(validateEmail() === false){
        isValid = false;
    }

    if(validateCheck() === false){
        isValid = false;
    }
    if(!validateConsent()){
        isValid = false;
    }

    if(isValid) {
       
        const toast = document.querySelector('.toast');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
        form.reset();
    }
})

validateUser();
validateCommentInput();
validateEmailInput();
validateRadio();
validateCheckbox ()
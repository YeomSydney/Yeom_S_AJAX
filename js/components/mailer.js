// could wrap all of this in a class or an object and expand on the API to include all of the front-end API interactions (GET, PUT, POST for CMS etc)

// SendMail would be just one member / property in that object

// ASYNC and AWAIT are a bit of a level-up over using Fetch. This uses the Promises API in a more robust way, as well as the new(ish) async/await paradigm.

// ASYNC enforces non-blocking operations / programming flow - we're explicitly telling the JS engine to run this function asyncronously

// In other words - this lets the JS engine continue doing other things while it waits for the Promise to resolve. Then it runs the success or failure handlers.

// Because it's a "thenable", we can chain operations in the main.js file. Just return the result - success or failure.

// You shouldn't have to touch this file at all - it'll handle the mail form submission and return back success or failure

// Just update the action field in the form on the index.html page

async function SendMail(targetForm) {
    // mail stuff goes here
    let formData = new FormData(targetForm), // this is the form element in index.html (gets passed in via reference from main.js)
        formFieldErrors = false;

        // try to run the mail API and pass the form data through via POST
    let result = await fetch(`./${targetForm.getAttribute("action")}`, {
        method: targetForm.method,
        body: formData,
    }).then(response => {
        // if we're missing some form fields or anything else broke, you'll get a status message that ISN'T 200 (ok)
        if (response.status !== 200) {
            formFieldErrors = true;
        }

        return response;
    })

    let mailStatus = await result.json(); // wait for the promise to resolve

    // if there are any errors with the from submission, throw a new error and pass the payload along (these are the references to the fields that are broken)

    // this will get handled by the error handler in main.js 
    // nothing should execute past the throw
    if (formFieldErrors) {
        throw new Error(JSON.stringify(mailStatus));
    }    
    
    // send back a success message - this is handled in main.js by the success thenable
    return mailStatus;
}

export { SendMail };
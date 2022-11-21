<?php
// Required Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8"); // This is how I'll treat the file

if($_POST) {
    // if it's true, the result is 1. - Refer to Boolean
    $receipent = "This Is Where Your Email Goes...";
    $subject = "Email From My Portfolio Site"; // This is the subject I'd get.
    $visitor_name = "";
    $visitor_email = "";
    $message = "";
    $fail = array(); // I would get what is missed.

    // Cleans and stores first name in the #$visitor_name variable.
    if(isset($_POST['firstname']) && !empty('firstname')) {
        // !empty - it cannot be empty.
        $visitor_name = filter_var($_POST['firstname'], FILTER_SANITIZE_STRING);
    }else {
        array_push($fail, "firstname");
    }

    // Cleans and appends last name in the #$visitor_name variable.
    if(isset($_POST['lastname']) && !empty('lastname')) {
        $visitor_name .= " ".filter_var($_POST['lastname'], FILTER_SANITIZE_STRING);
    }else {
        array_push($fail, "lastname");
    }

    // Cleans and stores email in the #$visitor_name variable.
    if(isset($_POST['email']) && !empty($_POST['email'])) {
        $email = str_replace(arrary("\r", "\n", "%0a", "%0d"), "",
        $_POST['email']);
        $visitor_email = filter_var($email, FILTER_SANITIZE_STRING);
        //  \r = return
        //  \n = end
        //  "\r\n" = line break
    }else {
        array_push($fail, "email");
    }

    // Cleans messages and stores email in $message variable.
    if(isset($_POST['message']) && !empty($_POST['message'])) {
        $clean = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
        $message = htmlspecialchars($clean);
    }else {
        array_push($fail, "message");
    }

    $headers = "FROM: i_am_awesome@awesome.com"."\r\n"."Reply-to: again@again.com"."\r\n"."X-mailer: PHP/".phpversion();

    if(count($fail==0)) {
        mail($receipent, $subject, $message, $headers);
        $results['message'] = sprintf("Thank you for contacting us, %s. We will respond within 24hours.", $visitor_name);
        // %s will be the customer's name.
    }else {
        header("HTTP/1.1 488 YOU DID NOT fill out the form correctly.");
        // 488 - random number, indicates it's an error
        die(json_encode(['message' => $fail]));
        // After die(), nothing is showing.
    }


}else {
    // if it's false, the result is 0. - Refer to Boolean
    $results['message'] = "Stop being so lazy and fill out the form.";
}

echo json_encode($results);

?>
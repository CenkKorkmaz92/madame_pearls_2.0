<?php
// ...existing code from sendMail.php...
switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $email = $params->email;
        $name = $params->name;
        $message = $params->message;
        $recipient = 'info@madame-pearls.com';  
        $subject = "Contact From <$email>";
        $message = "From: " . $name . "<br><br>" . $message;
        $headers   = array();
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = "From: info@madame-pearls.com";
        mail($recipient, $subject, $message, implode("\r\n", $headers));
        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}

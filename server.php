<?php
//for JSON
$_POST = json_decode(file_get_contents("php://input", true));

//for ALL
echo var_dump($_POST);
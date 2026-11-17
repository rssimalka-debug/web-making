<?php
$name = "";
$message ="";

if($_SERVER["REQUEST_METHOD"]=="POST") {
  $name = trim($_POST["name"]?? "");

if ($name == ""){
    $message ="please enter your name.";

  
} else{
  
  $safeName = htmlspecialchars(
    $name,
    ENT_QUOTES,
    "UTF-8"
    
  );

  $message ="Welcome," . $safeName ."!";

 }

  
}


?>

<!DOCTYPE html>

<html lang="en">

    <head>

        <meta charset="UTF-8">

        <title>Student registration </title>

        <style>

           body {
               font-family: Arial,sans-serif;
               background:#eef2ff;
               padding: 50px;

           }

           .container {
             
             max-width:400px;
             margin: Auto;
             background:white;
             padding:30px;
             border-radius:12px;
             box-shadow:0 5px 20px #ccc;


           }

            button {
                background:#2563eb;
                color:white;
                border:none;
                cursor:pointer;

           }

        </style>


    </head>

    <body>

        <div class="container">

            <h2>Student Registration</h2>

            <form method="POST">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required

                > 

                <button type = "submit">Registetr</button>

            </form>        
           
            <h3><?php  echo $message;?></h3>

        </div>    

    </body>

</html>




<?php
$name = "Imalka";
$marks = 85;

if ($marks >= 75) {
    $grade = "A";

} elseif ($mark >= 65) {
    $grade = "B";

} elseif ($marks >=50) {
    $grade = "C";

} else {
    $grade = "F";

}
$status = $marks >= 50 ? "pass" : "Fail";

echo "Name:  $name <br>";
echo "Marks: $marks <br>";
echo "Grade: $grade <br>";
echo "Status: $status";

?>




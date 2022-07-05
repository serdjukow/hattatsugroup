<?php

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$file = file_get_contents('db/portfolio.json');
$taskList = json_decode($file,true);

$newData = $taskList

file_put_contents('db/portfolio.json',json_encode($newData));
echo $newData;

unset($taskList);
unset($newData);

?>

<?php
header("Content-Type: application/json");
$data = file_get_contents("php://input");

$filename = 'db/data.json';

if (file_exists($filename )) {
    $file = file_get_contents('db/data.json');
} else {
    $file = fopen("db/data.json", "a+");
}

$taskList=json_decode($filename,TRUE);              // Декодировать в массив 

    foreach ( $taskList  as $key => $value){    // Найти в массиве  

       if (in_array( $oldname, $value)) {    // Совпадение значения переменной

          $taskList[$key]  = array('like'=>$newname);  // Присвоить новое значение
      }
   } 



// записываем в него то, что пришло от страницы
file_put_contents('db/portfolio.json',json_encode($taskList));
// тут же заново считываем все данные, чтобы убедиться, что всё записалось правильно
$file = file_get_contents('db/data.json');
// и сразу отправляем их на страницу, чтобы это увидел пользователь
echo $data;
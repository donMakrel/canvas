<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $input = file_get_contents('php://input');
  $file = fopen(__DIR__ . '\\drawing\\drawing.json', 'w');
  
  if (flock($file, LOCK_EX)) {
    fwrite($file, $input);
    flock($file, LOCK_UN);
  }

  fclose($file);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo file_get_contents(__DIR__ . '\\drawing\\drawing.json');
}
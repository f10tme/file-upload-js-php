<?php
date_default_timezone_set("Europe/Istanbul");
// FILE PATH
$filePath = "gallery";

// UPLOAD FILES
if ($_GET["type"] == "uploadImg") {


  // CONTROL | POST
  if ($_FILES["file"]) {
    $file = $_FILES["file"];

    // FILE INFO | TYPE / EXTENSION
    $fileInfo = explode(".", $file["name"]);
    $fileType = explode("/", $file["type"]);
    $fileType = $fileType[0];
    $fileExtension = end($fileInfo);
    (!empty($fileExtension) AND isset($fileExtension)) ? $fileExtension: $fileExtension = "";

    // CONTROL | FILE DIR
    (!is_dir($filePath)) ? mkdir($filePath):null;


    // FILE DATE
    $fileDate = date("Y-m-d H:i:s");


    // FILE VALID EXTENSION
    $fileExtensionArray = [
      "mp4",
      "png",
      "jpeg",
      "jpg",
      "gif"
    ];


    // OUTPUT
    $output = [
      "statusCode" => "0000"
    ];

    // CONTROL | FILE TYPE AND FILE EXTENSION
    if (in_array($fileExtension, $fileExtensionArray)) {

      // FILE NAME
      $fileName = hash("fnv164", md5($fileDate.rand(1111111, 9999999))).".".$fileExtension;

      // CONTROL | FILE EXISTS
      if (!file_exists($filePath."/".$fileName)) {

        // CONTROL | FILE UPLOAD
        if (move_uploaded_file($file["tmp_name"], $filePath."/".$fileName)) {
          
          // FILE INFORMATIN
          $output = [
            "name" => $fileName,
            "firstName" => $file["name"],
            "tmpName" => $file["tmp_name"],
            "path" => addslashes(__DIR__."/" .$filePath."/".$fileName),
            "minPath" => addslashes($filePath."/".$fileName),
            "type" => $fileType,
            "extension" => $fileExtension,
            "size" => $file["size"],
            "date" => $fileDate,
            "statusCode" => "1111"
          ];

        } else {
          $output["statusCode"] = "1110";
        }
      } else {
        $output["statusCode"] = "1100";
      }
    } else {
      $output["statusCode"] = "1000";
    }
  } else {
    $output["statusCode"] = "0000";
  }
  echo json_encode($output);
  exit();
}
// REMOVES FILES
else if ($_GET["type"] == "deleteImg") {

  $deleteFileList = json_decode($_POST["deleteFile"], true);
  foreach ($deleteFileList as $delete) {
    unlink($filePath."/".$delete);
  }


  exit();
}



?>
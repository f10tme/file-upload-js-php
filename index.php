<!DOCTYPE html>
<html lang="tr">
<head>
  <!--Meta Verileri-->
  <meta charset="UTF-8">
  <meta http-equiv="content-language" content="tr">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
  <!--Meta Verileri-->
  <link rel="stylesheet" href="style.css" type="text/css" media="all" />
  <title>Shop Media Upload</title>
</head>
<body>


  <div class="toastContainer"></div>


  <div class="deleteDialog">
    
    <div class="box">
      
      <div class="header">
        <span class="text"></span>
        <i class="fa-solid fa-x cancel"></i>
      </div>

      <div class="content">
        This can't be undone.
      </div>

      <div class="buttons">
        <button class="cancel">Cancel</button>
        <button class="delete">Delete</button>
      </div>
      
    </div>
  </div>



  <div class="mediaContainer">

    <div class="mediaHead">
      <span class="fileSelected">
        <div>
          <i class="tire"></i>
          <p class="length"></p>
          &nbsp;File Selected
        </div>
        <button class="deleteFiles">Delete Files</button>
      </span>
      <b class="head">Media</b>
    </div>


    <div class="mediaContent">
      <ul class="listContent">
      </ul>
    </div>

  </div>


  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.0/Sortable.min.js" integrity="sha512-Eezs+g9Lq4TCCq0wae01s9PuNWzHYoCMkE97e2qdkYthpI0pzC3UGB03lgEHn2XM85hDOUF6qgqqszs+iXU4UA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script type="text/javascript" src="main.js"></script>


</body>
</html>
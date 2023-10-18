//* HTML VARIABLES
var uploadBar = `
<div class="uploadBar">
<span class="bar"></span>
<p class="text">Uploading...</p>
</div>
`;

var fileUploadHtml = (type = false) => {
  var rand = "file\_"+Math.floor(Math.random() * 999999);
  if (type == true) {
    return `
    <input
    type="file"
    id="${rand}"
    />

    <label for="${rand}">
    <div class="row">
    <div class="btn">
    Add file
    </div>
    <a class="addUrl" href="#">Add From URL</a>
    </div>
    <div class="row">
    <p class="text">
    Accepts Images, videos, Or 3D Models
    </p>
    </div>
    </label>
    `;
  } else {
    return `
    <input
    type="file"
    id="${rand}"
    />

    <label for="${rand}">
    <div class="column">
    <div class="btn">
    Add file
    </div>
    <a class="addUrl" href="#">Add From URL</a>
    </div>
    </label>
    `;
  }
}


var imgHtml = (event) => `
<div class="imgBox">
<img class="image" src="${event}"/>
</div>
`;

var videoHtml = (event) => `
<div class="videoBox">
<video class="video" autoplay mute>
<source src="${event}" type="video/mp4"/>
</video>
</div>
`;


var liActiveHtml = () => {
  var rand = "checkbox\_"+Math.floor(Math.random() * 999999);
  return `
  <label class="liActiveBox" for="${rand}">
  <input idName="${rand}" type="checkbox"/>
  <img class="screen" src="icon/screen.png">
  <img class="dragIcon" src="icon/drag.png">
  </label>
  `;
}
//*/



// PAGE LOAD
window.onload = () => {


  var list = document.querySelector(".mediaContainer .listContent");



  var listChild_1 = document.createElement("li");
  listChild_1.innerHTML = fileUploadHtml(true);
  listChild_1.classList.add("firstLi");
  list.appendChild(listChild_1);



  //* LIST CHILDS CONTROL
  function listChildsControl(listChilds) {
    listChilds.forEach((listChild) => {



      listChild.addEventListener("change", () => {


        // AJAX FILE DATA
        var DATAPOST = new FormData();
        DATAPOST.append('file', listChild.querySelector(".mediaContainer .listContent input[type=file]").files[0]);

        listChild.innerHTML = uploadBar;

        $.ajax({
          url: "upload.php?type=uploadImg",
          type: "POST",
          data: DATAPOST,
          contentType: false,
          processData: false,
          cache: false,
          success: function (event) {
            event = JSON.parse(event);
            console.log(event);

            if (event.statusCode == "1111") {
              listChild.classList.add("liActive");
              listChild.classList.remove("firstLi");
              if (event.type == "image") {
                listChild.innerHTML = liActiveHtml()+imgHtml(event.minPath);
              } else {
                listChild.innerHTML = liActiveHtml()+videoHtml(event.minPath);
              }



              var newLi = document.createElement("li");
              newLi.innerHTML = fileUploadHtml();
              newLi.setAttribute("url", event.name);
              list.appendChild(newLi);

              var listChilds = document.querySelectorAll(".mediaContainer .listContent li");

              listChildsControl(document.querySelectorAll(".mediaContainer .listContent li"));


              checkboxes();



              listChild.setAttribute("fileName", event.name);


              toasts();
              toastControl();




            }

            //else if(event.statusCode == "1110"){}
            //else if(event.statusCode == "1100"){}
            //else if(event.statusCode == "1000"){}
            //else if(event.statusCode == "0000"){}//
            else {
              var liLength = document.querySelectorAll(".mediaContainer li").length;
              if (liLength > 1) {
                listChild.innerHTML = fileUploadHtml();
              } else {
                listChild.innerHTML = fileUploadHtml(true);
              }
            }
          },
          error: function(e1, e2) {
            if (true) {
              alert("ERROR CODE CONSOLE");
              console.log("ERROR AJAX CODE: "+e1);
            }
          }
        });


      });

    });
  }
  //*/



  listChildsControl(document.querySelectorAll(".mediaContainer .listContent li:not(.liActive)"));


  //* CHECKBOXES CONTROL
  function checkboxes(checkboxesList = document.querySelectorAll(".mediaContainer .listContent li input[type=checkbox]")) {



    checkboxesList.forEach((checkbox) => {

      checkbox.addEventListener("change", () => {
        var checkLength = document.querySelectorAll("input:checked").length;
        if (checkLength == 1) {
          document.querySelector(".deleteFiles").innerHTML = "Delete File";
        } else if (checkLength > 1) {
          document.querySelector(".deleteFiles").innerHTML = "Delete Files";
        }

        var fileName = checkbox.parentElement.parentElement.attributes.fileName.value;




        if (checkLength > 0) {
          document.querySelector(".mediaHead .length").innerHTML = checkLength;
          document.querySelector(".mediaHead .fileSelected").style.display = "flex";
          document.querySelector(".mediaHead .head").style.display = "none";



          document.querySelector(".mediaContainer .listContent").className = "listContentSelect listContent";



          checkboxesList.forEach((event) => {
            var idName = event.attributes.idName.value;
            event.setAttribute("id", idName);
          });

        } else {
          document.querySelector(".mediaHead .fileSelected").style.display = "none";
          document.querySelector(".mediaHead .head").style.display = "block";


          document.querySelector(".mediaContainer .listContent").className = "listContent";



          checkboxesList.forEach((event) => {
            event.setAttribute("id", "");
          });
        }

      });

    });

  }

  //*/


  //* DELETE FILES OPEN DIALOG
  document.querySelector(".deleteFiles").addEventListener("click", () => {
    document.querySelector(".deleteDialog").classList.add("deleteDialogActive");

    var checkLen = document.querySelectorAll(".mediaContainer .listContent input:checked").length;
    document.querySelector(".deleteDialog .header .text").innerHTML = `Delete ${checkLen} of ${checkLen} files`;

  });
  
  
  // DIALOG CANCEL BUTTON
  document.querySelectorAll(".deleteDialog .cancel").forEach((event) => {
    event.addEventListener("click",
      () => {
        document.querySelector(".deleteDialog").classList.remove("deleteDialogActive");
      });
  });




  // DIALOG DELETE BUTTON
  document.querySelector(".deleteDialog .delete").addEventListener("click", () => {
    document.querySelector(".deleteDialog").classList.remove("deleteDialogActive");




    var deleteFilesList = document.querySelectorAll(".mediaContainer .listContent li input[type=checkbox]:checked");

    var fileDeleteNameList = [];
    deleteFilesList.forEach((deleteFile) => {
      deleteFile.parentElement.parentElement.remove();

      var fileDeleteName = deleteFile.parentElement.parentElement.attributes.fileName.value;


      fileDeleteNameList.push(fileDeleteName);
      console.log(fileDeleteNameList);

    });
    var deleteFileJsonList = JSON.stringify(fileDeleteNameList);

    listChildsControl(document.querySelectorAll(".mediaContainer .listContent li"));






    var checkLength = document.querySelectorAll(".mediaContainer .listContent input:checked").length;

    if (checkLength > 0) {
      document.querySelector(".mediaHead .length").innerHTML = checkLength;
      document.querySelector(".mediaHead .fileSelected").style.display = "flex";
      document.querySelector(".mediaHead .head").style.display = "none";

      document.querySelector(".mediaContainer .listContent").className = "listContentSelect listContent";

    } else {
      document.querySelector(".mediaHead .fileSelected").style.display = "none";
      document.querySelector(".mediaHead .head").style.display = "block";
      document.querySelector(".mediaContainer .listContent").className = "listContent";

      var liActiveLength = document.querySelectorAll(".mediaContainer .listContent .liActive").length;

      if (liActiveLength <= 0) {
        document.querySelector("li:first-child").classList.add("firstLi");
        document.querySelector("li:first-child").innerHTML = fileUploadHtml(true);
      }



      // SİLİNECEK DOSYALARI POST ETME
      $.ajax({
        type: "POST",
        url: "upload.php?type=deleteImg",
        data: {
          "deleteFile": deleteFileJsonList
        }
      });
    }


    document.querySelectorAll(".mediaContainer .listContent li input[type=checkbox]").forEach((event) => {
      event.setAttribute("id", "");
    });
    
    console.log(imageComplier());
  });
  //*/

  //* TOAST
  function toasts() {
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
    <span class="text">Media Added</span>
    <i class="fa-solid fa-x closeBtn"></i>
    `;
    toast.querySelector(".closeBtn").addEventListener("click",
      () => {
        toast.classList.remove("toastActive");
      });
    document.querySelector(".toastContainer").appendChild(toast);
    setTimeout(() => {
      toast.className = "toast toastActive";
    },
      300);
    setTimeout(() => {
      toast.className = "toast";
      toastControl();
    },
      2000);


    console.log(imageComplier());
  }


  function toastControl() {
    var bottom = 100;
    var toastActiveLength = document.querySelectorAll(".toastActive").length;

    for (toastX = 1; toastX <= toastActiveLength; ++toastX) {

      document.querySelectorAll(".toastActive")[toastX].style.transform = `translateY(${toastX*bottom}px)`;
    }
  }
  //*/



  //* TÜM RESİM DOYALARININ İSİMLERİNİ ARRAYA KAYDEDER
  // ARRAYIN 0. KUVVETİ MANŞET RESMİ İFADE EDER SIRALI OLARAK ARRAYDADIR
  function imageComplier() {
    var fileOutput = [];
    document.querySelectorAll(".mediaContainer .listContent .liActive").forEach((event) => {
      fileOutput.push(event.attributes.filename.value);
    });

    return fileOutput;
  }
  //*/




  //* SORTABLE
  sortable = document.querySelector(".mediaContainer .listContent");
  new Sortable(sortable, {
    group: 'shared',
    animation: 150,
    draggable: ".liActive",
    disabled: false,
    onUpdate: function() {
      console.log(imageComplier());
    }
  });
  //*/
}
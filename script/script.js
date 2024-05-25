var submit_bt = document.querySelector(".submit");
var add_submit = document.querySelector(".my_submit");
var nameinput = document.getElementById("namePattern");
var urlInput = document.getElementById('urlPattern');
var container = JSON.parse(localStorage.getItem('container')) || [];
var al = document.querySelector('.alert')

var valid  =false ;
function validateInputs(elment) {


     var Pattern = {
          urlPattern : /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/ ,
          namePattern :  /^[A-Z][a-z]{3,8}$/
     }

     if(!Pattern[elment.id].test(elment.value)){
          al.classList.replace('d-none','d-block');
          elment.classList.remove("is-valid")
          elment.classList.add("is-invalid")
          console.log("worng answer")
           valid = false;
     }else{
          al.classList.replace('d-block','d-none');
          elment.classList.remove("is-invalid")
          elment.classList.add("is-valid")
          console.log( " correct answer")
          valid = true
     }


return valid
}


if(localStorage.length){
     display()
}

function display() {
     add_submit.innerHTML = '';
     for (var i = 0; i < container.length; i++) {
          add_submit.innerHTML += `
                <div class="row my-4 bg-light">
                    <div class="text row w-100">
                        <div class="index col-md-3 col-6">
                            <p>Index</p>
                            <div class="col-md-3 col-6">${i + 1}</div>
                        </div>
                        <div class="Website_Name col-md-3 col-6">
                            <p>Website Name</p>
                            <div class="col-md-3 col-6">${container[i].Website_Name}</div>
                        </div>
                        <div class="Visit col-md-3 col-6">
                            <p>Visit</p>
                            <button type="button" class="btn btn-success visit-btn" data-url="${container[i].url}">
                                <i class="fa-solid fa-eye"></i>
                                Visit
                            </button>
                        </div>
                        <div class="Delete col-md-3 col-6">
                            <p>Delete</p>
                            <button type="button" class="btn btn-danger delete-btn" data-index="${i}">
                                <i class="fa-solid fa-trash"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                `;
     }


     var deleteButtons = document.querySelectorAll('.delete-btn');
     deleteButtons.forEach(button => {
          button.addEventListener('click', function() {
               var index = this.getAttribute('data-index');
               container.splice(index, 1);
               localStorage.setItem('container' , JSON.stringify(container))
               display();
          });
     });


     var visitButtons = document.querySelectorAll('.visit-btn');
     visitButtons.forEach(button => {
          button.addEventListener('click', function() {
               var url = this.getAttribute('data-url');
               window.open(url, '_blank');
          });
     });


}




submit_bt.addEventListener("click", function() {

if(valid){

          var my_pruduct = {
               url: urlInput.value,
               Website_Name: nameinput.value
          };
          container.push(my_pruduct);
          localStorage.setItem('container' , JSON.stringify(container))
          display();
          nameinput.value = '';
          urlInput.value = '';
console.log(container)
     valid =false
}else{

     var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
     modal.show();
}



});




const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
     myInput.focus()
})
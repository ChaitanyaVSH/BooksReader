//JQuery way of doing is below, as this tutorial follows the JS, ignoring the JQuery for now.
/*$('#submit-book').click(()=>{
    var book = $('#bookname').val();

    //https://stackoverflow.com/questions/1172206/how-to-check-if-a-text-is-all-white-space-characters-in-client-side/1173854#:~:text=To%20find%20whitespace%20generated%20by,)%7B%20%2F%2Ffunction...%20%7D
    if($.trim( book ) === '' || book === null)
    {
        alert('Please enter a book name')
    }
    else{
        
    }

 });*/

//#############################################################
/**
 * Adding a book based on the add-book submit event of the form.
 */
var list = document.querySelector('#book-list ul');


 //Choose the add book form
 const addForm = document.forms['add-book']
 
 addForm.addEventListener('submit',(e)=>{
    e.preventDefault();
     
    const bookName = document.getElementById('bookname').value;
    if($.trim( bookName ) === '' || bookName === null)
    {
        alert('Please enter a book name');
        document.getElementById('bookname').value = '';
    }
    else{
        /**
         * Creating a list element to store the new book.
         */
        const li  = document.createElement('li');
        const bookElement = document.createElement('span');
        const deleteElement = document.createElement('span');

        /**
         * Setting the text content of the elements created.
         */
        bookElement.textContent = bookName;
        deleteElement.textContent = 'delete';

        /**
         * Setting the class type to match the CSS of the list elements.
         */
        bookElement.className = 'name';
        deleteElement.className = 'delete';
        /*
        bookElement.classList.add('name'); also works
        */

        /**
         * Appending the bookname and delete buttons to the list(li is the parent element to these span elements).
         */
        li.appendChild(bookElement);
        li.appendChild(deleteElement);

        /**
         * Appending the li to the ul(parent element)
         */
        list.appendChild(li);

        document.getElementById('bookname').value = '';

    }
 })

 //#######################################
 /**
  * Delete the book based on the class name for the delete button and the target element.
  */
 list.addEventListener('click',(e)=>{

    if(e.target.className === 'delete'){
        const li = e.target.parentElement;
        li.parentNode.removeChild(li);
    }

 })


 //#######################################
 /**
  * Hiding all the books based on the change event for the check-box.
  */
 const hide = document.querySelector('#hide');
 hide.addEventListener('change',(e)=>{
     
    if(hide.checked){
        list.style.display = "none";
    }
    else{
        list.style.display = "initial";
    }

 });
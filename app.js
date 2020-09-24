// list for the ul that displays all the books
var list = document.querySelector('#book-list ul');
var finishedList = document.querySelector('#wrapper #finished-books')

//Array to hold all the books in the localStorage, saved while adding and deleting the book
var books = [];
var finishedBooks = [];

/**
 * 
 * @param {name} name of the book that is being rendered/displayed in the DOM.
 * This method takes book name as the arguement.
 * 
 * 1. Creates all the DOM elements needed for LI
 * 2. Sets the textContent and ClassNames of the new DOM elements
 * 3. Append the new DOM elements to the new LI created
 * 4. Append the LI DOM element to the UL of the DOM
 */
function renderBook(name){
        const li  = document.createElement('li');
        const bookElement = document.createElement('span');
        const deleteElement = document.createElement('span');
        const finishElement = document.createElement('span');

        /**
         * Setting the text content of the elements created.
         */
        bookElement.textContent = name;
        deleteElement.textContent = 'delete';
        finishElement.textContent = 'finish';

        /**
         * Setting the class type to match the CSS of the list elements.
         */
        bookElement.className = 'name';
        deleteElement.className = 'delete';
        finishElement.className = 'finish';
        /*
        bookElement.classList.add('name'); also works
        */

        /**
         * Appending the bookname and delete buttons to the list(li is the parent element to these span elements).
         */
        li.appendChild(bookElement);
        li.appendChild(deleteElement);
        li.appendChild(finishElement);

        /**
         * Appending the li to the ul(parent element)
         */
        list.appendChild(li);
}

/**
 * This method is invoked whenever the browser is loaded everytime.
 * 
 * 1. Assigns the value to the books array from the localStorage
 * 2. If no books are stored in the localStorage, the browser does not render anything
 * 3. If any book is present in the localStorage, renderBook(book) is invoked for each book
 */
function loadBooks(){

    books = JSON.parse(localStorage.getItem('totalBooks'));
    if(!books){
        //alert('No books are present for now! Please add some')
    }
    else{
        books.forEach((book)=>{
        renderBook(book)
        })
    }

    finishedBooks = JSON.parse(localStorage.getItem('finishedBooks'));
    if(!finishedBooks){
        //alert('No books are present for now! Please add some')
    }
    else{
        finishedBooks.forEach((book)=>{
        renderFinishedBooks(book)
        })
    }
}
loadBooks()




/**
 * Adding a new book to the books array whenever the user gives the book name and clicks on submit button.
 * 
 * 1. addForm picks up the form from the DOM and listend for the submit event on the DOM
 * 2. Pick the book name from the input field
 * 3. Check for the regex of the book name
 * 4. Invoke the renderBook(bookName)
 * 5. Push the bookName to the books array and store it in the localStorage
 * 6. Clear the user input in the form
 */
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
        renderBook(bookName);

        books = books || [];
        books.push(bookName);
        localStorage.setItem('totalBooks',JSON.stringify(books));
        document.getElementById('bookname').value = '';

    }
 })

/**
 * Adding a delete event listener for the books list.
 * 
 * 1. When the user clicks on the delete button/DOM element, bubble the event to the parent element
 * 2. Pick the parent element of the span that is used for the delete button
 * 3. Delete's parent is the li
 * 4. Remove the li from the ul
 */
 list.addEventListener('click',(e)=>{

    if(e.target.className === 'delete'){
        var index = $(e.target.parentElement).index();
        books = books || [];
        if(books)
        books.splice(index, 1);
        localStorage.setItem('totalBooks',JSON.stringify(books));
        const li = e.target.parentElement;
        li.parentNode.removeChild(li);
    }

    if(e.target.className === 'finish'){
        var index = $(e.target.parentElement).index();
        books = books || [];
        if(books)
        books.splice(index, 1);
        localStorage.setItem('totalBooks',JSON.stringify(books));

        finishedBooks = finishedBooks || [];
        finishedBooks.push(e.target.previousElementSibling.previousElementSibling.textContent);
        localStorage.setItem('finishedBooks',JSON.stringify(finishedBooks));
        renderFinishedBooks(e.target.previousElementSibling.previousElementSibling.textContent);
        const li = e.target.parentElement;
        li.parentNode.removeChild(li);

    }
 })

 function renderFinishedBooks(finishedBookName){
    const li  = document.createElement('li');
    const bookElement = document.createElement('span');

    /**
     * Setting the text content of the elements created.
     */
    bookElement.textContent = finishedBookName;

    /**
     * Setting the class type to match the CSS of the list elements.
     */
    bookElement.className = 'name';
    /*
    bookElement.classList.add('name'); also works
    */

    /**
     * Appending the bookname and delete buttons to the list(li is the parent element to these span elements).
     */
    li.appendChild(bookElement);

    /**
     * Appending the li to the ul(parent element)
     */
    finishedList.appendChild(li);

 }


/**
 * Adding an event listener to the check box for hiding the books list.
 * 
 * 1. Listen for change event on the check-box
 * 2. If the check box is clicked, change the display property
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
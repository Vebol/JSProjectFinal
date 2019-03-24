//function to find information of entered book name after clicking submit button
function findBook(){
     
   let input = document.getElementById('searchBarInput').value;
   let url = "https://www.googleapis.com/books/v1/volumes?q=" + input;
      //Begin accessing JSON data here with AJAX
   let xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
              books = JSON.parse(this.responseText);
              makeBook();
              displayResults();
            }
     };
    xhttp.open("GET", url, true);
    xhttp.send();
}


function makeBook(){
 //defining the array
  myBooks = [];
     //creates new book object for each item
    books.items.forEach(function(item) {
      let temp = new Book(item.volumeInfo.authors,
                          item.volumeInfo.title,
                          item.volumeInfo.description,
                          item.volumeInfo,
                          item.saleInfo);
      myBooks.push(temp);

              });
}


//constructor for the book
function Book (authors, title, description, thumbnail, price){
  input = document.getElementById('searchBarInput').value;
  //returning data of each keys
  this.authors = authors;
  this.title = title;
  this.description = () => {
      if(description !== undefined){
        //Also returning searched word but highlighted in description
        return description
          .split(input)
          .join("<strong>"+input.toUpperCase()+"</strong>");   
        } return "Description unavailable"

     }; 

  this.thumbnail = () => {     
      if(thumbnail.imageLinks !== undefined){
         // return image thumbnail of book
        return "<img src=" + thumbnail.imageLinks.smallThumbnail + ">";
       } //return default image thumbnail if smallThumbnail = undefined
        return "<img src=" + "http://p16cdn4static.sharpschool.com/UserFiles/Servers/Server_243551/Image/image%20not%20available.png" + ">";
     };
       
  this.price = () => {
    if (price.listPrice !== undefined && price.listPrice.amount !== undefined){
        //return value of price
        return price.listPrice.amount ;
          }// returning value if undefined 
          return "Not Available"       
      };
  
}

//Showing the results in html function
function displayResults(){
   let result = '';
   //Looping results in html
    myBooks.forEach((book) => {
       if (book.title !== undefined){
             result +=
               '<h1>' + "Title of Book: " + book.title + '</h1>' +
               "Authors: "+ (book.authors) + "</br>" +
               "Price: "+ (book.price()) + "</br>" +
               "Description: "+ (book.description()) +
                book.thumbnail();
            }
        });
     document.getElementById("o1").innerHTML = result;
}




function findBook(){

   let input = document.getElementById('searchBarInput').value;
   let url = "https://www.googleapis.com/books/v1/volumes?q=" + input;


   let xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

       books = JSON.parse(this.responseText);

            myBooks = [];
                books.items.forEach(function(item) {

                  let temp = new Book(item.volumeInfo.title,
                                      item.volumeInfo.description,
                                      item.volumeInfo,
                                      item.saleInfo,
                                      item.volumeInfo.authors);

               myBooks.push(temp);

});
      displayResults();
     

      console.log(JSON.parse(this.responseText));

    }
  };

  xhttp.open("GET", url, true);
  xhttp.send();

}


function Book (title, description, thumbnail, price, authors){
  input = document.getElementById('searchBarInput').value;

  this.title = title;
  this.description = function (){
      
      if(description !== undefined){
    return description
            .split(input)
              .join("<strong>"+input.toUpperCase()+"</strong>");
            }else {
              return "Description unavailable"
            }
            }; 

  this.thumbnail = function(){
      
      if(thumbnail.imageLinks !== undefined){
        return "<img src=" + thumbnail.imageLinks.smallThumbnail + ">";
      } else {
        return "<img src=" + "http://p16cdn4static.sharpschool.com/UserFiles/Servers/Server_243551/Image/image%20not%20available.png" + ">";
      }

  };


  this.price = function (){
    if (price.listPrice !== undefined && price.listPrice.amount !== undefined){
            return price.listPrice.amount ;
          } else{
            return "Not Available"
          }
  };
  


  this.authors = authors;

}


let myBooks = [];




function displayResults(){
    let result = '';
      myBooks.forEach((book) => {

        if (book.title !== undefined){
             result +=
               '<li>' + "Title of Book: " + book.title + '</li>' +
                  "Authors: "+ (book.authors) + "</br>" +
                    "Price: "+ (book.price()) + "</br>" +
                    "Description: "+ (book.description()) +
                     book.thumbnail();

                 }});
                       document.getElementById("o1").innerHTML = result;

        }







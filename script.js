
function findBook(){

   input = document.getElementById('searchBarInput').value;
   url = "https://www.googleapis.com/books/v1/volumes?q=" + input;


   let xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

       books = JSON.parse(this.responseText);

            myBooks = [];
                books.items.forEach(function(item) {

                  let temp = new Book(item.volumeInfo.title,
                                      item.volumeInfo.description,
                                      item.volumeInfo.imageLinks.smallThumbnail,
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
  this.title = title;
  this.description = description;
  this.thumbnail = thumbnail;
  this.price = price;
  this.authors = authors;

}


let myBooks = [];


function displayResults(){
    let result = '';
myBooks.forEach((book) => {

        if (book.title !== undefined){

     result +=

     '<li>' + "Title of Book: " + book.title + '</li>' +
     "Authors: "+ (book.authors) +
     "Description: "+ (book.description) +
     "<img src=" + (book.thumbnail) + ">";

  }});
    document.getElementById("o1").innerHTML = result;

  }






function highLight(){

  randomText = "dog boy is Doggy Dog king dogs doggo dog dog dog x 3"

  let high =  randomText.replace(/dog/gi, 'cat');
   

  
  document.getElementById("o2").innerHTML = high;

}








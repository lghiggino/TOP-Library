    console.log("Leonardo, você consegue. Focus.")
    
    //base library
    let library = [
        {title: "the hobbit",
        author: "JRR Tolkien",
        length: 293,
        status: true,
        genre: "medieval fantasy",
        quote: "once upon a time there was a hobbit",
        },
        {title: 1984,
        author: "George Orwell",
        length: 303,
        status: true,
        genre: "dystopic fantasy",
        quote: "the big brother is watching you",
        }, 
        {title: "Brave New World",
        author: "Aldous Huxley",
        length: 298,
        status: true,
        genre: "dystopic fantasy",
        quote: "If one's different, one's bound to be lonely.",
        },
        {title: "Little mermaid",
        author: "Walter Disney",
        length: 130,
        status: true,
        genre: "children book",
        quote: "Somewhere into the sea",
        },
        {title: "silmarillion",
        author: "Christopher Tolkien",
        length: 302,
        status: false,
        genre: "fantasy",
        quote: "Beren and Luthien",
        },           
         ]

    //BOOK CLASS
    class Book{
      constructor(title, author, length, status = false, genre, quote){
      this.title = title;
      this.author = author;
      this.length = length;
      this.status = status;
      this.genre = genre;
      this.quote = quote;
      }
    }

  Book.prototype.toggleRead = function() {
    this.status = !this.status;
  };  

    //add new book panel popup
    let addABook = document.querySelector("#addABook");
    addABook.addEventListener("click", panelPopUp);
    function panelPopUp(){
      document.querySelector("#bookForm").classList.toggle("hidden");
    };

    document.querySelector("#submitBook").addEventListener("click", submitBook);
    function submitBook(e){
      e.preventDefault();

      let title = document.querySelector("#bookTitle").value;
      let author = document.querySelector("#bookAuthor").value;
      let length = document.querySelector("#bookLength").value;
      let status = JSON.parse(document.querySelector('input[name="bookStatus"]:checked').value);
      let genre = document.querySelector("#bookGenre").value;
      let quote = document.querySelector("#bookQuote").value;

      temporaryBookObject = new Book(title, author, length, status, genre, quote); 
      library.push(temporaryBookObject);

      //clear the submit panel
      document.querySelector("#bookForm").classList.toggle("hidden");

      //starts rendering the book grid
      renderCycle()
    }

    function render(){
        const shelf = document.querySelector(".latestBook");
        shelf.innerHTML = "";

        for (let i = 0; i < library.length; i++) {
            const card = buildCard(library[i], i);
            shelf.appendChild(card);
        }
    }

    function buildCard(book, index) {
        // group card
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("data-index", `${index}`);
      
        // group just the text into a container
        const textContainer = document.createElement("div");
        textContainer.setAttribute("class", "text-container");
        card.appendChild(textContainer);
      
        const title = document.createElement("h3");
        title.innerHTML = book.title ? book.title : "";
        title.classList.add("mainBookTitle");
        textContainer.appendChild(title);
      
        const author = document.createElement("span");
        author.innerHTML = book.author ? book.author : "";
        author.classList.add("mainBookAuthor");
        textContainer.appendChild(author);
      
        const length = document.createElement("span");
        length.innerHTML = book.length ? `${book.length} pages` : "";
        length.classList.add("mainBookPages");
        textContainer.appendChild(length);
      
        // group buttons into a container
        const btnContainer = document.createElement("div");
        btnContainer.setAttribute("class", "btn-container");
      
        const btnRead = buildButton("read", index);
        if (library[index].status === true) {
          btnRead.classList.add('read');
        } else {
          btnRead.classList.remove('read');
        }
        btnContainer.appendChild(btnRead);
      
        const btnDelete = buildButton("delete", index);
        btnContainer.appendChild(btnDelete);
      
        card.appendChild(btnContainer);
      
        return card;
      }

      function buildButton(type, index) {
        const button = document.createElement("button");
        button.setAttribute("class", `btn-${type}`);
        button.setAttribute("data-index", `${index}`);
      
        if (type === 'delete') {
          button.innerHTML = 'delete'
        } else if (type === 'read') {
          button.innerHTML = 'read'
        }
        return button;
      }      

      function deleteBook(e) {
        console.log("delete button was clicked")
        e.stopPropagation();
        // delete book from library array
        let index = e.target.getAttribute('data-index');
        library.splice(index, 1);
        // delete book from the interface
        renderCycle();
      }

      function setRead(e) {
        e.stopPropagation();
        let index = e.target.getAttribute('data-index');
        library[index].toggleRead();
        if (library[index].status) {
          e.target.classList.add('read');
        } else {
          e.target.classList.remove('read');
        }
      }

      function startFormListener() {
        const btnAdd = document.querySelector(".add-button");
        btnAdd.addEventListener('click', openForm);
        const cancel = document.querySelector("#popup-form #cancel");
        cancel.addEventListener('click', closeForm);
        const submit = document.querySelector("#popup-form #submit");
        submit.addEventListener('click', addBookToLibrary);
      }

      function startReadButtonListeners() {
        const readBtns = document.querySelectorAll("button.btn-read");
        readBtns.forEach(button => button.addEventListener('click', setRead));
      }
      
      function startDeleteButtonListeners() {
        const delBtns = document.querySelectorAll("button.btn-delete");
        delBtns.forEach(button => button.addEventListener('click', deleteBook));
      }
      
      function startCardListeners() {
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => card.addEventListener('click', (e) => {
          setPreview(e);
          const clickedCard = document.querySelector(".card-clicked");
          if (clickedCard) {
            clickedCard.classList.remove('card-clicked');
          }
          e.target.classList.add('card-clicked');
        }));
      }

      function renderCycle() {
        render();
        // if library exists
        if (library && library.length) {
          startDeleteButtonListeners();
          startReadButtonListeners();
          startCardListeners();
        }
      }

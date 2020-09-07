    console.log("Leonardo, você consegue. Focus.")
    
    //base library
    let library = [
        {title: "the hobbit",
        author: "JRR Tolkien",
        length: 293,
        status: "read",
        genre: "medieval fantasy",
        quote: "once upon a time there was a hobbit",
        unique: 0,   
        },
        {title: 1984,
        author: "George Orwell",
        length: 303,
        status: "read",
        genre: "dystopic fantasy",
        quote: "the big brother is watching you",
        unique: 1,
        }, 
        {title: "Brave New World",
        author: "Aldous Huxley",
        length: 298,
        status: "read",
        genre: "dystopic fantasy",
        quote: "If one's different, one's bound to be lonely.",
        unique: 2,
        },
        {title: "Little mermaid",
        author: "Walter Disney",
        length: 130,
        status: "read",
        genre: "children book",
        quote: "Somewhere into the sea",
        unique: 3,
        },
        {title: "Book 5 ",
        author: "LNG",
        length: 111,
        status: "not read",
        genre: "javascript programming",
        quote: "Lets do this!",
        unique: 4,
        }, 
        {title: "silmarillion",
        author: "Christopher Tolkien",
        length: 302,
        status: "not read",
        genre: "fantasy",
        quote: "Beren and Luthien",
        unique: 5,
        },           
         ]

    //add a new book button and functionality (hoisting)
    let addABook = document.querySelector("#addABook")
    addABook.addEventListener("click", addBookToLibrary)

    class Book{
        constructor(title, author, length, status = "not read", genre, quote){
        this.title = title;
        this.author = author;
        this.length = length;
        this.status = status;
        this.genre = genre;
        this.quote = quote;
        this.unique = "";
        //this.coverImage = coverImage
        }
        //funções adicionadas que cada livro tem
        info(){return `${this.title} by ${this.author}, ${this.length} pages, in ${this.genre} ${this.status}`} 
        multiply(n){return this.length*n}
    }

    function addBookToLibrary(event){
        event.preventDefault()
        //esses prompts se tornarão um form para adicionar novos livros
        let title = prompt("what is the book title?", "");
        let author = prompt("who is the author?", "");
        let length = prompt("how many pages?", 0);
        let status = prompt("have you read this book before?", "not read");
        let genre = prompt("what is this books genre?", "");
        let quote = prompt("would you like to add a quote?", "Lorem ipsum....");
        //let coverImage = prompt("would you like to upload a cover image?", "Lorem ipsum....");

        temporaryBookObject = new Book(title, author, length, status, genre, quote); //adicionar coverImage
        library.push(temporaryBookObject)
        let lastUnique = library[library.length-2]["unique"];
        lastUnique++;
        library[library.length-1]["unique"] = lastUnique;

        buildAndUpdateGrid()
    }

    function buildAndUpdateGrid(){
        //Titulo mais recente
        let mainBookTitle = document.querySelector("#mainBookTitle");
        let mainBookAuthor =  document.querySelector("#mainBookAuthor");
        let mainBookStatus =  document.querySelector("#mainBookStatus");
        let mainBookPages =  document.querySelector("#mainBookPages");

        mainBookTitle.textContent = library[library.length-1]["title"];
        mainBookAuthor.textContent = library[library.length-1]["author"];
        mainBookStatus.textContent = library[library.length-1]["status"];
        mainBookPages.textContent = `${library[library.length-1]["length"]} pages`;

        //os ultimos 4 anteriores
        let otherBooks = document.querySelector(".otherBooks")
        otherBooks.innerHTML = "";
            for (i = 2; i < 6; i++){
                let section = document.createElement("section");
                section.classList.add("fourBooks")
                otherBooks.appendChild(section);

                let bookTitle = document.createElement("h3");
                bookTitle.classList.add("bookTitle");
                section.appendChild(bookTitle);
                bookTitle.textContent = library[library.length-i]["title"];

                let bookAuthor = document.createElement("span");
                bookAuthor.classList.add("bookAuthor");
                section.appendChild(bookAuthor);
                bookAuthor.textContent = library[library.length-i]["author"];

                let bookStatus = document.createElement("span");
                bookStatus.classList.add("bookStatus");
                section.appendChild(bookStatus);
                bookStatus.textContent = library[library.length-i]["status"];

                let bookPages = document.createElement("span");
                bookPages.classList.add("bookPages");
                section.appendChild(bookPages);
                bookPages.textContent = `${library[library.length-i]["length"]} pages`;

                let editThisBook = document.createElement("a");
                editThisBook.classList.add("editBook");
                section.appendChild(editThisBook);
                editThisBook.textContent = "Edit"
            }
    }

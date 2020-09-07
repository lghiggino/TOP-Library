console.log("search library is ON, baby");

document.querySelector("#searchButton").addEventListener("click", check);
let searchResultDisplay = document.querySelector("#searchResultDisplay");


function check(){
    let searchItem = document.querySelector("#search").value.toLowerCase();
    let searchIndex = document.querySelector("#indexes").value;
    let searchResultArray = [];
    //TESTES
    console.log(`Estamos buscando por ${searchItem}`, typeof searchItem)
    console.log(`no índice ${searchIndex}`)
    
    // se o item buscado for "*"" vamos dispor todos os livros
    // em ordem alfabetica de acordo com o INDICE marcado
    if (searchItem === "*") return console.table(library);

    //DEALING WITH BLANK SEARCH - ERROR MESSAGE
    else if (searchItem === "") { 
        searchResultDisplay.innerHTML = "";
        let errorMessage = document.createElement("p");
        errorMessage.textContent = "Please type something";
        errorMessage.classList.add("errorMessage");
        searchResultDisplay.appendChild(errorMessage);
        return;
    }        

    // DEALING WITH A VALID SEARCH
    else if (searchItem != "" && searchItem != "*"){
        searchResultDisplay.innerHTML = "";
        for (i = 0; i < library.length; i++){
            if (library[i][searchIndex].toString().toLowerCase().includes(searchItem)){
                searchResultArray.push(library[i])
            } 
        } console.table(searchResultArray);
            if (searchResultArray.length>0){
                for (i = 0; i < searchResultArray.length; i++){

                let section = document.createElement("section");
                section.classList.add("bookResults");
                searchResultDisplay.appendChild(section)

                let bookTitle = document.createElement("h4");
                bookTitle.classList.add("bookTitle");
                section.appendChild(bookTitle);
                bookTitle.textContent = searchResultArray[i]["title"];

                let bookAuthor = document.createElement("span");
                bookAuthor.classList.add("bookAuthor");
                section.appendChild(bookAuthor);
                bookAuthor.textContent = searchResultArray[i]["author"];

                let bookStatus = document.createElement("span");
                bookStatus.classList.add("bookStatus");
                section.appendChild(bookStatus);
                bookStatus.textContent = searchResultArray[i]["status"];

                let bookPages = document.createElement("span");
                bookPages.classList.add("bookPages");
                section.appendChild(bookPages);
                bookPages.textContent = searchResultArray[i]["length"];

                let editThisBook = document.createElement("a");
                editThisBook.classList.add("editBook");
                section.appendChild(editThisBook);
                editThisBook.textContent = "Edit"
                editThisBook.addEventListener("click", editThisBookBaby)
                }
            }
    }
    
    //length precisa ser pensado porque estaremos recebendo uma string de numeros no input do usuário e teremos que lidar com isso para poder calcular maior ou menor.
    
} //aqui fecha a função check

function editThisBookBaby(){
    console.log("hello")
    // nesse momento essa função é chamada usando o array de resultado, não o array da biblioteca... como fazer um se comunicar com o outro?
}

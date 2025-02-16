// Importações
const formDetails = document.getElementById('form-details')
const inputDetails = document.getElementById('input-data')

const shoppingList = document.getElementById('shopping-list')

const modal = document.getElementById("confirm-modal");
const confirmDeleteBtn = document.getElementById("confirm-delete");
const cancelDeleteBtn = document.getElementById("cancel-delete");

// Captura o evento de submit.
formDetails.onsubmit = (e) => {
  e.preventDefault()

  // Remove os espaços em branco.
  const inputName = inputDetails.value.trim(); 

  // verifica se espaçoes e retorna a funçao caso haja.
  if (inputName === "") {
    alert("O item não pode estar vazio!");
    return;
  }
  
  // captura o value do input e gera um id unico.
  const newInputDetails = {
    inputDetails_name: inputDetails.value,
    id: new Date().getTime(),
  }
  shoppingListAdd(newInputDetails)
}

// Adciona os items a lista 
function shoppingListAdd(newInputDetails) {
  try {
    // Cria o elemento div que vai conter os itens.
    const inputDetailsItem = document.createElement('div')
    inputDetailsItem.classList.add('container-form')

    // Gera um id para o checkbox.
    const checkboxId = `checkbox-${newInputDetails.id}`

    // Cria o checkbox.
    const inputCheckbox = document.createElement('input')
    inputCheckbox.type = 'checkbox'
    inputCheckbox.id = checkboxId

    // Cria o span com o nome do item.
    const inputDetailsName = document.createElement('label')
    inputDetailsName.textContent = newInputDetails.inputDetails_name
    inputDetailsName.setAttribute('for', checkboxId)

    // Cria o ícone de exclusão.
    const inputDetailsIcon = document.createElement('img')
    inputDetailsIcon.setAttribute("src", "img/delete.svg")
    inputDetailsIcon.classList.add('remove-icon')

   // Adiciona os elementos à div inputDetailsItem.
    inputDetailsItem.append(inputCheckbox, inputDetailsName, inputDetailsIcon)
    
    // Cria a lista .
    shoppingList.appendChild(inputDetailsItem)

    //Limpa o formulario.
    formClear()
  } 
  catch (error) {
    //Captura o erro.
    alert('Não foi possível atualizar a lista! Tente novamente mais tarde.')
    console.log(error)
  }
}

// Função para abrir modal.
function openModal() {
  modal.classList.add("open");
}
//Função para fechar modal.
function closeModal() {
  modal.classList.remove("open");
  itemToDelete = null;
}

// Armazena temporariamente o item que será excluido.
let itemToDelete = null; 

//Abri o modal ao clicar no icon de exclusão.
shoppingList.addEventListener("click", (e) => {   
  if (e.target.classList.contains("remove-icon")) { 
    itemToDelete = e.target.closest(".container-form"); 
    openModal()
  }
});

// Evento de confirmação para excluir o item da lista.
confirmDeleteBtn.addEventListener("click", () => {
  if (itemToDelete) {
    itemToDelete.remove(); 
    itemToDelete = null; // Reseta a variável
  }
  closeModal()
});

// Evento de cancelamento para NÃo excluir o item da lista.
cancelDeleteBtn.addEventListener("click", () => {
  itemToDelete = null; // Reseta a variável
  closeModal()
});

// Evento de teclado para excluir (Enter) ou cancelar (Escape)
document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("open")) {
    if (e.key === "Enter" && itemToDelete) {
      itemToDelete.remove();
      itemToDelete = null;
      closeModal();
    } else if (e.key === "Escape") {
      closeModal();
    }
  }
});


// Limpa o formulario.
function formClear() {
  inputDetails.value = ''

  inputDetails.focus()
}


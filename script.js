// Variável para armazenar os dados dos usuários
var userDataList = [];

function isNullOrWhitespace(input) {
    return !input || !input.trim();
}

function validateInput(input) {
    if (isNullOrWhitespace(input)) {
        return false; // Campo vazio ou contém apenas espaços em branco
    }
    return true;
}

document.getElementsByClassName('close')[0].onclick = function() {
    var modal = document.getElementById('editModal');
    modal.style.display = 'none';
}
document.getElementsByClassName('cancelButton')[0].onclick = function() {
    var modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

function toggleAccordion(index) {
    var accordions = document.querySelectorAll('.accordion');
    accordions.forEach(function(accordion, i) {
        if (i === index) {
            accordion.classList.toggle('active');
        } else {
            accordion.classList.remove('active');
        }
    });
}

function deleteUserData(index) {


    // Remove o usuário da lista
    userDataList.splice(index, 1);
    // Atualiza a exibição da lista de usuários
    displayUserData();
}


function saveData() {
    // Obtém os valores dos campos do formulário

    var name = document.getElementById('name').value;
    var ingredientes = document.getElementById('ingredientes').value;
    var preparo = document.getElementById('preparo').value;

    if (!validateInput(name) || !validateInput(ingredientes) || !validateInput(preparo)) {
        var error = document.getElementsByClassName('error')[0];
        error.style.display = 'inline';
        return;
    }else {
        var error = document.getElementsByClassName('error')[0]; // Acesso ao primeiro elemento da coleção
        error.style.display = 'none';
    }

    // Cria um objeto com os dados do usuário
    var userData = {
        name: name,
        ingredientes: ingredientes,
        preparo: preparo
    };

    // Adiciona o objeto à lista de dados dos usuários
    userDataList.push(userData);
    console.log(userDataList);

    // Atualiza a exibição da lista de usuários
    displayUserData();

    // Limpa os campos do formulário após salvar os dados
    document.getElementById('name').value = '';
    document.getElementById('ingredientes').value = '';
    document.getElementById('preparo').value = '';
}

// Função para exibir os dados dos usuários em uma lista
function displayUserData() {
    var userListElement = document.getElementById('userList');
    // Limpa a lista existente antes de exibir os dados atualizados
    userListElement.innerHTML = '';

      // Itera sobre os dados dos usuários e cria elementos de lista para cada um
      userDataList.forEach(function(userData) {
        // Cria a div que englobará os elementos do usuário
        var divUser = createDivForUser(userData);

        // Adiciona a div englobadora à lista
        userListElement.appendChild(divUser);
    });

    function createDivForUser(userData) {
        // Cria uma div para englobar os elementos do usuário
        var divUser = document.createElement('div');
        var divaccord = document.createElement('div');
        var headeracco = document.createElement('div');
        var headerbtn = document.createElement('div')


        divaccord.classList.add('accordion');
        divUser.classList.add('user-container'); // Adiciona uma classe para estilização no CSS
        headeracco.classList.add('header-accordion');
        headerbtn.classList.add('header-button')
    
        // Cria e configura os elementos de texto para o nome, ingredientes e preparo
        divUser.appendChild(headeracco)
        var pName = document.createElement('h1');
        pName.textContent = 'Nome: ' + userData.name;
        headeracco.appendChild(pName);
        headeracco.appendChild(headerbtn)

        var accordionButton = document.createElement('button');
        accordionButton.classList.add('Abrir')
        accordionButton.textContent = 'Abrir';
        accordionButton.onclick = function() {
            toggleAccordion(userDataList.indexOf(userData));
        };
        headerbtn.appendChild(accordionButton);
        

        var editButton = document.createElement('button');
        editButton.classList.add('Editar')
        editButton.textContent = 'Editar';
        editButton.onclick = function() {
            editUserData(userDataList.indexOf(userData));
        };
        headerbtn.appendChild(editButton);
    
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('Deletar')
        deleteButton.onclick = function() {
            deleteUserData(userDataList.indexOf(userData));
        };
        headerbtn.appendChild(deleteButton);

        divUser.appendChild(divaccord);

    
        var pIngredientes = document.createElement('p');
        pIngredientes.textContent = 'Ingredientes: ' + userData.ingredientes;
        divaccord.appendChild(pIngredientes);
    
        var pPreparo = document.createElement('p');
        pPreparo.textContent = 'Modo de preparo: ' + userData.preparo;
        divaccord.appendChild(pPreparo);
       
    
        return divUser;
    }
}



function editUserData(index) {
    var userData = userDataList[index];

    // Preenche os campos do modal com as informações do usuário
    document.getElementById('editName').value = userData.name;
    document.getElementById('editIngredientes').value = userData.ingredientes;
    document.getElementById('editPreparo').value = userData.preparo;

    // Exibe o modal
    var modal = document.getElementById('editModal');
    modal.style.display = 'block';

    // Ação ao clicar no botão "Salvar Edição" dentro do modal
    document.getElementById('saveEditButton').onclick = function() {
        // Obtém os valores atualizados do modal
        var updatedName = document.getElementById('editName').value;
        var updatedIngredientes = document.getElementById('editIngredientes').value;
        var updatedPreparo = document.getElementById('editPreparo').value;

        if (!validateInput(updatedName) || !validateInput(updatedIngredientes) || !validateInput(updatedPreparo)) {
            var error = document.getElementsByClassName('error-modal')[0];
            error.style.display = 'inline';
            return;
        }else {
            var error = document.getElementsByClassName('error-modal')[0]; // Acesso ao primeiro elemento da coleção
            error.style.display = 'none';
        }
    

        // Atualiza os dados do usuário na lista
        userDataList[index].name = updatedName;
        userDataList[index].ingredientes = updatedIngredientes;
        userDataList[index].preparo = updatedPreparo;

        // Atualiza a exibição da lista de usuários
        displayUserData();

        // Fecha o modal
        modal.style.display = 'none';
    };
}
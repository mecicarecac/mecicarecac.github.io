document.addEventListener('DOMContentLoaded', function() {
    const fileListContainer = document.getElementById('file-list');
    const backButton = document.getElementById('back-button');

    // Função para exibir arquivos armazenados
    function displayStoredFiles() {
        const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
        fileListContainer.innerHTML = '';

        storedFiles.forEach((file, index) => {
            const li = document.createElement('li');

            const openButton = document.createElement('button');
            openButton.className = 'button-open';
            openButton.textContent = '🔗';
            openButton.addEventListener('click', () => {
                window.open(file.url, '_blank');
            });

            const deleteButton = document.createElement('button');
            deleteButton.className = 'button-delete';
            deleteButton.textContent = '🗑️';
            deleteButton.addEventListener('click', () => {
                deleteFile(index);
            });

            li.appendChild(openButton);
            li.appendChild(deleteButton);

            const link = document.createElement('span');
            link.textContent = file.name;
            li.appendChild(link);

            fileListContainer.appendChild(li);
        });
    }

    // Função para converter arquivo para base64
    function convertToBase64(file, callback) {
        const reader = new FileReader();
        reader.onload = function(event) {
            callback(event.target.result);
        };
        reader.readAsDataURL(file);
    }

    // Adiciona o evento de mudança ao input de upload
    document.getElementById('file-upload').addEventListener('change', function(event) {
        const fileList = event.target.files;
        const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];

            convertToBase64(file, function(base64URL) {
                uploadedFiles.push({ name: file.name, url: base64URL });
                localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
                displayStoredFiles();
            });
        }
    });

    // Função para excluir um arquivo
    function deleteFile(index) {
        const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
        storedFiles.splice(index, 1);
        localStorage.setItem('uploadedFiles', JSON.stringify(storedFiles));
        displayStoredFiles();
    }

    // Adiciona o evento para o botão "Voltar"
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Verifica se o histórico está disponível
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Se não houver histórico, pode redirecionar para uma página padrão
                window.location.href = '/'; // Substitua pela URL da página inicial ou anterior
            }
        });
    }

    // Exibe os arquivos armazenados ao carregar a página
    displayStoredFiles();
});









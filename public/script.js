async function listarVideos() {
    try {
        // Faz a requisição para obter os vídeos
        const response = await fetch('http://localhost:8000/listaVideos');
        
        // Verifica se a resposta é ok
        if (!response.ok) {
            throw new Error('Erro ao buscar dados: ' + response.statusText);
        }

        // Converte a resposta para JSON
        const videos = await response.json();

        // Obtém o container onde os vídeos serão exibidos
        const container = document.getElementById('videos');
        container.innerHTML = ''; // Limpa o conteúdo existente

        // Cria um fragmento de documento para adicionar os vídeos
        const fragment = document.createDocumentFragment();

        videos.forEach((video) => {
            // Cria um elemento de coluna
            const col = document.createElement('div');
            col.className = 'col espaço_vertical';

            // Cria um link
            const link = document.createElement('a');
            link.href = video.link;
            link.target = '_blank'; // Abre o link em uma nova aba

            // Cria uma imagem
            const img = document.createElement('img');
            img.src = video.imagem;
            img.alt = 'Thumbnail do vídeo';
            img.style.width = '100%';
            img.style.height = 'auto';

            // Adiciona a imagem ao link e o link à coluna
            link.appendChild(img);
            col.appendChild(link);

            // Adiciona a coluna ao fragmento
            fragment.appendChild(col);
        });

        // Adiciona o fragmento ao container
        container.appendChild(fragment);
    } catch (error) {
        console.error('Erro ao buscar vídeos:', error);
    }
}

// Chama a função para listar os vídeos
listarVideos();

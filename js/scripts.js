
document.getElementById('toggleFiltro').addEventListener('click', function() {
    const filtro = document.querySelector('.filtro');
    const recursos = document.querySelector('.recursos');
    filtro.classList.toggle('oculto');
    recursos.classList.toggle('expanded');
});
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById('preview');

    // Limpiar contenido previo
    previewContainer.innerHTML = '';

    if (file) {
        const reader = new FileReader();

        // Si el archivo es una imagen
        if (file.type.startsWith('image/')) {
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                previewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
        // Si el archivo es un PDF
        else if (file.type === 'application/pdf') {
            const url = URL.createObjectURL(file);
            const iframe = document.createElement('iframe');
            iframe.src = url;
            previewContainer.appendChild(iframe);
        }
        // Si el archivo es de texto
        else if (file.type === 'text/plain') {
            reader.onload = function(e) {
                const p = document.createElement('p');
                p.textContent = e.target.result;
                previewContainer.appendChild(p);
            };
            reader.readAsText(file);
        }
        // Si es otro tipo de archivo (por ejemplo, Word)
        else {
            const p = document.createElement('p');
            p.textContent = "No se puede mostrar una vista previa para este tipo de archivo.";
            previewContainer.appendChild(p);
        }
    }
});
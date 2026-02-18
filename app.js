const CLOUD_NAME = "dueqjredz";
const PRESET = "practica";

const $ = id => document.getElementById(id);

function subirImagen() {
    const archivo = $('InpSubir').files[0];

    if (!archivo || !archivo.type.startsWith('image/')) {
        $('MsgError').textContent = archivo ? 'Tipo de archivo incorrecto' : 'Selecciona una imagen';
        $('MsgError').style.display = 'block';
        return; 
    }

    $('btnCargar').disabled = true;
    $('mensaje').style.display = 'block'; 
    $('MsgError').style.display = 'none';
    $('Res').style.display = 'none'; 

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('upload_preset', PRESET);


    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al subir imagen a Cloudinary');
        }
        return response.json();
    })
    .then(data => {
       
        $('imagenSubida').src = data.secure_url;
        $('urlImagen').textContent = data.secure_url;
        $('urlImagen').href = data.secure_url;
        
        $('Res').style.display = 'block';
        console.log('Imagen subida con éxito:', data.secure_url);
    })
    .catch(error => {
        $('MsgError').textContent = 'Error: ' + error.message;
        $('MsgError').style.display = 'block';
        console.error('Error detallado:', error);
    })
    .finally(() => {
        
        $('btnCargar').disabled = false;
        $('mensaje').style.display = 'none';
    });
}
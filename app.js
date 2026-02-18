const CLOUD_NAME = "dueqjredz";
const PRESET = "practica";
const $ = id => document.getElementById(id);

async function subirImagen() {
    const archivo = $('InpSubir').files[0];

    if (!archivo || !archivo.type.startsWith('image/')) {
        $('MsgError').textContent = archivo ? 'Tipo de archivo incorrecto' : 'Selecciona una imagen';
        return $('MsgError').style.display = 'block';
    }

    $('btnCargar').disabled = true;
    $('mensaje').style.display = 'block';
    $('MsgError').style.display = $('Res').style.display = 'none';

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('upload_preset', PRESET);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Error en el servidor');

        const data = await response.json();

        $('imagenSubida').src = $('urlImagen').textContent = $('urlImagen').href = data.secure_url;
        $('Res').style.display = 'block';

    } catch (error) {
        $('MsgError').textContent = 'Error: ' + error.message;
        $('MsgError').style.display = 'block';
    } finally {
        $('btnCargar').disabled = false;
        $('mensaje').style.display = 'none';
    }
}

export const fileUpload = async(file) => {
  if (!file) throw new Error('No hay ningun archivo para subir');

  const cloudUrl = 'https://api.cloudinary.com/v1_1/dhlhetx3i/upload';
  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    }); 
    const cloudResp = await resp.json();
    return cloudResp.secure_url;

  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
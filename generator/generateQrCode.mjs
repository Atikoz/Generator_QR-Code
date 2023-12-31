import axios from "axios";

const generateQrCode = async (url) => {
  try {
    const config = {
      method: 'get',
      url: `https://quickchart.io/qr?text=${url}&srcid=share&margin=1&size=600`,
      headers: {
        'Cookie': 'GAESA=CoQBMDA4NzU5OWQ0MjI2M2I3ODJmNThlYWQ0NTcwMTlmYzJjZDE4MTI3OTE4NGEyYzQ4MjQ3ZjIwNzIxODk3ZGUxODk4MTk5ODU5MDU2MGM1YWYyM2Y0NjJjYzFiZDMxY2JlOTRhZGYwMmUyMjgwNGEzZWIyYjZiYjIyYTU4Njg1OGE4Nzc2EMbpurrLMQ'
      },
      responseType: 'arraybuffer',
    };

    return axios.request(config)
      .then((response) => {
        const imageBuffer = Buffer.from(response.data, 'binary');
        return imageBuffer
      }).catch((error) => {
        console.error('Error request QR code:', error);
      });
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
};



export default generateQrCode;

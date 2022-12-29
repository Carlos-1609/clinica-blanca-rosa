import axios from "axios";
import Compressor from "compressorjs";

const compressImage = (file) => {
  return new Promise((res, rej) => {
    new Compressor(file, {
      quality: 0.8,
      success(result) {
        const cloudUrl = "https://api.cloudinary.com/v1_1/ddwyu64tx/upload";
        const formData = new FormData();
        formData.append("upload_preset", "react-clinica");
        formData.append("file", file);
        axios.post(cloudUrl, formData).then((resp) => {
          console.log("adentro del then");
          console.log(resp.data.secure_url);
          res(resp.data.secure_url);
        });
      },
      error(err) {
        console.log(err.message);
        rej(err);
      },
    });
  });
};

export const fileUpload = async (file) => {
  if (!file) throw new Error("No tenemos ningun archivo a subir");
  const secureUrl = await compressImage(file);
  // console.log("Este es el secure url de la promesa", secureUrl);
  return secureUrl;

  // console.log("este es el url");
  // console.log(secureUrl);
  // return secureUrl;

  // const formData = new FormData();
  // formData.append("upload_preset", "react-clinica");
  // formData.append("file", file);

  // try {
  //   const resp = await fetch(cloudUrl, {
  //     method: "POST",
  //     body: formData,
  //   });
  //   // console.log(resp);
  //   if (!resp.ok) throw new Error("No se pudo subir la imagen");

  //   const cloudResp = await resp.json();
  //   // console.log({ cloudResp });
  //   return cloudResp.secure_url;
  // } catch (error) {
  //   console.log(error);
  //   throw new Error(error.message);
  // }
};

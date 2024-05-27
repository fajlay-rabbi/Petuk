exports.convertBase64 = (img) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(img);
        fileReader.onload = () => resolve(fileReader.result);
    })
}
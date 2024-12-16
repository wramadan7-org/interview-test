export const downloadBlob = (blobUrl: string, filename: string) => {
  // Fetch the blob data
  fetch(blobUrl)
    .then((response) => response.blob())
    .then((blob) => {
      // Buat URL lokal untuk blob
      const url = URL.createObjectURL(blob);

      // Buat elemen <a> untuk mendownload
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "downloaded_file";
      document.body.appendChild(a);
      a.click();

      // Hapus elemen setelah digunakan
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error downloading blob:", error);
    });
};

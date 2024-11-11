import { Download } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";

function ButtonSelect({ IdVino, Nombre }) {
  //Para agrandar el QR
  const [isDownloading, setIsDownload] = useState(false);
  const qrRef = useRef(null);

  const handleDownload = async () => {
    alert("Se descargará el QR");
    if (qrRef.current === null) return;
    await toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${Nombre}QR.png`;
        link.click();
      })
      .catch((err) => {
        console.error("Error al descargar la imagen:", err);
      });
    setIsDownload(false);
  };

  useEffect(() => {
    if (isDownloading) {
      handleDownload();
    }
  }, [isDownloading]);

  return (
    <div>
      <div ref={qrRef} className={`${isDownloading ? "" : "hidden"}`}>
        <QRCodeCanvas value={`${IdVino}`} size={240} />
      </div>
      <button
        className="p-1"
        onClick={() => {
          setIsDownload(true);
        }}
      >
        <Download
          size={30}
          className="p-1 border border-gray-500 bg-green-500 text-white hover:bg-green-700"
        />
      </button>
    </div>
  );
}

export default ButtonSelect;

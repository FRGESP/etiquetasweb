"use client";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  Wine,
  Grape,
  Amphora,
  MapPin,
  Thermometer,
  Eye,
  Waves,
  Utensils,
  CalendarDays,
  Cookie,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";

function VinoDashboard() {
  //Guarda la informacion del vino escaneado
  const [vinoData, setVinoData] = useState([]);

  //Guarda la informacion de las uvas
  const [uvas, setUvas] = useState([]);

  const [scanResult, setScanResult] = useState(null);

  //Obtiene la informacion del vino escaneado
  const getData = async () => {
    const response = await axios.get(`/api/Vinos/${scanResult}`);
    console.log(response.data[0][0]);
    setVinoData(response.data[0][0]);
    response.data[1].map((uva) => {
      console.log(uva.Uva);
      setUvas((uvas) => [...uvas, uva.Uva]);
    })
  };

  useEffect(() => {
    setScan();
  }, []);

  const setScan = () => {
    
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });
    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
    }

    function error(err) {
      console.log(err);
    }
    
  }

  //Se ejecuta cada vez que se escanea un codigo QR
  useEffect(() => {
    if (!scanResult) return;
    getData();
    
  }, [scanResult]);

  return (
    <div className="flex flex-col gap-2 w-[500px] border border-black p-10 rounded-lg shadow-2xl justify-center">
      <div id="reader" className={`${scanResult ? 'hidden' : ''}`}></div>
      {scanResult && (
        <div className="h-[700px] border-2 border-black rounded-lg p-4 overflow-y-auto">
          <div className=" flex h-32 items-center justify-center">
            <div className="">
              <Wine size={115} className="text-red-800" />
            </div>
            <div className="flex-grow flex flex-col">
              <div className="flex">
                <span className="text-lg"><strong>Vino:</strong> {vinoData.Vino}</span>
              </div>
              <div className="flex">
              <span className="text-lg"><strong>Viñedo:</strong> {vinoData.Viñedo}</span>
              </div>
              <div className="flex">
              <span className="text-lg"><strong>Categoria:</strong> {vinoData.Categoria}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="text-3xl font-bold mt-3">Descripción</p>
          </div>
          <div className=" flex flex-col mt-2 gap-2">
            <div className="flex items-center">
              <div className="mr-2">
                <Grape size={30} className="text-purple-700" />
              </div>
              <div className="flex-grow-0">
                <div className="flex">
                <span className="text-lg"><strong>Uvas:</strong> {<span className="text-lg ml-1"> {
                    uvas.map((uva, index) => (
                      <span key={index}>{uva}, </span>
                    ))
                    }</span>}</span>
                  
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <MapPin size={30} className="text-red-700" />
              </div>
              <div className="flex-grow-0">
                <div className="flex">
                <span className="text-lg"><strong>Región:</strong> {vinoData.Region}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <CalendarDays size={30} className="text-orange-500" />
              </div>
              <div className="flex-grow-0">
                <div className="flex">
                <span className="text-lg"><strong>Crianza:</strong> {vinoData.Crianza}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <Amphora size={30} className="text-black" />
              </div>
              <div className="flex-grow-0">
                <div className="flex">
                <span className="text-lg"><strong>Añejamiento:</strong> {vinoData.Añejamiento}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <Thermometer size={30} className="text-red-700" />
              </div>
              <div className="flex-grow-0">
                <div className="flex">
                <span className="text-lg"><strong>Temperatura:</strong> {vinoData.Temperatura}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="text-3xl font-bold mt-3">Cata</p>
          </div>
          <div className=" flex flex-col mt-2 gap-2">
            <div className="flex items-center">
              <div className="mr-2">
                <Eye size={30} className="text-black" />
              </div>
              <div className="flex-grow-0">
                <div className="flex">
                <span className="text-lg"><strong>Vista:</strong> {vinoData.Vista}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <Waves size={30} className="text-orange-600" />
              </div>
              <div className="flex-grow-0">
                <div className="flex">
                <span className="text-lg"><strong>Nariz:</strong> {vinoData.Nariz}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <Cookie size={30} className="text-orange-500" />
              </div>
              <div className="flex-grow-0">
                <div className="flex">
                  <span className="text-lg"><strong>Boca:</strong> {vinoData.Boca}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <Utensils size={30} className="text-blue-600" />
              </div>
              <div className="flex-grow-0">
                <div className="flex">
                <span className="text-lg"><strong>Maridaje:</strong> {vinoData.Maridaje}</span>
                </div>
              </div>
            </div>
          </div>
          <button className="border border-black w-full bg-green-600 hover:bg-green-800 text-white rounded-md py-2 my-4" onClick={() => {setScanResult(null); setScan()}}>
            Escanear otro QR
          </button>
          <Link className="border border-black w-full bg-blue-600 hover:bg-blue-800 text-white rounded-md py-2 flex justify-center" href={'/'}>Descargar otro QR</Link>
        </div>
      )}
    </div>
  );
}

export default VinoDashboard;

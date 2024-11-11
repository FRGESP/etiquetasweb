import { NextResponse } from 'next/server';
import {connection} from '@/libs/mysql';

export  function GET() {
  return NextResponse.json('listando Vinos');
}

export async function POST(request){

  try{
  const {Vino} = await request.json();
  console.log(Vino);
  const [result] = await connection.query("CALL sp_buscarVinot(?)", [
    Vino,
  ]);

  return NextResponse.json(result[0]);

}catch(error){
  console.log(error);
  return NextResponse.json({
    
    message: 'ERROR A LA HORA DE BUSCAR', 
  },
  {
    status: 500,
  }
);
}
}
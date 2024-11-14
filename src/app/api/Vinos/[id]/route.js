import { NextResponse } from 'next/server';
import {connection} from '@/libs/mysql'

export async function GET(request, { params }){

  try{
  const [result] = await connection.query('CALL sp_VinosTabla(?)', [params.id]);

  if(result.length == 0){

    return NextResponse.json({

     message: 'Vino no encontrado',

    },
    {
      status: 404,
    }
  );

  }

  return NextResponse.json([result[0],result[1]]);
}catch{
  return NextResponse.json({
    
    message: 'ERROR A LA HORA DE BUSCAR', 
  },
  {
    status: 500,
  }
);
}
}
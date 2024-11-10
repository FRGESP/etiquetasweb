import { NextResponse } from 'next/server';
import {connection} from '@/libs/mysql'
s

export  async function POST(request) {

    try{
    const {IdViñedo,IdCategoria,Vino,Crianza,Añejamiento,Temperatura,Vista,Boca,Nariz,Maridaje} = await request.json();
   

    const result = await connection.query("CALL sp_InsertVino(?,?,?,?,?,?,?,?,?,?)",[
        IdViñedo,
        IdCategoria,
        Vino,
        Crianza,
        Añejamiento,
        Temperatura,
        Vista,
        Boca,
        Nariz,
        Maridaje

    ]);

    const [NewId] = await connection.query(" SELECT LAST_INSERT_ID() AS id;");
    const Id = NewId[0].id

    return NextResponse.json({
        IdVino: Id,
        IdViñedo,
        IdCategoria,
        Vino,
        Crianza,
        Añejamiento,
        Temperatura,
        Vista,
        Boca,
        Nariz,
        Maridaje,
    },
    {
        message: 'VINO AGREGADO',
    });

}catch(error){
    console.log(error)
    return NextResponse.json({
        
        message: 'La persona no se pudo agregar'

    });
}

}

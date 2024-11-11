import React from 'react';
import {QRCodeSVG} from 'qrcode.react';


const QRCodeGenerated = ({ id }) => {

  return (
    <div>
      <QRCodeSVG value={`${id}`} size={128} />
    </div>
  );
};

export default QRCodeGenerated;

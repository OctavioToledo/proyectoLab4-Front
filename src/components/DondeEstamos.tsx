import React from "react";

const DondeEstamos: React.FC = () => {
  return (
    <div>
      <h2>Ubicación: Av. Las Heras y Av. San Martín, Ciudad de Mendoza</h2>
      <div style={{ width: '100%', height: '400px' }}>
        <iframe
          title="Mapa"
          width="100%"
          height="100%"
          src={`https://maps.google.com/maps?q=Av.%20Las%20Heras%20y%20Av.%20San%20Martín,%20Ciudad%20de%20Mendoza&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        />
      </div>
    </div>
  );
};

export default DondeEstamos;

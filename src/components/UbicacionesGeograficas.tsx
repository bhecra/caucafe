import React, { useState } from 'react';
const departamentosColombia: string[] = [
    "Amazonas",
    "Antioquia",
    "Arauca",
    "Atlántico",
    "Bolívar",
    "Boyacá",
    "Caldas",
    "Caquetá",
    "Casanare",
    "Cauca",
    "Cesar",
    "Chocó	",
    "Córdoba",
    "Cundinamarca",
    "Guainía",
    "Guaviare",
    "Huila",
    "La Guajira",
    "Magdalena",
    "Meta",
    "Nariño",
    "Norte de Santander",
    "Putumayo",
    "Quindío",
    "Risaralda",
    "San Andrés y Providencia",
    "Santander",
    "Sucre",
    "Tolima",
    "Valle del Cauca",
    "Vaupés",
    "Vichada",
]
interface Municipio {
    id: number;
    nombre: string;
  }
const municipiosCauca: Municipio[] = [
    { id: 301, nombre: 'Almaguer' },
    { id: 302, nombre: 'Argelia' },
    { id: 303, nombre: 'Balboa' },
    { id: 304, nombre: 'Bolívar' },
    { id: 305, nombre: 'Buenos Aires' },
    { id: 306, nombre: 'Cajibío' },
    { id: 307, nombre: 'Caldono' },
    { id: 308, nombre: 'Caloto' },
    { id: 309, nombre: 'Corinto' },
    { id: 310, nombre: 'El Tambo' },
    { id: 311, nombre: 'Florencia' },
    { id: 312, nombre: 'Guachené' },
    { id: 313, nombre: 'Guapi' },
    { id: 314, nombre: 'Inzá' },
    { id: 315, nombre: 'Jambaló' },
    { id: 316, nombre: 'La Sierra' },
    { id: 317, nombre: 'La Vega' },
    { id: 318, nombre: 'López de Micay' },
    { id: 319, nombre: 'Mercaderes' },
    { id: 320, nombre: 'Miranda' },
    { id: 321, nombre: 'Morales' },
    { id: 322, nombre: 'Padilla' },
    { id: 323, nombre: 'Páez' },
    { id: 324, nombre: 'Patía' },
    { id: 325, nombre: 'Piamonte' },
    { id: 326, nombre: 'Piendamó' },
    { id: 327, nombre: 'Popayán' },
    { id: 328, nombre: 'Puerto Tejada' },
    { id: 329, nombre: 'Puracé' },
    { id: 330, nombre: 'Rosas' },
    { id: 331, nombre: 'San Sebastián' },
    { id: 332, nombre: 'Santa Rosa' },
    { id: 333, nombre: 'Santander de Quilichao' },
    { id: 334, nombre: 'Silvia' },
    { id: 335, nombre: 'Sotará' },
    { id: 336, nombre: 'Suárez' },
    { id: 337, nombre: 'Sucre' },
    { id: 338, nombre: 'Timbío' },
    { id: 339, nombre: 'Timbiquí' },
    { id: 340, nombre: 'Toribío' },
    { id: 341, nombre: 'Totoró' },
    { id: 342, nombre: 'Villa Rica' },
  ];
export default function UbicacionesGeograficas () {
    const [selectedMunicipio, setSelectedMunicipio] = useState<Municipio | null>(null);
    const handleMunicipioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const municipioId = parseInt(event.target.value);
        const selectedMun = municipiosCauca.find(mun => mun.id === municipioId);
        setSelectedMunicipio(selectedMun || null);
      };
    return (
          <select id= "Municipio" onChange={handleMunicipioChange}>
            <option value={0}>Selecciona un municipio</option>
            {municipiosCauca.map(municipio => (
              <option key={municipio.id} value={municipio.nombre}>{municipio.nombre}</option>
            ))}
          </select>
    )
}
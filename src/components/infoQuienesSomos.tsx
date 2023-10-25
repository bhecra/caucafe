
import React from 'react';

interface SobreNosotrosProps {
    title: string;
    description: string;
    image: string;
    imageOnLeft: boolean;
}

export const SobreNosotros: React.FC<SobreNosotrosProps> = ({ title, description, image, imageOnLeft }) => {
    return (
        <section className={`sobre-nosotros ${imageOnLeft ? 'image-left' : 'image-right'}`}>
            <div className="imagen-creadores">
                <img
                    src={image}
                    alt="Imagen de los Creadores"
                    className="imagen-creadores"
                />
            </div>
            <div className="descripcion">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </section>
    );
};

import React from 'react';

interface Link {
  text: string;
  href: string;
}

interface SectionProps {
  imageSrc: string;
  altText: string;
  links: Link[];
}

function Section({ imageSrc, altText, links }: SectionProps) {
  return (
    <div className="section-1">
      <img src={imageSrc} alt={altText} />
      <div className="columna">
        {links.map((link, index) => (
          <p key={index}><a href={link.href}>{link.text}</a></p>
        ))}
      </div>
    </div>
  );
}

export default Section;

import React from 'react';
import { Link, Outlet} from 'react-router-dom';

interface enlaces {
  text: string;
  route: string;
}

interface SectionProps {
  imageSrc: string;
  altText: string;
  links: enlaces[];
}

function Section({ imageSrc, altText, links }: SectionProps) {
  return (
    <div className="section-1">
      <img src={imageSrc} alt={altText}/>
      <div className="columna">
        <ul>
          {links.map((link, index) => (
            <li key={index}><Link to = {link.route}>{link.text}</Link><Outlet/></li>
            
          ))}
        </ul>
      </div>
            
    </div>
  );
}

export default Section;

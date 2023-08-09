import zyroImage from '../assets/images/zyro-image.svg'; // Ajusta la ruta según tu estructura de carpetas

function Header() {
  return (
    <header>
      <img src={zyroImage} alt="Logo" className="unicauca" />
    </header>
  );
}

export default Header;

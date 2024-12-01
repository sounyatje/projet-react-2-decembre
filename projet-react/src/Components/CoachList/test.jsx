import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-lightGray py-10 mt-6 px-8 border-t-2 border-orange flex flex-col md:flex-row justify-around items-start text-left space-y-8 md:space-y-0 transition-all">
      
      {/* Section À propos */}
      <div className="footer-section">
        <h4 className="text-lg font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange to-blueDark transition duration-300">
          À propos
        </h4>
        <ul className="space-y-2">
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Qui sommes-nous</li>
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Nos valeurs</li>
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Mentions légales</li>
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Confidentialité</li>
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Départements</li>
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Jobs</li>
        </ul>
      </div>
      
      {/* Section Cours */}
      <div className="footer-section">
        <h4 className="text-lg font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange to-blueDark transition duration-300">
          Cours
        </h4>
        <ul className="space-y-2">
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Zumba</li>
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Pilates</li>
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Circuit training</li>
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Natation</li>
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Abdos fessiers</li>
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Bodypump</li>
        </ul>
      </div>
      
      {/* Section Assistance */}
      <div className="footer-section">
        <h4 className="text-lg font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange to-blueDark transition duration-300">
          Assistance
        </h4>
        <ul className="space-y-2">
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Centre d'aide</li>
          <li className="text-gray-700 hover:text-orange cursor-pointer transition-colors">Contact</li>
        </ul>
      </div>
      
      {/* Section Suivez-nous */}
      <div className="footer-section">
        <h4 className="text-lg font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange to-blueDark transition duration-300">
          Suivez-nous
        </h4>
        <div className="flex space-x-4">
          <a href="#" className="text-orange hover:text-blueDark transition-transform transform hover:scale-125 duration-300">
            <FaFacebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-orange hover:text-blueDark transition-transform transform hover:scale-125 duration-300">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-orange hover:text-blueDark transition-transform transform hover:scale-125 duration-300">
            <FaTwitter className="w-6 h-6" />
          </a>
        </div>
    
      </div>
 
      

    </footer>
  );
}

export default Footer;
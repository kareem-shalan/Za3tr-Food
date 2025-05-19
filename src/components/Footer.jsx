import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import logo from '../../public/icon.png';
const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className='flex items-center gap-2 flex-col justify-center'>
           <img src={logo} alt="logo" className="w-30 h-20" />
            <p className="text-gray-600">Your ultimate destination for delicious meals and recipes.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <a 
                href="mailto:kareemmohamedali330@gmail.com" 
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <MdEmail className="h-5 w-5 mr-2" />
                kareemmohamedali330@gmail.com
              </a>
              <a 
                href="tel:+201272958197" 
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <MdPhone className="h-5 w-5 mr-2" />
                +20 127 295 8197
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/kareem-shalan/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <FaLinkedin className="h-6 w-6" />
                <span className="ml-2">LinkedIn</span>
              </a>
              <a 
                href="https://github.com/kareem-shalan" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <FaGithub className="h-6 w-6" />
                <span className="ml-2">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Z3atr by Kareem Shalan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
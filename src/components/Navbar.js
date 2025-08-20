// src/components/Navbar.js
export default function Navbar() {
  return (
    <nav className="bg-transparent p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-playfair">Kota Cloud</h1>
        <ul className="flex space-x-4 text-white font-open-sans">
          <li><a href="/" className="hover:text-[#C67C4E]">Home</a></li>
          <li><a href="/menu" className="hover:text-[#C67C4E]">Menu</a></li>
          <li><a href="/contact" className="hover:text-[#C67C4E]">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
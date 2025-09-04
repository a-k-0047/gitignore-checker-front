import { FileCode } from 'lucide-react';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-600 text-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="flex items-center space-x-2 text-2xl font-bold">
          <FileCode className="w-7 h-7" />
          <span>Gitignore Checker</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;

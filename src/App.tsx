import { useState } from 'react';

import GeneratorPreview from './components/GeneratorPreview';
import GitignoreInput from './components/GitignoreInput';
import Header from './components/Header';
import IgnoreChecker from './components/IgnoreChecker';

const App = () => {
  const [gitignoreContent, setGitignoreContent] = useState("");

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <GitignoreInput onChange={setGitignoreContent} />
          <GeneratorPreview
            gitignoreContent={gitignoreContent}
            setGitignoreContent={setGitignoreContent}
          />
        </div>
        <IgnoreChecker gitignoreContent={gitignoreContent} />
      </div>
    </div>
  );
};

export default App;

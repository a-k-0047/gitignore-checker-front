import React from 'react';

import type { ChangeEvent } from "react";

interface Props {
  onChange: (content: string) => void;
}

const templates: Record<string, string> = {
  node: "node_modules/\ndist/\n.env\n",
  react: "node_modules/\nbuild/\n.env\n",
  python: "__pycache__/\n*.pyc\n.env\n",
  docker: "*.log\n*.tmp\n.env\n",
};

const GitignoreInput: React.FC<Props> = ({ onChange }) => {
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleTemplateSelect = (template: string) => {
    onChange(templates[template]);
  };

  return (
    <div className="mb-4">
      <h2 className="font-bold mb-2">.gitignore 入力 / 選択</h2>
      <input
        type="file"
        accept=".gitignore"
        onChange={handleFileUpload}
        className="mb-2"
      />
      <div>
        {Object.keys(templates).map((t) => (
          <button
            key={t}
            onClick={() => handleTemplateSelect(t)}
            className="mr-2 mb-2 px-2 py-1 bg-blue-500 text-white rounded"
          >
            {t} テンプレート
          </button>
        ))}
      </div>
    </div>
  );
};

export default GitignoreInput;

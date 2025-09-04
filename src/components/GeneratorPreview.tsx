import React from 'react';

interface Props {
  gitignoreContent: string;
  setGitignoreContent: (value: string) => void;
}

const GeneratorPreview: React.FC<Props> = ({
  gitignoreContent,
  setGitignoreContent,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(gitignoreContent);
    alert("コピーしました！");
  };

  return (
    <div className="mb-4">
      <h2 className="font-bold mb-2">生成プレビュー</h2>
      <textarea
        value={gitignoreContent}
        onChange={(e) => setGitignoreContent(e.target.value)}
        className="w-full h-40 p-2 border rounded"
      />
      <button
        onClick={handleCopy}
        className="mt-2 px-2 py-1 bg-green-500 text-white rounded"
      >
        コピー
      </button>
    </div>
  );
};

export default GeneratorPreview;

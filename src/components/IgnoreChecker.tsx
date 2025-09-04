import ignore from 'ignore';
import React, { useState } from 'react';

interface Props {
  gitignoreContent: string;
}

interface CheckResult {
  path: string;
  ignored: boolean;
  matchedRule: string | null;
}

const IgnoreChecker: React.FC<Props> = ({ gitignoreContent }) => {
  const [paths, setPaths] = useState("");

  // ignoreインスタンス作成
  const ig = ignore();
  ig.add(gitignoreContent);

  // 正規化
  const normalizePath = (p: string): string | null => {
    const trimmed = p.trim();
    if (!trimmed || trimmed === ".") return null; // 空行・"." はスキップ
    if (trimmed.startsWith("/")) return null; // 絶対パスはスキップ
    // ドットで始まる場合も余計な "." を付けずそのまま返す
    return trimmed;
  };

  const pathList = paths
    .split("\n")
    .map(normalizePath)
    .filter(Boolean) as string[];

  // スラッシュで始まるパスがあったかどうか
  const hasAbsolutePaths = paths
    .split("\n")
    .some((p) => p.trim().startsWith("/"));

  const checkPaths: CheckResult[] = pathList.map((p) => {
    const ignored = ig.ignores(p);

    // どのルールにマッチしたか探す
    const matchedRule =
      gitignoreContent
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"))
        .find((rule) => {
          const testIg = ignore();
          testIg.add(rule);
          return testIg.ignores(p);
        }) || null;

    return { path: p, ignored, matchedRule };
  });

  return (
    <div className="mb-6">
      <h2 className="font-bold mb-2 text-lg">Ignore チェック</h2>

      {/* 入力エリア */}
      <textarea
        placeholder="チェックしたいファイル/ディレクトリを改行区切りで入力"
        value={paths}
        onChange={(e) => setPaths(e.target.value)}
        className="w-full h-32 p-2 border rounded mb-2 font-mono text-sm"
      />

      {/* 注意メッセージ */}
      {hasAbsolutePaths && (
        <>
          <p className="text-yellow-600">
            カレントディレクトリ基準の相対パスで入力してください
          </p>
          <p className="text-yellow-600 mb-2">
            （先頭に`/`があるパスは無視されます）
          </p>
        </>
      )}

      {/* 判定結果 */}
      <div className="mb-4">
        {checkPaths.length === 0 ? (
          <p className="text-gray-500"></p>
        ) : (
          checkPaths.map(({ path, ignored, matchedRule }) => (
            <div key={path} className="mb-1">
              <span className="font-mono">{path}</span> →{" "}
              {ignored ? (
                <span className="text-green-600">
                  Ignore される{" "}
                  {matchedRule && (
                    <span className="text-gray-500">
                      (ルール: <code>{matchedRule}</code>)
                    </span>
                  )}
                </span>
              ) : (
                <span className="text-red-600">Ignore されない</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IgnoreChecker;

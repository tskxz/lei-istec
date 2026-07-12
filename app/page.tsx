import fs from "fs";
import path from "path";

interface TreeNode {
  name: string;
  pathSegments: string[];
  isDirectory: boolean;
  children?: TreeNode[];
}

function buildDirectoryTree(pathSegments: string[] = []): TreeNode {
  const root = path.join(process.cwd(), "content");
  const safePath = path.normalize(path.join(root, ...pathSegments));

  if (!safePath.startsWith(root) || !fs.existsSync(safePath)) {
    return {
      name: pathSegments.length === 0 ? "content" : pathSegments[pathSegments.length - 1],
      pathSegments,
      isDirectory: true,
      children: [],
    };
  }

  const entries = fs.readdirSync(safePath, { withFileTypes: true });

  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name, "pt"))
    .map((entry) => ({
      name: entry.name,
      pathSegments: [...pathSegments, entry.name],
      isDirectory: true,
      children: [],
    }));

  const files = entries
    .filter((entry) => entry.isFile())
    .sort((a, b) => a.name.localeCompare(b.name, "pt"))
    .map((entry) => ({
      name: entry.name,
      pathSegments: [...pathSegments, entry.name],
      isDirectory: false,
    }));

  return {
    name: pathSegments.length === 0 ? "content" : pathSegments[pathSegments.length - 1],
    pathSegments,
    isDirectory: true,
    children: [...dirs, ...files].map((entry) =>
      entry.isDirectory ? buildDirectoryTree(entry.pathSegments) : entry
    ),
  };
}

const fileLinkHref = (pathSegments: string[]) => `/files/${pathSegments.map(encodeURIComponent).join("/")}`;

function renderTree(node: TreeNode) {
  if (!node.children || node.children.length === 0) {
    return null;
  }

  return (
    <ul className="ml-4 space-y-2">
      {node.children.map((child) => (
        <li key={child.pathSegments.join("/")}> 
          {child.isDirectory ? (
            <details className="group rounded-lg border border-slate-800 bg-slate-900/90 p-3 transition hover:border-slate-600">
              <summary className="cursor-pointer text-sm font-medium text-slate-100">
                <span className="mr-2">📁</span> {child.name}
              </summary>
              {renderTree(child)}
            </details>
          ) : (
            <div className="rounded-lg border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 transition hover:border-slate-600 hover:bg-slate-900/95">
              <a
                href={fileLinkHref(child.pathSegments)}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-left text-sm font-medium text-slate-100 transition hover:text-white hover:underline"
                title="Abrir em nova aba"
              >
                📄 {child.name}
              </a>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const rootTree = buildDirectoryTree([]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-5 px-6 py-10 sm:px-8">
        <section className="space-y-3 bg-slate-950/90 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">ISTEC - Licenciatura Engenharia Informática</p>
          <p className="text-base leading-7 text-slate-300">
            Todos os trabalhos, estudos e projetos de cada UC feitos por mim, conteúdos e slides de aprendizem feitos dentro do ISTEC guardados aqui.
          </p>
        </section>

        <section className="space-y-4 bg-slate-950/90 p-4">
          <div>{renderTree(rootTree)}</div>
        </section>
      </main>
    </div>
  );
}

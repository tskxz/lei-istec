import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TreeNode {
  name: string;
  pathSegments: string[];
  isDirectory: boolean;
  children?: TreeNode[];
}

interface BrowsePageProps {
  params: {
    path?: string[];
  };
}

function getDirectoryTree(pathSegments: string[] = []): TreeNode {
  const root = path.join(process.cwd(), "content");
  const safePath = path.normalize(path.join(root, ...pathSegments));

  if (!safePath.startsWith(root) || !fs.existsSync(safePath)) {
    notFound();
  }

  const entries = fs.readdirSync(safePath, { withFileTypes: true });

  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name, "pt"))
    .map((dir) => ({
      name: dir.name,
      pathSegments: [...pathSegments, dir.name],
      isDirectory: true,
      children: [],
    }));

  const files = entries
    .filter((entry) => entry.isFile())
    .sort((a, b) => a.name.localeCompare(b.name, "pt"))
    .map((file) => ({
      name: file.name,
      pathSegments: [...pathSegments, file.name],
      isDirectory: false,
    }));

  const children = [...dirs, ...files];

  return {
    name: pathSegments.length === 0 ? "content" : pathSegments[pathSegments.length - 1],
    pathSegments,
    isDirectory: true,
    children: children.map((child) =>
      child.isDirectory ? getDirectoryTree(child.pathSegments) : child
    ),
  };
}

function getFileHref(pathSegments: string[]) {
  return `/files/${pathSegments.map(encodeURIComponent).join("/")}`;
}

function renderTree(node: TreeNode) {
  if (!node.children || node.children.length === 0) {
    return (
      <ul className="ml-4 space-y-2">
        <li className="text-slate-500 dark:text-slate-400">(vazio)</li>
      </ul>
    );
  }

  return (
    <ul className="mt-2 space-y-2 text-sm text-slate-800 dark:text-slate-200">
      {node.children.map((child) => (
        <li key={child.pathSegments.join("/")}> 
          {child.isDirectory ? (
            <details className="rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-950" open>
              <summary className="cursor-pointer font-medium text-slate-900 dark:text-slate-100">
                📁 {child.name}
              </summary>
              {renderTree(child)}
            </details>
          ) : (
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
              <span>📄 {child.name}</span>
              <a
                href={getFileHref(child.pathSegments)}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                {...(path.extname(child.name).toLowerCase() === ".zip" ? { download: child.name } : {})}
              >
                Abrir
              </a>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function BrowsePage({ params }: BrowsePageProps) {
  const pathSegments = params.path ?? [];
  const tree = getDirectoryTree(pathSegments);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-black/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Navegador de Conteúdos ISTEC</h1>
              <p className="mt-2 text-base leading-7 text-slate-600 dark:text-slate-300">
                Árvore de pastas e ficheiros dentro de <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800 dark:bg-slate-800 dark:text-slate-200">content</code>.
                Clique em ficheiros para abrir imagens/PDFs e em ZIP para descarregar.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              Voltar ao início
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-black/10">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Árvore de ficheiros</h2>
          <div className="mt-4">{renderTree(tree)}</div>
        </section>
      </main>
    </div>
  );
}

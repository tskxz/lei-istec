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
        <li className="text-sm text-muted-foreground">(vazio)</li>
      </ul>
    );
  }

  return (
    <ul className="mt-2 space-y-2 text-sm text-foreground">
      {node.children.map((child) => (
        <li key={child.pathSegments.join("/")}>
          {child.isDirectory ? (
            <details className="rounded-xl border border-border bg-muted/40 p-3" open>
              <summary className="cursor-pointer font-medium text-foreground">
                📁 {child.name}
              </summary>
              {renderTree(child)}
            </details>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
              <span>📄 {child.name}</span>
              <a
                href={getFileHref(child.pathSegments)}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-primary hover:underline"
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
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-10 sm:px-8">
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Navegador de Conteúdos ISTEC</h1>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Árvore de pastas e ficheiros dentro de <code className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">content</code>.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-lg border border-border bg-muted/60 px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              Voltar ao início
            </Link>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground">Árvore de ficheiros</h2>
          <div className="mt-4">{renderTree(tree)}</div>
        </section>
      </main>
    </div>
  );
}

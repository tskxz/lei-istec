import fs from "fs";
import path from "path";
import { GraduationCap } from "lucide-react";
import { FileExplorer, type TreeNode } from "@/components/file-explorer";

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

export default function Home() {
  const rootTree = buildDirectoryTree([]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-12 sm:px-8">
        {/* Hero Header */}
        <header className="animate-fade-up flex items-start gap-4">
          <div className="hidden size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary sm:flex">
            <GraduationCap className="size-6" />
          </div>
          <div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Conteúdos do Curso
            </h1>
            <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              Trabalhos, apontamentos e projetos das disciplinas da Licenciatura em Engenharia Informática do ISTEC.
            </p>
          </div>
        </header>

        {/* Interactive explorer */}
        <FileExplorer tree={rootTree} />

        <footer className="mt-6 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          Engenharia Informática · ISTEC
        </footer>
      </main>
    </div>
  );
}

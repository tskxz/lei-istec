import fs from "fs";
import path from "path";
import { GraduationCap, Sparkles } from "lucide-react";
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
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Animated aurora background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="aurora-blob absolute -left-20 -top-24 size-[28rem] rounded-full bg-primary/20 blur-[100px]" />
        <div
          className="aurora-blob absolute -right-24 top-40 size-[26rem] rounded-full bg-accent/20 blur-[110px]"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 py-14 sm:px-8">
        {/* Hero */}
        <header className="animate-fade-up flex flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-primary" />
            ISTEC · Licenciatura em Engenharia Informática
          </span>

          <div className="flex items-start gap-4">
            <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:flex">
              <GraduationCap className="size-7" />
            </div>
            <div>
              <h1 className="text-pretty text-4xl font-bold tracking-tight sm:text-5xl">
                Os meus <span className="text-primary">conteúdos</span> do curso
              </h1>
              <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
                Todos os trabalhos, estudos e projetos de cada UC feitos por mim — slides, apontamentos e
                material de aprendizagem do ISTEC, organizados num explorador de ficheiros interativo.
              </p>
            </div>
          </div>
        </header>

        {/* Interactive explorer */}
        <FileExplorer tree={rootTree} />

        <footer className="mt-4 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          Feito com dedicação · Engenharia Informática · ISTEC
        </footer>
      </main>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Folder,
  FolderOpen,
  ChevronRight,
  FileText,
  FileImage,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  File as FileIcon,
  ExternalLink,
  X,
} from "lucide-react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export interface TreeNode {
  name: string;
  pathSegments: string[];
  isDirectory: boolean;
  fileCount?: number;
  children?: TreeNode[];
}

interface SubjectMeta {
  label: string;
  description: string;
}

const SUBJECTS: Record<string, SubjectMeta> = {
  ESTAD: { label: "Estatística", description: "Distribuições, regressão e medidas" },
  HCT: { label: "História da C. e Tecnologia", description: "Cenários, livros e artigos" },
  ICC: { label: "Intro. às Ciências da Comp.", description: "Algoritmia e casos de uso" },
  "MAT-I": { label: "Matemática I", description: "Vetores, matrizes e lógica" },
  "MAT-II": { label: "Matemática II", description: "Integrais, funções e análise" },
  "P-II": { label: "Programação II", description: "UMLs, programas e exames" },
  "RC-II": { label: "Redes de Comput. II", description: "OSPF, ACLs e práticas" },
  projetos: { label: "Projetos", description: "Trabalhos e projetos pessoais" },
};

const PROJECT_REPOS: Record<string, { repoUrl: string }> = {
  "andante-sys": { repoUrl: "https://github.com/tskxz/andante-sys" },
  "hct-web": { repoUrl: "https://github.com/tskxz/hct-web" },
  matrix: { repoUrl: "https://github.com/tskxz/matrix" },
};

function fileHref(pathSegments: string[]) {
  return `/files/${pathSegments.map(encodeURIComponent).join("/")}`;
}

function getExt(name: string) {
  const idx = name.lastIndexOf(".");
  return idx === -1 ? "" : name.slice(idx + 1).toLowerCase();
}

function FileTypeIcon({ name, className }: { name: string; className?: string }) {
  const ext = getExt(name);
  if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(ext)) return <FileImage className={className} />;
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return <FileArchive className={className} />;
  if (["cs", "js", "ts", "py", "java", "json", "html", "xml", "css"].includes(ext)) return <FileCode className={className} />;
  if (["xlsx", "xls", "csv"].includes(ext)) return <FileSpreadsheet className={className} />;
  if (["pdf", "docx", "doc", "txt", "md", "pptx"].includes(ext)) return <FileText className={className} />;
  return <FileIcon className={className} />;
}

/* Recursively filter tree by query, keeping directories that contain matches */
function filterTree(node: TreeNode, query: string): TreeNode | null {
  if (!query) return node;
  const q = query.toLowerCase();
  if (!node.isDirectory) {
    return node.name.toLowerCase().includes(q) ? node : null;
  }
  const matchedChildren = (node.children ?? [])
    .map((c) => filterTree(c, query))
    .filter(Boolean) as TreeNode[];
  if (matchedChildren.length > 0 || node.name.toLowerCase().includes(q)) {
    return { ...node, children: matchedChildren };
  }
  return null;
}

function TreeItem({
  node,
  depth,
  forceOpen,
  hideTree = false,
}: {
  node: TreeNode;
  depth: number;
  forceOpen: boolean;
  hideTree?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const isOpen = forceOpen || hideTree || open;
  const projectRepo = PROJECT_REPOS[node.name];

  if (!node.isDirectory) {
    return (
      <a
        href={fileHref(node.pathSegments)}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
        style={{ paddingLeft: `${depth * 14 + 10}px` }}
        title="Abrir em nova aba"
      >
        <FileTypeIcon name={node.name} className={`size-4 shrink-0 text-muted-foreground group-hover:text-primary ${hideTree ? "hidden" : ""}`} />
        <span className="truncate">{node.name}</span>
        <ExternalLink className="ml-auto size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
      </a>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
        style={{ paddingLeft: `${depth * 14 + 6}px` }}
        aria-expanded={isOpen}
      >
        {!hideTree && (
          <ChevronRight
            className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          />
        )}
        {!hideTree && (
          isOpen ? (
            <FolderOpen className="size-4 shrink-0 text-primary" />
          ) : (
            <Folder className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
          )
        )}
        <span className="truncate">{node.name}</span>
        {projectRepo && (
          <a
            href={projectRepo.repoUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ml-auto flex items-center rounded border border-border bg-muted p-1 text-muted-foreground transition-colors hover:text-foreground"
            title={`Abrir repositório ${node.name} no GitHub`}
          >
            <GitHubIcon className="size-4" />
          </a>
        )}
      </button>
      {isOpen && node.children && node.children.length > 0 && (
        <div className={`animate-reveal ${hideTree ? "" : "border-l border-border/60"}`} style={{ marginLeft: hideTree ? undefined : `${depth * 14 + 13}px` }}>
          {node.children.map((child) => (
            <TreeItem
              key={child.pathSegments.join("/")}
              node={child}
              depth={depth + 1}
              forceOpen={forceOpen}
              hideTree={hideTree}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer({ tree }: { tree: TreeNode }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const subjects = tree.children ?? [];

  const visibleSubjects = useMemo(() => {
    const base = active ? subjects.filter((s) => s.name === active) : subjects;
    if (!query) return base;
    return base
      .map((s) => filterTree(s, query))
      .filter(Boolean) as TreeNode[];
  }, [subjects, active, query]);

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar ficheiros ou pastas..."
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Limpar pesquisa"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Subject filter chips */}
      <div className="flex flex-wrap gap-2">
        <FilterChip label="Todas" activeState={active === null} onClick={() => setActive(null)} />
        {subjects.map((s) => {
          const meta = SUBJECTS[s.name];
          return (
            <FilterChip
              key={s.name}
              label={meta?.label ?? s.name}
              activeState={active === s.name}
              onClick={() => setActive((cur) => (cur === s.name ? null : s.name))}
            />
          );
        })}
      </div>

      {/* Subject cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {visibleSubjects.length === 0 && (
          <div className="col-span-full rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
            Nenhum resultado para <span className="text-foreground">&quot;{query}&quot;</span>.
          </div>
        )}
        {visibleSubjects.map((subject, i) => {
          const meta = SUBJECTS[subject.name];
          return (
            <section
              key={subject.name}
              className="animate-fade-up flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-muted-foreground/30"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <header className="mb-4 flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/60 text-primary">
                  <Folder className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-base font-semibold text-foreground">{meta?.label ?? subject.name}</h2>
                    <span className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {subject.name}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{meta?.description ?? "Conteúdos"}</p>
                </div>
              </header>

              <div className="max-h-[108px] overflow-y-auto pr-1">
                {subject.children && subject.children.length > 0 ? (
                  subject.children.map((child) => (
                    <TreeItem
                      key={child.pathSegments.join("/")}
                      node={child}
                      depth={0}
                      forceOpen={Boolean(query)}
                      hideTree={subject.name === "projetos"}
                    />
                  ))
                ) : (
                  <p className="px-2 py-4 text-xs text-muted-foreground">Sem conteúdos ainda.</p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  activeState,
  onClick,
}: {
  label: string;
  activeState: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-1 text-xs font-medium transition-colors ${
        activeState
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}


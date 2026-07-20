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
  Layers,
} from "lucide-react";

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
  color: string; // hsl string for accent
}

const SUBJECTS: Record<string, SubjectMeta> = {
  ESTAD: { label: "Estatística", description: "Distribuições, regressão e medidas", color: "168 76% 55%" },
  HCT: { label: "História da C. e Tecnologia", description: "Cenários, livros e artigos", color: "35 92% 60%" },
  ICC: { label: "Intro. às Ciências da Comp.", description: "Algoritmia e casos de uso", color: "199 89% 60%" },
  "MAT-I": { label: "Matemática I", description: "Vetores, matrizes e lógica", color: "265 85% 68%" },
  "MAT-II": { label: "Matemática II", description: "Integrais, funções e análise", color: "322 82% 63%" },
  "P-II": { label: "Programação II", description: "UMLs, programas e exames", color: "150 72% 52%" },
  "RC-II": { label: "Redes de Comput. II", description: "OSPF, ACLs e práticas", color: "217 91% 65%" },
  projetos: { label: "Projetos", description: "Trabalhos e projetos pessoais", color: "12 88% 62%" },
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

function countFiles(node: TreeNode): number {
  if (!node.isDirectory) return 1;
  if (!node.children) return 0;
  return node.children.reduce((acc, c) => acc + countFiles(c), 0);
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
}: {
  node: TreeNode;
  depth: number;
  forceOpen: boolean;
}) {
  const [open, setOpen] = useState(depth < 1);
  const isOpen = forceOpen || open;

  if (!node.isDirectory) {
    return (
      <a
        href={fileHref(node.pathSegments)}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        style={{ paddingLeft: `${depth * 14 + 10}px` }}
        title="Abrir em nova aba"
      >
        <FileTypeIcon name={node.name} className="size-4 shrink-0 text-primary/70 group-hover:text-primary" />
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
        className="group flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
        style={{ paddingLeft: `${depth * 14 + 6}px` }}
        aria-expanded={isOpen}
      >
        <ChevronRight
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
        />
        {isOpen ? (
          <FolderOpen className="size-4 shrink-0 text-primary" />
        ) : (
          <Folder className="size-4 shrink-0 text-primary/80" />
        )}
        <span className="truncate">{node.name}</span>
        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[11px] font-normal text-muted-foreground group-hover:bg-background">
          {countFiles(node)}
        </span>
      </button>
      {isOpen && node.children && node.children.length > 0 && (
        <div className="animate-reveal border-l border-border" style={{ marginLeft: `${depth * 14 + 13}px` }}>
          {node.children.map((child) => (
            <TreeItem
              key={child.pathSegments.join("/")}
              node={child}
              depth={depth + 1}
              forceOpen={forceOpen}
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
  const totalFiles = useMemo(() => countFiles(tree), [tree]);

  const visibleSubjects = useMemo(() => {
    const base = active ? subjects.filter((s) => s.name === active) : subjects;
    if (!query) return base;
    return base
      .map((s) => filterTree(s, query))
      .filter(Boolean) as TreeNode[];
  }, [subjects, active, query]);

  return (
    <div className="flex flex-col gap-8">
      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={<Layers className="size-4" />} label="Disciplinas" value={subjects.length} />
        <StatCard icon={<Folder className="size-4" />} label="Total ficheiros" value={totalFiles} />
        <StatCard icon={<FileText className="size-4" />} label="Curso" value="LEI" />
        <StatCard icon={<FileCode className="size-4" />} label="Instituição" value="ISTEC" />
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar ficheiros ou pastas..."
          className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
              color={meta?.color}
              activeState={active === s.name}
              onClick={() => setActive((cur) => (cur === s.name ? null : s.name))}
            />
          );
        })}
      </div>

      {/* Subject cards */}
      <div className="grid gap-5 lg:grid-cols-2">
        {visibleSubjects.length === 0 && (
          <div className="col-span-full rounded-lg border border-border bg-card p-10 text-center text-muted-foreground">
            Nenhum resultado para <span className="text-foreground">&quot;{query}&quot;</span>.
          </div>
        )}
        {visibleSubjects.map((subject, i) => {
          const meta = SUBJECTS[subject.name];
          const color = meta?.color ?? "199 89% 60%";
          return (
            <section
              key={subject.name}
              className="animate-fade-up group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-[hsl(var(--c)/0.5)]"
              style={{ ["--c" as string]: color, animationDelay: `${i * 60}ms` }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                style={{ background: `hsl(${color})` }}
                aria-hidden
              />
              <header className="mb-4 flex items-start gap-3">
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl text-[hsl(var(--c))]"
                  style={{ background: `hsl(${color} / 0.14)` }}
                >
                  <Folder className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-lg font-semibold text-foreground">{meta?.label ?? subject.name}</h2>
                    <span
                      className="rounded-md px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[hsl(var(--c))]"
                      style={{ background: `hsl(${color} / 0.12)` }}
                    >
                      {subject.name}
                    </span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{meta?.description ?? "Conteúdos"}</p>
                </div>
                <span className="ml-auto shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                  {countFiles(subject)} ficheiros
                </span>
              </header>

              <div className="max-h-80 overflow-y-auto pr-1">
                {subject.children && subject.children.length > 0 ? (
                  subject.children.map((child) => (
                    <TreeItem
                      key={child.pathSegments.join("/")}
                      node={child}
                      depth={0}
                      forceOpen={Boolean(query)}
                    />
                  ))
                ) : (
                  <p className="px-2.5 py-4 text-sm text-muted-foreground">Sem conteúdos ainda.</p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>
      <div className="min-w-0">
        <div className="truncate text-lg font-semibold leading-tight text-foreground">{value}</div>
        <div className="truncate text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  color,
  activeState,
  onClick,
}: {
  label: string;
  color?: string;
  activeState: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
        activeState
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
      style={color && activeState ? { background: `hsl(${color})`, color: "#04121a" } : undefined}
    >
      {label}
    </button>
  );
}

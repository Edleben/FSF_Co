"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  CircleDashed,
  Clock3,
  Gauge,
  ListFilter,
  PauseCircle,
  RefreshCw,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  allTrackerFeatures,
  calculateProgress,
  projectSprints,
  trackerMeta,
  type FeatureStatus,
} from "@/lib/project-tracker-data";

type StatusFilter = FeatureStatus | "all";

const copy = {
  fr: {
    eyebrow: "Pilotage du développement",
    title: "Project Tracker FSF",
    subtitle: "Vue d'audit interactive des fonctionnalités, organisée par sprint et actualisée à partir du référentiel du projet.",
    global: "Progression globale",
    completed: "Terminées",
    inProgress: "En cours",
    deferred: "À revisiter",
    notStarted: "Non commencées",
    filters: "Filtres",
    allSprints: "Tous les sprints",
    allStatuses: "Tous les statuts",
    refresh: "Actualiser l'audit",
    checked: "Dernière vérification",
    autoPoll: "Recalcul automatique toutes les 60 secondes",
    feature: "feature",
    features: "features",
    evidence: "Preuve d'audit",
    criteria: "Critères d'acceptation",
    expandSprint: "Afficher les features du sprint",
    collapseSprint: "Masquer les features du sprint",
    noResult: "Aucune feature ne correspond aux filtres sélectionnés.",
    auditVersion: "Version d'audit",
    auditDate: "Audit de référence",
    priorities: { critical: "Critique", high: "Haute", medium: "Moyenne", low: "Basse" },
    statuses: { completed: "Terminée", "in-progress": "En cours", "not-started": "Non commencée", deferred: "À revisiter" },
  },
  en: {
    eyebrow: "Development governance",
    title: "FSF Project Tracker",
    subtitle: "Interactive feature audit organized by sprint and refreshed from the project baseline.",
    global: "Overall progress",
    completed: "Completed",
    inProgress: "In progress",
    deferred: "Deferred",
    notStarted: "Not started",
    filters: "Filters",
    allSprints: "All sprints",
    allStatuses: "All statuses",
    refresh: "Refresh audit",
    checked: "Last checked",
    autoPoll: "Automatic recalculation every 60 seconds",
    feature: "feature",
    features: "features",
    evidence: "Audit evidence",
    criteria: "Acceptance criteria",
    expandSprint: "Show sprint features",
    collapseSprint: "Hide sprint features",
    noResult: "No feature matches the selected filters.",
    auditVersion: "Audit version",
    auditDate: "Baseline audit",
    priorities: { critical: "Critical", high: "High", medium: "Medium", low: "Low" },
    statuses: { completed: "Completed", "in-progress": "In progress", "not-started": "Not started", deferred: "Deferred" },
  },
};

const statusStyles: Record<FeatureStatus, string> = {
  completed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  "in-progress": "border-amber-200 bg-amber-50 text-amber-800",
  "not-started": "border-slate-200 bg-slate-100 text-slate-700",
  deferred: "border-violet-200 bg-violet-50 text-violet-800",
};

const priorityStyles = {
  critical: "border-red-200 text-red-700",
  high: "border-orange-200 text-orange-700",
  medium: "border-blue-200 text-blue-700",
  low: "border-slate-200 text-slate-600",
};

function StatusIcon({ status }: { status: FeatureStatus }) {
  if (status === "completed") return <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />;
  if (status === "in-progress") return <Clock3 className="h-5 w-5 text-amber-600" aria-hidden="true" />;
  if (status === "deferred") return <PauseCircle className="h-5 w-5 text-violet-600" aria-hidden="true" />;
  return <CircleDashed className="h-5 w-5 text-slate-500" aria-hidden="true" />;
}

export default function ProjectTrackerPage() {
  const { language } = useLanguage();
  const labels = copy[language];
  const [sprintFilter, setSprintFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [expandedSprint, setExpandedSprint] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshAudit = () => {
    setIsRefreshing(true);
    setLastChecked(new Date());
    window.setTimeout(() => setIsRefreshing(false), 450);
  };

  useEffect(() => {
    setLastChecked(new Date());
    const pollingId = window.setInterval(() => setLastChecked(new Date()), 60_000);
    return () => window.clearInterval(pollingId);
  }, []);

  const summary = useMemo(() => ({
    progress: calculateProgress(allTrackerFeatures),
    completed: allTrackerFeatures.filter((feature) => feature.status === "completed").length,
    inProgress: allTrackerFeatures.filter((feature) => feature.status === "in-progress").length,
    deferred: allTrackerFeatures.filter((feature) => feature.status === "deferred").length,
    notStarted: allTrackerFeatures.filter((feature) => feature.status === "not-started").length,
  }), [lastChecked]);

  const visibleSprints = useMemo(() => projectSprints
    .filter((sprint) => sprintFilter === "all" || sprint.id === sprintFilter)
    .map((sprint) => ({
      ...sprint,
      features: sprint.features.filter((feature) => statusFilter === "all" || feature.status === statusFilter),
    }))
    .filter((sprint) => sprint.features.length > 0), [sprintFilter, statusFilter]);

  const dateFormatter = new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "medium",
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
              <Activity className="h-4 w-4" aria-hidden="true" />
              {labels.eyebrow}
            </div>
            <h1 className="font-headline text-4xl font-bold sm:text-5xl">{labels.title}</h1>
            <p className="mt-5 max-w-3xl text-lg text-primary-foreground/85">{labels.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/75">
              <span>{labels.auditVersion}: <strong className="text-primary-foreground">{trackerMeta.version}</strong></span>
              <span>{labels.auditDate}: <strong className="text-primary-foreground">{trackerMeta.auditDate}</strong></span>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <section aria-labelledby="progress-title" className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle id="progress-title" className="flex items-center gap-2 text-2xl text-primary">
                  <Gauge className="h-6 w-6" aria-hidden="true" /> {labels.global}
                </CardTitle>
                <span className="text-4xl font-bold tabular-nums text-primary">{summary.progress}%</span>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={summary.progress} aria-label={`${labels.global}: ${summary.progress}%`} className="h-5" />
              <p className="mt-3 text-sm text-muted-foreground">{trackerMeta.scoring}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Card><CardContent className="p-4"><CheckCircle2 className="mb-3 h-5 w-5 text-emerald-600" aria-hidden="true" /><div className="text-3xl font-bold tabular-nums">{summary.completed}</div><p className="text-sm text-muted-foreground">{labels.completed}</p></CardContent></Card>
            <Card><CardContent className="p-4"><Clock3 className="mb-3 h-5 w-5 text-amber-600" aria-hidden="true" /><div className="text-3xl font-bold tabular-nums">{summary.inProgress}</div><p className="text-sm text-muted-foreground">{labels.inProgress}</p></CardContent></Card>
            <Card><CardContent className="p-4"><PauseCircle className="mb-3 h-5 w-5 text-violet-600" aria-hidden="true" /><div className="text-3xl font-bold tabular-nums">{summary.deferred}</div><p className="text-sm text-muted-foreground">{labels.deferred}</p></CardContent></Card>
            <Card><CardContent className="p-4"><CircleDashed className="mb-3 h-5 w-5 text-slate-500" aria-hidden="true" /><div className="text-3xl font-bold tabular-nums">{summary.notStarted}</div><p className="text-sm text-muted-foreground">{labels.notStarted}</p></CardContent></Card>
          </div>
        </section>

        <section aria-labelledby="sprint-map-title">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 id="sprint-map-title" className="flex items-center gap-2 font-headline text-2xl font-semibold text-primary">
              <Target className="h-6 w-6" aria-hidden="true" /> Sprints
            </h2>
          </div>
          <div className="space-y-3">
            {projectSprints.map((sprint) => {
              const sprintProgress = calculateProgress(sprint.features);
              const isExpanded = expandedSprint === sprint.id;
              return (
                <article key={sprint.id} className={`overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow ${isExpanded ? "border-primary/50 shadow-md" : "hover:shadow-md"}`}>
                  <button
                    type="button"
                    onClick={() => setExpandedSprint(isExpanded ? null : sprint.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`${sprint.id}-features`}
                    className="w-full p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{sprint.title.split(" — ")[0]}</span>
                          <Badge variant="secondary">{sprint.horizon}</Badge>
                        </div>
                        <h3 className="mt-2 text-lg font-semibold text-primary sm:text-xl">{sprint.title.split(" — ")[1]}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{sprint.objective}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="text-2xl font-bold tabular-nums text-primary sm:text-3xl">{sprintProgress}%</span>
                        <ChevronDown className={`h-5 w-5 text-primary transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} aria-hidden="true" />
                      </div>
                    </div>
                    <Progress value={sprintProgress} className="mt-4 h-2.5" aria-label={`${sprint.title}: ${sprintProgress}%`} />
                    <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                      <span>{sprint.features.length} {sprint.features.length > 1 ? labels.features : labels.feature}</span>
                      <span className="font-medium text-primary">{isExpanded ? labels.collapseSprint : labels.expandSprint}</span>
                    </div>
                  </button>

                  <div
                    id={`${sprint.id}-features`}
                    aria-hidden={!isExpanded}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t bg-muted/35 p-3 sm:p-5">
                        <ul className="space-y-3" aria-label={`${sprint.title} — ${labels.features}`}>
                          {sprint.features.map((feature) => (
                            <li key={feature.id} className="rounded-md border bg-card p-3 sm:p-4">
                              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex min-w-0 items-start gap-3">
                                  <StatusIcon status={feature.status} />
                                  <div className="min-w-0">
                                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                                  </div>
                                </div>
                                <div className="flex shrink-0 flex-wrap items-center gap-2 pl-8 sm:pl-0">
                                  <Badge variant="outline" className={statusStyles[feature.status]}>{labels.statuses[feature.status]}</Badge>
                                  <Badge variant="outline" className={priorityStyles[feature.priority]}>{labels.priorities[feature.priority]}</Badge>
                                  <span className="min-w-12 text-right text-lg font-bold tabular-nums text-primary">{feature.progress}%</span>
                                </div>
                              </div>
                              <Progress value={feature.progress} className="mt-3 h-2" aria-label={`${feature.title}: ${feature.progress}%`} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="filters-title" className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 id="filters-title" className="mb-3 flex items-center gap-2 font-semibold text-primary"><ListFilter className="h-5 w-5" aria-hidden="true" />{labels.filters}</h2>
                <Select value={sprintFilter} onValueChange={setSprintFilter}>
                  <SelectTrigger className="w-full sm:w-[240px]" aria-label={labels.allSprints}><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{labels.allSprints}</SelectItem>
                    {projectSprints.map((sprint) => <SelectItem key={sprint.id} value={sprint.id}>{sprint.title.split(" — ")[0]}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                <SelectTrigger className="w-full sm:w-[220px]" aria-label={labels.allStatuses}><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{labels.allStatuses}</SelectItem>
                  <SelectItem value="completed">{labels.statuses.completed}</SelectItem>
                  <SelectItem value="in-progress">{labels.statuses["in-progress"]}</SelectItem>
                  <SelectItem value="deferred">{labels.statuses.deferred}</SelectItem>
                  <SelectItem value="not-started">{labels.statuses["not-started"]}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="text-xs text-muted-foreground">
                <div>{labels.checked}: {lastChecked ? dateFormatter.format(lastChecked) : "—"}</div>
                <div>{labels.autoPoll}</div>
              </div>
              <Button type="button" variant="outline" onClick={refreshAudit} disabled={isRefreshing} className="gap-2">
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} aria-hidden="true" /> {labels.refresh}
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-7" aria-live="polite">
          {visibleSprints.length === 0 && (
            <Card><CardContent className="flex items-center gap-3 p-8 text-muted-foreground"><AlertTriangle className="h-5 w-5" aria-hidden="true" />{labels.noResult}</CardContent></Card>
          )}
          {visibleSprints.map((sprint) => {
            const fullSprint = projectSprints.find((item) => item.id === sprint.id)!;
            const sprintProgress = calculateProgress(fullSprint.features);
            return (
              <article key={sprint.id} className="space-y-4">
                <header className="flex flex-col gap-4 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2"><Badge variant="secondary">{sprint.horizon}</Badge><span className="text-sm text-muted-foreground">{fullSprint.features.length} {labels.features}</span></div>
                    <h2 className="font-headline text-2xl font-semibold text-primary">{sprint.title}</h2>
                    <p className="mt-1 text-foreground/75">{sprint.objective}</p>
                  </div>
                  <div className="min-w-[180px]">
                    <div className="mb-2 flex justify-between text-sm"><span>{labels.global}</span><strong>{sprintProgress}%</strong></div>
                    <Progress value={sprintProgress} className="h-3" aria-label={`${sprint.title}: ${sprintProgress}%`} />
                  </div>
                </header>

                <div className="grid gap-4 lg:grid-cols-2">
                  {sprint.features.map((feature) => (
                    <Card key={feature.id} className="overflow-hidden shadow-sm">
                      <div className="h-1.5 bg-secondary"><div className="h-full bg-primary transition-[width] duration-500" style={{ width: `${feature.progress}%` }} /></div>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex min-w-0 items-start gap-3">
                            <StatusIcon status={feature.status} />
                            <div>
                              <CardTitle className="text-lg leading-snug text-primary">{feature.title}</CardTitle>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                            </div>
                          </div>
                          <span className="shrink-0 text-2xl font-bold tabular-nums text-primary">{feature.progress}%</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge variant="outline" className={statusStyles[feature.status]}>{labels.statuses[feature.status]}</Badge>
                          <Badge variant="outline" className={priorityStyles[feature.priority]}>{labels.priorities[feature.priority]}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <details className="group border-t pt-4">
                          <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-foreground">
                            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />{labels.evidence}</span>
                            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                          </summary>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.evidence}</p>
                          <h3 className="mt-4 text-sm font-semibold">{labels.criteria}</h3>
                          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                            {feature.acceptanceCriteria.map((criterion) => <li key={criterion} className="flex gap-2"><span aria-hidden="true">•</span><span>{criterion}</span></li>)}
                          </ul>
                        </details>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}

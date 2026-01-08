"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessagesContainer } from "@/components/admin/projects/chat-panel/messages-container"
import { Suspense, useState } from "react"
import { ProjectHeader } from "./project-header"
import { FragmentWeb } from "@/components/admin/projects/project-panel/preview-tab/fragment-web"
import { CodeIcon, CrownIcon, DownloadIcon, EyeIcon, Rocket, Server, ShareIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileExplorer } from "@/components/admin/projects/project-panel/code-tab/file-explorer"
import { BackendLayout } from "@/components/admin/projects/project-panel/backend-tab/backend-layout"
import { HealthPanel } from "@/components/admin/projects/project-panel/backend-tab/health/health-panel"
import { LogsPanel } from "@/components/admin/projects/project-panel/backend-tab/logs/logs-panel"
import { DatabasePanel } from "@/components/admin/projects/project-panel/backend-tab/database/database-panel"

// Minimal local fragment type for demo UI (no Prisma dependency)
type Fragment = {
  id: string
  title?: string
  sandboxUrl?: string
  files?: { [path: string]: string }
}

interface Props {
  projectId: string
}

export const ProjectView = ({ projectId }: Props) => {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null)
  const [tabsState, setTabState] = useState<"preview" | "code" | "backend">(
    "preview",
  )
  const [backendView, setBackendView] = useState<"health" | "database" | "logs">("health")

  return (
    <div className="h-full flex flex-col min-h-0">
      <ResizablePanelGroup direction="horizontal" className="flex-1 min-h-0">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <Suspense fallback={<p>Loading project...</p>}>
            <ProjectHeader projectName={`Project ${projectId}`} />
          </Suspense>
          <Suspense fallback={<p>Loading messages...</p>}>
            <MessagesContainer
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
        </ResizablePanel>

        <ResizableHandle className="hover:bg-primary transition-colors" />

        <ResizablePanel
          defaultSize={65}
          minSize={50}
          className="flex flex-col min-h-0"
        >
          <Tabs
            className="flex flex-col h-full gap-y-0"
            defaultValue="preview"
            value={tabsState}
            onValueChange={(value) => setTabState(value as "preview" | "code")}
          >
            <div className="w-full flex items-center p-2 border-b gap-x-2">
              <TabsList className="h-8 p-0 rounded-md">
                <TabsTrigger value="code" className="rounded-md">
                  <span className="flex items-center gap-x-1">
                    <CodeIcon className="h-4 w-4" /> Code
                  </span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="rounded-md">
                  <span className="flex items-center gap-x-1">
                    <EyeIcon className="h-4 w-4" />
                    Preview
                  </span>
                </TabsTrigger>
                <TabsTrigger value="backend" className="rounded-md">
                  <span className="flex items-center gap-x-1">
                    <Server className="h-4 w-4" />
                    Backend
                  </span>
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center-center gap-x-2">
                <Button variant="outline" size="sm">
                  <ShareIcon className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <DownloadIcon className="h-4 w-4" />
                  Download Code
                </Button>
                <Button variant="outline" size="sm">
                  <Rocket className="h-4 w-4" />
                  Deploy
                </Button>
                <Button asChild size="sm">
                  <Link href="/pricing">
                    <CrownIcon />
                    Upgrade
                  </Link>
                </Button>
              </div>
            </div>

            {/* Code Tab */
            }
            <TabsContent value="code" className="flex-1 min-h-0">
              {!!activeFragment?.files && (
                <FileExplorer
                  files={activeFragment.files as { [path: string]: string }}
                />
              )}
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent
              value="preview"
              className="flex-1 min-h-0 p-0"
            >
              {!!activeFragment && <FragmentWeb data={activeFragment} />}
            </TabsContent>

            {/* Backend Tab */}
            <TabsContent value="backend" className="flex-1 min-h-0 p-0">
              <BackendLayout
                activeView={backendView}
                onChangeView={setBackendView}
              >
                {backendView === "health" && <HealthPanel />}
                {backendView === "database" && <DatabasePanel />}
                {backendView === "logs" && <LogsPanel />}
              </BackendLayout>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}


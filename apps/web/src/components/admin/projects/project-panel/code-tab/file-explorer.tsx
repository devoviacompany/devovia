import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState, useMemo, useCallback, Fragment } from "react";

import { Hint } from "../hint"
import { Button } from "@/components/ui/button"
import { CodeView } from "./code-view"
import { CodeTerminal } from "./terminal/code-terminal"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbList
} from "@/components/ui/breadcrumb"
import { convertFilesToTreeItems } from "@/utils/functions";
import { FilesTreeView } from "./files-tree-view";

type FileCollection = { [path: string]: string };

function getLanguageFromExtension(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "ts":
    case "tsx":
      return "tsx"; // Prism tsx (requires typescript/jsx in your bundle)
    case "js":
    case "jsx":
      return "javascript";
    case "json":
      return "json";
    case "css":
    case "scss":
    case "sass":
      return "css";
    case "html":
    case "htm":
      return "markup"; // Prism's HTML language id
    case "md":
    case "markdown":
      return "markdown";
    case "yml":
    case "yaml":
      return "yaml";
    case "sh":
    case "bash":
      return "bash";
    case "py":
      return "python";
    case "go":
      return "go";
    case "rb":
      return "ruby";
    case "php":
      return "php";
    default:
      return extension || "text";
  }
}

interface FileBreadcrumbProps {
  filePath: string
}

const FileBreadcrumb = ({ filePath }: FileBreadcrumbProps) => {
  const maxSegments = 4;
  const pathSegments = filePath.split('/')

  const renderBreadcrumbItems = () => {

    if (pathSegments.length <= maxSegments) {
      return pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        return (
          <Fragment key={index}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage className="font-medium">
                  {segment}
                </BreadcrumbPage>
              ) : (
                <span className="text-muted-foreground">
                  {segment}
                </span>
              )
              }
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator />}
          </Fragment>
        )
      })
    } else {
      const firstSegment = pathSegments[0];
      const lastSegment = pathSegments[pathSegments.length - 1];

      return (
        <>
          <BreadcrumbItem>
            <span className="text-muted-foreground">
              {firstSegment}
            </span>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">
                {lastSegment}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbItem>
        </>
      )
    }
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {renderBreadcrumbItems()}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

interface FileExplorerProps {
  files: FileCollection;
};;

export const FileExplorer = ({
  files
}: FileExplorerProps) => {

  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(() => {
    const fileKeys = Object.keys(files);
    const [firstFile] = fileKeys;
    return firstFile ?? null;
  });

  const treeData = useMemo(() => {
    return convertFilesToTreeItems(files)
  }, [files])

  const handleFileSelect = useCallback((
    filePath: string
  ) => {
    if (files[filePath]) {
      setSelectedFile(filePath)
    }
  }, [files])
  const handleCopy = useCallback(() => {
    if (selectedFile) {
      navigator.clipboard.writeText(files[selectedFile]!);
      setCopied(true);
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [selectedFile, files])
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={30}
        minSize={30}
        className="w-60 bg-sidebar border-r flex flex-col min-h-0">
        <div className="flex-1 min-h-0 overflow-auto">
          <FilesTreeView
            data={treeData}
            value={selectedFile}
            onSelect={handleFileSelect}
          />
        </div>
      </ResizablePanel>

      <ResizableHandle className="hover:bg-primary transition-colors" />

      <ResizablePanel defaultSize={70} minSize={50}>
        {selectedFile && files[selectedFile] ? (
          <div className="h-full w-full flex flex-col">
            <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2">
              <FileBreadcrumb filePath={selectedFile} />
              <Hint text="Copy to clipboard" side="bottom">
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto"
                  onClick={handleCopy}
                  disabled={copied}
                >
                  {copied ? <CopyCheckIcon /> : <CopyIcon />}
                </Button>
              </Hint>
            </div>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70} minSize={40}>
                <div className="h-full flex-1 overflow-auto">
                  <CodeView
                    code={files[selectedFile]}
                    lang={getLanguageFromExtension(selectedFile)}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle className="hover:bg-primary transition-colors" />
              <ResizablePanel defaultSize={30} minSize={20}>
                <CodeTerminal />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Select a file to view it&apos;s content
          </div>
        )
        }
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
import Link from "next/link";
import toolsData from "../../data/ecosystem-tools.json";
import { ExternalLink } from "lucide-react";

interface RelatedToolsWidgetProps {
  currentToolId: string;
}

export function RelatedToolsWidget({ currentToolId }: RelatedToolsWidgetProps) {
  // Find current tool to get its tags
  const currentTool = toolsData.find((t) => t.id === currentToolId);
  const currentTags = currentTool?.tags || [];

  // Filter tools: not the current tool, and shares at least one tag
  let relatedTools = toolsData.filter(
    (t) =>
      t.id !== currentToolId && t.tags.some((tag) => currentTags.includes(tag))
  );

  // Fallback: If no related tools, just show newest tools
  if (relatedTools.length === 0) {
    relatedTools = toolsData
      .filter((t) => t.id !== currentToolId)
      .sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime());
  }

  // Limit to 4 cards
  const displayTools = relatedTools.slice(0, 4);

  return (
    <section className="py-16 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold mb-8">Related Tools from alfo.online</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayTools.map((tool) => (
            <Link key={tool.id} href={tool.url} target="_blank" className="group">
              <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-lg">{tool.name}</h4>
                  <ExternalLink className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200" />
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm flex-grow mb-4">
                  {tool.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

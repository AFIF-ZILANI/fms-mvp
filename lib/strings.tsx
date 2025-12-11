import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipCreator({ text }: { text?: string }) {
  const shortId = (id: string) => id.slice(0, 14) + "...";
  if (text) {
    if (text.length < 14){
      return text
    }
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-muted-foreground cursor-pointer">
              {shortId(text)}
            </div>
          </TooltipTrigger>
          <TooltipContent>{text}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
}

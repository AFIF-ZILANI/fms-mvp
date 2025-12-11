import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChartEmptyState({
  message = "No data available",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center border border-dashed rounded-xl bg-muted/30">
      <AlertTriangle className="h-10 w-10 text-muted-foreground mb-3" />

      <h3 className="text-lg font-semibold text-foreground">{message}</h3>

      <p className="text-sm text-muted-foreground mt-1 max-w-xs">
        There is not enough data to generate this chart right now.
      </p>

      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          className="mt-4"
          onClick={onRetry}
        >
          Retry
        </Button>
      )}
    </div>
  );
}

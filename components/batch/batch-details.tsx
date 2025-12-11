import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TooltipCreator } from "@/lib/strings";
import { ProfileBatchDetailsProps } from "@/types";

export default function BatchDetails({ data }: ProfileBatchDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Batch Information</CardTitle>
        <CardDescription>Overview of the current batch details</CardDescription>
      </CardHeader>

      <CardContent>
        <div
          className="
        grid 
        grid-cols-1 
        md:grid-cols-3 
        gap-6 
        md:divide-x
        divide-border
      "
        >
          {/* --- Column 1 --- */}
          <div className="px-0 md:px-4">
            <div className="grid grid-cols-2 gap-y-3">
              <div className="font-medium">Batch ID</div>
              {data.batchId && <TooltipCreator text={data.batchId} />}
              <div className="font-medium">Status</div>
              <div className="text-muted-foreground">{data.status}</div>

              <div className="font-medium">Age</div>
              <div className="text-muted-foreground">{data.age} Days</div>

              <div className="font-medium">Breed</div>
              <div className="text-muted-foreground">{data.breed}</div>

              <div className="font-medium">House No</div>
              <div className="text-muted-foreground">{data.houseNo}</div>
            </div>
          </div>

          {/* --- Column 2 --- */}
          <div className="px-0 md:px-4">
            <div className="grid grid-cols-2 gap-y-3">
              <div className="font-medium">Initial Quantity</div>
              <div className="text-muted-foreground">
                {data.initialQuantity.toLocaleString("en-US")} Birds
              </div>

              <div className="font-medium">Batch Start</div>
              <div className="text-muted-foreground">{data.batchStart}</div>

              <div className="font-medium">Expected Sell</div>
              <div className="text-muted-foreground">{data.expectedSell}</div>

              <div className="font-medium">Supplier</div>
              <div className="text-muted-foreground">
                <div className="flex flex-col">
                  {data.supplier.map((sup, index) => (
                    <div key={index}>
                      <TooltipCreator text={sup} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- Column 3 --- */}
          <div className="px-0 md:px-4">
            <div className="grid grid-cols-2 gap-y-3">
              <div className="font-medium">Time to Sell</div>
              <div className="text-muted-foreground">
                {data.daysToSell} Days ± (5 day)
              </div>
              <div className="font-medium">Mortality 24H</div>
              <div className="text-muted-foreground">
                {data.mortality24H ? data.mortality24H : "Not Recorded"}
              </div>

              <div className="font-medium">Mortality 48H</div>
              <div className="text-muted-foreground">
                {data.mortality48H ? data.mortality48H : "Not Recorded"}
              </div>

              <div className="font-medium">Mortality 72H</div>
              <div className="text-muted-foreground">
                {data.mortality72H ? data.mortality72H : "Not Recorded"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

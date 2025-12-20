import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatDateInBritish } from "@/lib/date-time";
import { TooltipCreator } from "@/lib/strings";
import { ProfileBatchDetailsProps } from "@/types";

export default function BatchDetails({
    batchId,
    batchStart,
    breed,
    mortality24H,
    mortality48H,
    mortality72H,
    supplier,
    daysToSell,
    expectedSell,
    initialQuantity,
    age,
    phase,
}: ProfileBatchDetailsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Batch Information</CardTitle>
                <CardDescription>
                    Overview of the current batch details
                </CardDescription>
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
                            {batchId && <TooltipCreator text={batchId} />}
                            <div className="font-medium">Status</div>
                            <div className="text-muted-foreground">{phase}</div>

                            <div className="font-medium">Age</div>
                            <div className="text-muted-foreground">
                                {age} Days
                            </div>

                            <div className="font-medium">Breed</div>
                            <div className="text-muted-foreground">{breed}</div>
                        </div>
                    </div>

                    {/* --- Column 2 --- */}
                    <div className="px-0 md:px-4">
                        <div className="grid grid-cols-2 gap-y-3">
                            <div className="font-medium">Initial Quantity</div>
                            <div className="text-muted-foreground">
                                {initialQuantity.toLocaleString("en-US")} Birds
                            </div>

                            <div className="font-medium">Batch Start</div>
                            <div className="text-muted-foreground">
                                {formatDateInBritish(batchStart)}
                            </div>

                            <div className="font-medium">Expected Sell</div>
                            <div className="text-muted-foreground">
                                {formatDateInBritish(expectedSell)}
                            </div>

                            <div className="font-medium">Supplier</div>
                            <div className="text-muted-foreground">
                                <div className="flex flex-col">
                                    {supplier.map((sup, index) => (
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
                                {daysToSell} Days ± (5 day)
                            </div>
                            <div className="font-medium">Mortality 24H</div>
                            <div className="text-muted-foreground">
                                {mortality24H ? mortality24H : "Not Recorded"}
                            </div>

                            <div className="font-medium">Mortality 48H</div>
                            <div className="text-muted-foreground">
                                {mortality48H ? mortality48H : "Not Recorded"}
                            </div>

                            <div className="font-medium">Mortality 72H</div>
                            <div className="text-muted-foreground">
                                {mortality72H ? mortality72H : "Not Recorded"}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Connectsites({ names }: { names: string[] }) {
  return (
    <Card className="min-h-svh">
      <CardHeader className="p-10">
        <CardTitle className="text-center">
          Connect your Shops And Manage your inventory at one place
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-3">
          {names.map((name) => (
            <Card className="max-w-md flex bg-slate-100 border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>
                  Enter Your Credentials and connect with {name}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex justify-center items-center">
                <Button>Connect</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

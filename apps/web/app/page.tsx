import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <input type="text" placeholder="Enter your prompt" />
      <Button className="">Submit</Button>
    </div>
  );
}

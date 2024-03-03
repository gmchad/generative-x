import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "./ui/button";

export function Reply({replies}: {replies: Record<string, string>}) {
  return (
    <Card className="w-full max-w-sm bg-white">
    <CardHeader className="flex-col items-start">
        <CardTitle className="text-md text-black">✨ Suggested Replies ✨</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-1.5">
      <Carousel className="w-full max-w-xs">
        <CarouselContent className="overflow-visible">
          {Object.entries(replies).map(([id, reply]) => (
            <CarouselItem key={id}>
              <div className="grid gap-4 px-1.5">
                <div className="flex items-center">
                  <div className="text-lg text-black shadcn-accent-pill rounded-full">
                    {reply}
                  </div>
                  <Button/>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="max-w-sm"/>
        <CarouselNext className="max-w-sm"/>
      </Carousel>
  </CardContent>
  </Card>
  )
}

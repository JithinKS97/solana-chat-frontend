import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export const Chat = () => {
    return (
      <div className="flex flex-col gap-4 max-w-2xl mx-auto p-4">
        <Textarea 
          placeholder="Type your message..." 
          className="min-h-[100px] resize-none" 
        />
        <Button className="self-end">Send</Button>
      </div>
    )
  }
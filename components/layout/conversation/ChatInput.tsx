'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { api } from '@/convex/_generated/api'
import { useConversation } from '@/hooks/useConversation'
import { useMutationState } from '@/hooks/useMutationState'
import { zodResolver } from '@hookform/resolvers/zod'
import { ConvexError } from 'convex/values'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import TextareaAutoSize from 'react-textarea-autosize'
import { Button } from '@/components/ui/button'
import { SendHorizontal } from 'lucide-react'
import MessageActionPopover from './MessageActionPopover'
import { useTheme } from 'next-themes'
import EmojiPicker, { Theme } from 'emoji-picker-react'

const chatMessageSchema = z.object({
  content: z.string().min(1, {
    message: "This field can't be empty"
  })
})

const ChatInput = () => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const emojiPickerRef = React.useRef<any>(null);

  const [emojiPickerOpen, setEmojiPickerOpen] = React.useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = React.useState<number>(0);

  const { theme } = useTheme();
  const { conversationId } = useConversation();
  const { mutate: createMessage, pending } = useMutationState(api.message.create)

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: ''
    }
  });

  const content = form.watch('content', '')

  const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
    createMessage({
      conversationId,
      type: 'text',
      content: [values.content]
    }).then(() => {
      form.reset();
      textareaRef.current?.focus();
    }).catch((error) => {
      toast.error(error instanceof ConvexError
        ? error.data
        : 'Unexpected error occurred');
    })
  }

  const handleInputChange = (event: any) => {
    const { value, selectionStart } = event.target;

    if (selectionStart !== null) {
      form.setValue('content', value);
      setCursorPosition(selectionStart);
    }
  }

  const insertEmoji = (emoji: string) => {
    const newText = [
      content.substring(0, cursorPosition),
      emoji,
      content.substring(cursorPosition)
    ].join('');

    form.setValue('content', newText);
    setCursorPosition(cursorPosition + emoji.length);
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current
        && !emojiPickerRef.current
          .contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  return (
    <Card className='w-full p-2 rounded-lg relative'>
      <div ref={emojiPickerRef} className='absolute bottom-16'>
        <EmojiPicker
          open={emojiPickerOpen}
          theme={theme as Theme}
          onEmojiClick={(emojiDetails) => {
            insertEmoji(emojiDetails.emoji);
            setEmojiPickerOpen(false)
          }}
          lazyLoadEmojis
        />
      </div>
      <div className="flex gap-2 items-center w-full">
        <MessageActionPopover setEmojiPickerOpen={setEmojiPickerOpen} />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex gap-2 items-center w-full'
          >
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => {
                return <FormItem className='h-full w-full'>
                  <FormControl>
                    <TextareaAutoSize
                      rows={1}
                      maxRows={3}
                      placeholder="Type a message..."
                      className='min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5 '
                      {...field}
                      onKeyDown={async (e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();

                          await form.handleSubmit(handleSubmit)();
                        }
                      }}
                      onClick={handleInputChange}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }}
            />

            <Button disabled={pending} size={'icon'} type='submit'>
              <SendHorizontal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  )
}

export default ChatInput
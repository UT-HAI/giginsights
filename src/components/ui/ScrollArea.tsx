'use client'

import { useRef } from 'react';
import { ScrollArea, Stack, Group } from '@mantine/core';

export default function ScrollAreaButtons({ content }: { content: any }) {
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' });

  const scrollToTop = () => viewport.current!.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Stack align="center">
      <ScrollArea w={500} h={500} viewportRef={viewport}>
        {content}
      </ScrollArea>

      <Group justify="center">
        <button
          className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded`}
          onClick={scrollToTop}>Driver History Start
        </button>
        <button 
          className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded`}
          onClick={scrollToBottom}>Present Day
        </button>
      </Group>
    </Stack>
  );
}

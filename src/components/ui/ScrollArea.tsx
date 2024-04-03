'use client'

import { useRef } from 'react';
import { ScrollArea, Button, Stack, Group } from '@mantine/core';

export default function ScrollAreaButtons({content}: {content: any}) {
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' });

  const scrollToCenter = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight / 2, behavior: 'smooth' });

  const scrollToTop = () => viewport.current!.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Stack align="center">
      <ScrollArea w={500} h={500} viewportRef={viewport}>
        {content}
      </ScrollArea>

      <Group justify="center">
        <Button onClick={scrollToTop}>Driver History Start</Button>
        <Button onClick={scrollToBottom}>Present Day</Button>
      </Group>
    </Stack>
  );
}

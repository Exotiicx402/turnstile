import { useState, useEffect } from 'react';

export function useMarkdownLoader(filePath: string) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setLoading(true);
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load markdown: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setContent('');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [filePath]);

  return { content, loading, error };
}

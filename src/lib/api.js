export async function analyzeDocuments(files, onEvent) {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('documents', file);
  });

  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: formData,
  });

  await processStream(response, onEvent);
}

export async function analyzeDemoDocuments(onEvent) {
  const response = await fetch('/api/analyze-demo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  await processStream(response, onEvent);
}

async function processStream(response, onEvent) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split('\n\n');
    buffer = parts.pop();

    for (const part of parts) {
      if (part.startsWith('data: ')) {
        try {
          const jsonStr = part.slice(6);
          const event = JSON.parse(jsonStr);
          onEvent(event);
        } catch (e) {
          console.error('Error parsing SSE event:', e, part);
        }
      }
    }
  }
}

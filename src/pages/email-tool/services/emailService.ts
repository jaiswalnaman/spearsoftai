import { EmailConfig } from '../types';

const API_URL = 'https://sparrow-rapid-kingfish.ngrok-free.app';

export const sendEmails = async (
  config: EmailConfig & { main_email: string },
  onProgress: (sent: number) => void
): Promise<void> => {
  const response = await fetch(`${API_URL}/send_emails_AI`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: config.email,
      password: config.appPassword,
      provider: config.provider,
      type: config.provider,
      main_email: config.main_email
    }),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to send emails');
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response stream available');

  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.slice(5).trim();
          if (data === 'Campaign completed') {
            return;
          }
          if (data.startsWith('Emails sent:')) {
            const sent = parseInt(data.split(':')[1].trim());
            onProgress(sent);
          }
          if (data.startsWith('Error:')) {
            throw new Error(data.slice(7));
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
};
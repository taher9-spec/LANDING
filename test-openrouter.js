import fetch from 'node-fetch';

async function testOpenRouter() {
  const apiKey = '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';
  const url = 'https://openrouter.ai/api/v1/chat/completions';
  
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  const body = {
    model: 'meta-llama/llama-3-8b-instruct',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.'
      },
      {
        role: 'user',
        content: 'Hello, can you hear me?'
      }
    ]
  };

  try {
    console.log('Sending test request to OpenRouter...');
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (!response.ok) {
      console.error('Error:', data);
    }
    
  } catch (error) {
    console.error('Request failed:', error);
  }
}

testOpenRouter().catch(console.error);

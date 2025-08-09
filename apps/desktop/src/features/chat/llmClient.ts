<![CDATA[
/*
  LLM Adapter for MiiAIT
  - Uses environment variables: VITE_OPENAI_API_KEY, VITE_OPENAI_API_BASE
  - For models starting with "o" (e.g., "o3-mini"): calls /responses endpoint with {input, max_completion_tokens, temperature}
  - Otherwise calls /chat/completions with {messages, max_tokens, temperature}
  
  Changes:
    - Added try/catch block for fetch operations.
    - Validated response.ok and, if false, logs detailed error details.
    - Returns an error message string upon failure to help diagnose issues.
*/
export async function generate({ model, messages, maxTokens, temperature }) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  const apiBase = import.meta.env.VITE_OPENAI_API_BASE || process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  try {
    if (model.startsWith('o')) {
      // For o3-* models, using /responses endpoint
      // Use the content of the latest message as input
      const input = messages[messages.length - 1].content;
      const body = {
        input,
        max_completion_tokens: maxTokens,
        temperature
      };
      const response = await fetch(`${apiBase}/responses`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        const errDetail = await response.text();
        throw new Error(`Error ${response.status}: ${errDetail}`);
      }
      
      const data = await response.json();
      return (data.choices && data.choices[0].text) || 'No response received.';
    } else {
      // For gpt-* models, using /chat/completions endpoint
      const body = {
        messages,
        max_tokens: maxTokens,
        temperature
      };
      const response = await fetch(`${apiBase}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        const errDetail = await response.text();
        throw new Error(`Error ${response.status}: ${errDetail}`);
      }
      const data = await response.json();
      return (data.choices && data.choices[0].message?.content) || 'No response received.';
    }
  } catch (error) {
    console.error("Error in generate function:", error);
    return 'Error generating response.';
  }
}
]]>

<![CDATA[
# MiiAIT Desktop App

## Overview
This is the stable base for MiiAIT built with Electron, Vite, React, and TypeScript. It supports OpenAI o3-mini out of the box and can later switch to gpt-5 via environment configuration.

## Setup

1. Install dependencies:
   npm install --workspaces --include-workspace-root

2. Create a `.env` file in `apps/desktop` based on `.env.example`.

3. Run the development server:
   npm run dev:desktop

## Features

- **Chat Panel**: Send messages and receive responses via the LLM adapter. Use the "Speak" button to trigger text-to-speech via Aivis Speech.
- **Vision Panel**: Enumerates video devices, allows selection of "OBS Virtual Camera", and previews video with adjustable FPS (5, 7, or 10).
- **Settings Panel**: Configure system prompt, model (o3-mini or gpt-5), background color, aivisSpeechPreset, and FPS. Settings persist in localStorage.
- **Background Layer**: Applies the configured background color behind UI elements.

## Switching Models

To switch to gpt-5, update your `.env` file:
```
OPENAI_MODEL=gpt-5
```
No code changes are needed; the LLM adapter dynamically chooses the API endpoint based on the model.

## Environment Variables

- OPENAI_API_KEY: Your OpenAI API key.
- OPENAI_MODEL: Either `o3-mini` or `gpt-5`
- OPENAI_API_BASE: API base URL (default is https://api.openai.com/v1)
- AIVISSPEECH_ENDPOINT: Endpoint for Aivis Speech (e.g., http://localhost:50021)
- SUPABASE_URL: Your Supabase project URL.
- SUPABASE_ANON_KEY: Your Supabase anon key.
]]>

import { OpenAI } from 'openai-streams'

const testOpenAi = async () => {
  const stream = await OpenAI(
    'completions',
    {
      model: 'text-davinci-003',
      prompt: 'Write a two-sentence paragraph.\n\n',
      temperature: 1,
      max_tokens: 100,
      // apiKey: "abc123",
    },
  )

  return new Response(stream)
}
export { testOpenAi }

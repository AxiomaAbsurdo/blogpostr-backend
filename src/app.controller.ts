import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';

const OPENAI_API_KEY = '***** SUPER SECRET KEY HERE *****';
const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/completions';

@Controller()
export class AppController {
  @Post('/generate-blog')
  async generateBlog(
    @Body() body: { text: string; tone: string },
  ): Promise<string> {
    try {
      const { text, tone } = body;

      // Verify the connection with the OpenAI API
      const verifyResponse = await axios.get(OPENAI_API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (verifyResponse.status !== 200) {
        throw new Error('Failed to connect to the OpenAI API');
      }

      // Generate the blog post using the provided text and tone
      const generateResponse = await axios.post(
        OPENAI_API_ENDPOINT,
        {
          prompt: text,
          max_tokens: 100,
          temperature: 0.7,
          tone: tone,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return generateResponse.data.choices[0].text;
    } catch (error) {
      console.error('Failed to generate blog post:', error);
      throw new Error('Failed to generate blog post');
    }
  }
}

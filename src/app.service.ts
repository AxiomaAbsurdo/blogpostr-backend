import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class AppService {
  openai: OpenAIApi;
  configuration: Configuration;

  constructor() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  async generateBlog(body: { text: string; tone: string }) {
    try {
      const { text, tone } = body;
      const response = await this.openai.createCompletion({
        model: 'text-davinci-003',
        // prompt: 'Translate the following English text to Spanish: building',
        prompt: `Create a blog from this text: ${text} using this tone: ${tone}`,
        max_tokens: 100,
        temperature: 0.7,
      });
      // "[# ticket identifier] - [Comment]" or "[General comment]"
      console.log(
        '🚀 ~ file: openai.service.ts:35 ~ OpenaiService ~ generate ~ response:',
        response.data,
      );
      return response.data.choices[0].text;
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      throw new Error('Failed to generate blog post');
    }
  }
}

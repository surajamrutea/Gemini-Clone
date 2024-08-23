
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {GoogleGenerativeAI,HarmCategory,HarmBlockThreshold,}from"@google/generative-ai";
const API_KEY="AIzaSyAaXM4hmPV5qz2hhSQa15Ude6ldzOET7kk";
const MODEL_NAME="gemini-1.0-pro";
async function run(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
      });
      const generationConfig = {
        temperature: 0.9,
       // topk: 1,
        topP:1,
        maxOutputTokens: 2048,
        responseMimeType: "text/plain",
      };
      const safetySetting = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
      ];
    
    
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
   safetySetting,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    const response=result.response;
    console.log(response.text());
    return response.text();
  }

export default run;
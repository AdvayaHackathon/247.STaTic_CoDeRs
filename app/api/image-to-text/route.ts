import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.error('Missing API key for Google Generative AI');
    return NextResponse.json({ error: 'Server configuration error: Missing API key' }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    // Validate the uploaded image file
    if (!imageFile || !(imageFile instanceof File)) {
      console.error('Invalid or missing image file');
      return NextResponse.json({ error: 'Invalid or missing image file' }, { status: 400 });
    }

    // Read the file as an ArrayBuffer
    const buffer = await imageFile.arrayBuffer();

    // Create the image part in the format Gemini expects
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    
    const prompt = "Extract and return all the text content from this image. Return only the text, no additional commentary.";
    
    const imagePart = {
      inlineData: {
        data: Buffer.from(buffer).toString('base64'),
        mimeType: imageFile.type
      }
    };

    // Add detailed logging for API response
    try {
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        console.error('No text extracted from the image');
        throw new Error('No text was extracted from the image');
      }

      return NextResponse.json({ text });
    } catch (genError) {
      console.error('Gemini API Error:', genError);
      return NextResponse.json({ 
        error: 'Failed to process image with Gemini API. Please make sure the image is clear and contains text.' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to process image' 
    }, { status: 500 });
  }
}
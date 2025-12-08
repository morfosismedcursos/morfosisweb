import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey });

export const askEmbryoTutor = async (question: string): Promise<string> => {
  if (!apiKey) {
    return "Error: No se ha configurado la API Key. Por favor contacta al administrador.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: `Eres un experto profesor de Embriología Humana para el curso MORFOSIS. 
        Tu objetivo es ayudar a estudiantes a comprender conceptos complejos de forma sencilla, clara y didáctica.
        
        Reglas:
        1. Responde siempre en español.
        2. Sé preciso con la terminología médica pero explica los términos difíciles.
        3. Usa analogías cuando sea posible para facilitar la comprensión.
        4. Tus respuestas deben ser concisas (máximo 150 palabras) a menos que se requiera una explicación detallada.
        5. Si te preguntan algo fuera de la biología/medicina, responde amablemente que solo respondes dudas de la clase de Morfosis.
        `,
        temperature: 0.7,
      }
    });

    return response.text || "Lo siento, no pude generar una respuesta en este momento.";
  } catch (error) {
    console.error("Error asking Gemini:", error);
    return "Ocurrió un error al consultar al tutor virtual. Inténtalo de nuevo más tarde.";
  }
};
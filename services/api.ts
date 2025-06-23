// Types for API responses
export type AnalysisResponse = {
  mainClaim: string;
  supportingArguments: string[];
  structure: string;
  strength: string;
};

export type ValidationResponse = {
  isValid: boolean;
  analysis: string;
  explanation: string;
};

export type Fallacy = {
  type: string;
  description: string;
  location: string;
  explanation: string;
};

export type ChatResponse = {
  message: string;
  timestamp: Date;
};

// Base API URL - replace with your actual backend URL in production
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://api.example.com";

/**
 * Performs a complete analysis of argumentative text
 * @param text The text to analyze
 * @returns Analysis results
 */
export async function analyzeText(text: string): Promise<AnalysisResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing text:", error);
    throw error;
  }
}

/**
 * Validates the logical structure of an argument
 * @param text The argument text to validate
 * @returns Validation results
 */
export async function validateArgument(
  text: string,
): Promise<ValidationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error validating argument:", error);
    throw error;
  }
}

/**
 * Detects logical fallacies in a text
 * @param text The text to check for fallacies
 * @returns Array of detected fallacies
 */
export async function detectFallacies(text: string): Promise<Fallacy[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/fallacies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error detecting fallacies:", error);
    throw error;
  }
}

/**
 * Sends a message to the chat AI assistant
 * @param message The user message to send
 * @returns AI response message
 */
export async function sendChatMessage(message: string): Promise<ChatResponse> {
  try {
    // Simulate some delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Always throw an error as requested
    throw new Error(
      "Chat service is currently unavailable. Please try again later.",
    );
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
}

/**
 * Helper function to handle API errors
 * @param error The error object
 * @returns A user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
}

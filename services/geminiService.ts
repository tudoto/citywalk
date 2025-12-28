import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Coordinates, UserPreferences, WalkRoute } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const routeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "路线标题，类似小红书爆款标题" },
    totalDistanceKm: { type: Type.STRING, description: "总距离 (例如 '2.5 km')" },
    totalTimeMinutes: { type: Type.NUMBER, description: "总时长 (分钟)" },
    vibe: { type: Type.STRING, description: "路线氛围关键词" },
    stops: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          socialMediaTip: { type: Type.STRING, description: "拍照或体验贴士 (例如 '转角处的路牌最好拍')" },
          coordinates: {
            type: Type.OBJECT,
            properties: {
              latitude: { type: Type.NUMBER },
              longitude: { type: Type.NUMBER },
            },
            required: ["latitude", "longitude"]
          },
          estimatedTimeMinutes: { type: Type.NUMBER },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["id", "name", "description", "socialMediaTip", "coordinates", "estimatedTimeMinutes", "tags"]
      }
    }
  },
  required: ["title", "totalDistanceKm", "totalTimeMinutes", "vibe", "stops"]
};

export const generateCityWalkRoute = async (
  location: Coordinates,
  preferences: UserPreferences
): Promise<WalkRoute> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    我现在的位置: 纬度 ${location.latitude}, 经度 ${location.longitude}.
    
    请为我规划一条 "City Walk" 城市漫步路线。
    主题/氛围: ${preferences.theme}.
    时长偏好: ${preferences.duration}.
    
    要求：
    1. 路线应包含在社交媒体（小红书、抖音、Instagram）上热门的地点或隐藏的小众打卡点。
    2. 包含 3-5 个具体的停留点，地点之间需要适合步行。
    3. 每个地点请提供具体的“社交媒体打卡攻略”（比如怎么拍最好看，或者必点什么饮品）。
    4. 所有返回内容必须使用中文（简体）。
    5. 根据我的起始位置，模拟真实的附近地点坐标（步行距离内）。
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: routeSchema,
        systemInstruction: "你是一位精通城市探索的本地向导和社交媒体博主（小红书风格）。你知道所有隐藏的宝藏店铺、拍照神位和热门路线。请用中文回答。",
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as WalkRoute;
    } else {
      throw new Error("Empty response from AI");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
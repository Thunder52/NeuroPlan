import User from "../models/User.js";
import { GoogleGenAI } from "@google/genai";

// export const getSchedule = async (req, res) => {
//   const { goals, entertainment, preferredTime } = req.body;
//   try {
//     const userPreferences = await UserPreferences.findOne({
//       userId: req.user.id,
//     });
//     // if (!userPreferences) {
//     //     return res.status(404).json({ message: "User preferences not found" });
//     // }
//     const usedGoals = goals || userPreferences.goals;
//     const usedEntertainment = entertainment || userPreferences.entertainment;
//     // const usedPreferredTime = preferredTime || userPreferences.preferredTime;

//     const prompt = `
// I am a user who wants to schedule my day. Please create a daily schedule based on the following preferences:

// - Goals: ${usedGoals}
// - Entertainment: ${usedEntertainment}

// Return the schedule in clear time blocks with task descriptions.
// and return data in json format
// and in this format

// [
//     {
//       "task": "Task 1",
//       "time": "9:00 AM - 10:00 AM"
//     },
//     {
//       "task": "Task 2",
//       "time": "10:00 AM - 11:00 AM"
//     }
//   ]

//     `;

//     const ai = new GoogleGenAI({
//       apiKey: process.env.GEMINI_API_KEY,
//     });
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: [
//         {
//           role: "user",
//           text: prompt,
//         },
//       ],
//     });

//     return res.status(200).json(response.candidates[0].content.parts[0].text);
//   } catch (error) {
//     console.error("Error generating schedule:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


export const PostSchedule = async (req, res) => {
  const { promt } = req.body;
  const userId = req.user.id;

  if (!promt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const text = `
${promt}
Generate a daily schedule in JSON format ONLY.
Do not include any explanation or extra text, just pure JSON.
Format must be:

[
  {
    "task": "Task 1",
    "time": "9:00 AM - 10:00 AM"
  },
  {
    "task": "Task 2",
    "time": "10:00 AM - 11:00 AM"
  }
]
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          text,
        },
      ],
    });

    let rawText = response.candidates[0].content.parts[0].text;

    if (rawText.startsWith("```")) {
      rawText = rawText.replace(/```json|```/g, "").trim();
    }

    const match = rawText.match(/\[([\s\S]*)\]/);
    if (!match) {
      return res
        .status(500)
        .json({ message: "AI did not return valid JSON", raw: rawText });
    }

    let schedule;
    try {
      schedule = JSON.parse(match[0]);
    } catch (err) {
      console.error("JSON parse error:", err, "RAW:", rawText);
      return res
        .status(500)
        .json({ message: "Failed to parse AI JSON", raw: rawText });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.Schedule = schedule;
    await user.save();

    res.status(200).json(user.Schedule);
  } catch (error) {
    console.error("Error generating schedule:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getSchedule = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).lean(); 

    if (!user || !user.Schedule) {
      return res.status(404).json({ success: false, message: "No schedule found" });
    }

    res.status(200).json(user.Schedule);
  } catch (error) {
    console.error("Error getting schedule", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editTimetable= async (req,res)=>{
  const userid=req.user.id;
  const {id,time,task}=req.body;

  try {
    const updatedUser=await User.findOneAndUpdate(
      {_id:userid,"Schedule._id":id},
      {
      $set:{
        "Schedule.$.task":task,
        "Schedule.$.time":time
      },
    },
    {new:true}
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({ message: "User or schedule item not found" });
    }
    res.status(200).json(updatedUser.Schedule);
  } catch (error) {
  console.error("Error updating schedule:", error);
  res.status(400).json({ message: "error fetching data" });
  }
}
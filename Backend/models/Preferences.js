import mongoose from "mongoose";

const DeadlineSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const PreferredTimeSchema = new mongoose.Schema({
  morning: {
    type: String,
    default: "",
  },
  evening: {
    type: String,
    default: "",
  },
});

const UserPreferencesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  goals: {
    type: [String],
    default: [],
  },
  entertainment: {
    type: [String],
    default: [],
  },
  study: {
    type: [String],
    default: [],
  },
  preferredTime: {
    type: PreferredTimeSchema,
    default: () => ({}),
  },
  deadlines: {
    type: [DeadlineSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserPreferences = mongoose.model("UserPreferences", UserPreferencesSchema);

export default UserPreferences;
// department: {
//     type: String,
//     enum: [
//       "HR",
//       "Sales",
//       "Finance",
//       "Marketing",
//       "Operations",
//       "IT",
//       "Analytics"
//     ],
//     required: true
//   },

import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

   department: {
    type: String,
    enum: [
      "HR",
      "Sales",
      "Finance",
      "Marketing",
      "Operations",
      "IT",
      "Analytics"
    ],
    required: true
  },
    type: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },

    reportUrl: {
      type: String, // Power BI / PDF / Excel
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);

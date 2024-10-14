import { createSlice } from "@reduxjs/toolkit";

type Idea = {
  title: string;
  description: string;
};

interface IdeasState {
  value: Idea[];
}

const initialState: IdeasState = {
  value: [
    {
      title: "QuiltHub",
      description:
        "A cloud-based platform for quilters to collaborate and share patterns and quilting projects. QuiltHub would allow users to upload and share their designs, as well as provide a commenting and rating system to facilitate feedback and improvement.",
    },
    {
      title: "StitchSourcing",
      description:
        "A B2B SaaS solution that connects quilters with fabric suppliers and manufacturers. StitchSourcing would aggregate fabric offerings from various suppliers and provide quilters with a centralized platform to source materials, reducing the need for phone calls and emails.",
    },
    {
      title: "QuiltCalipers",
      description:
        "A digital quilting ruler app that allows users to measure and resize quilting patterns with precision. QuiltCalipers would provide a user-friendly interface for simple measurement conversions and calculations, ensuring accurate results without the need for physical rulers.",
    },
    {
      title: "BlocMap",
      description:
        "A web-based quilting community platform that maps and charts progress for quilters. BlocMap would allow users to track their quilting journey, set goals, and share their projects with friends and mentors, providing a sense of accomplishment and social support.",
    },
    {
      title: "FabricForay",
      description:
        "An AI-powered fabric recommendation engine that suggests quilting patterns and fabrics based on user preferences and project requirements. FabricForay would learn users' behavior and preferences over time, providing personalized recommendations and streamlining the quilting process.",
    },
  ],
};

export const ideasSlice = createSlice({
  name: "ideas",
  initialState,
  reducers: {
    addIdea: (state, action) => {
      state.value.push(action.payload);
    },
    removeIdea: (state, action) => {
      state.value = state.value.filter((idea) => idea !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addIdea, removeIdea } = ideasSlice.actions;

export default ideasSlice.reducer;

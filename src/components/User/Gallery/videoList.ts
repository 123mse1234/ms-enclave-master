export type Video = {
  type: "video" | "shorts";
  url: string;
  orientation: "landscape" | "portrait";
  title?: string;
};

export const videos: Video[] = [
  {
    type: "video",
    url: "https://www.youtube.com/embed/Q0gudMyt7Ek",
    orientation: "landscape",
  },
  {
    type: "video",
    url: "https://www.youtube.com/embed/VuGTFB2TNRI",
    orientation: "landscape",
  },
  {
    type: "shorts",
    url: "https://www.youtube.com/embed/tQNWp6cwHXM",
    orientation: "portrait",
  },
  {
    type: "shorts",
    url: "https://www.youtube.com/embed/CwipMTDGBdQ",
    orientation: "portrait",
  },
  {
    type: "shorts",
    url: "https://www.youtube.com/embed/YAiFm9U-uZU",
    orientation: "portrait",
  },
  {
    type: "shorts",
    url: "https://www.youtube.com/embed/wNVWGyUhyy0",
    orientation: "portrait",
  },
  {
    type: "shorts",
    url: "https://www.youtube.com/embed/y4amYVuiJ00",
    orientation: "portrait",
  },
  {
    type: "shorts",
    url: "https://www.youtube.com/embed/1N42x4Y_RlQ",
    orientation: "portrait",
  },
  {
    type: "shorts",
    url: "https://www.youtube.com/embed/szR78n6qNW0",
    orientation: "portrait",
  },
  {
    type: "shorts",
    url: "https://www.youtube.com/embed/VecjzxxXgt8",
    orientation: "portrait",
  },
  {
    type: "shorts",
    url: "https://www.youtube.com/embed/qRzvu-3WAWw",
    orientation: "portrait",
  },
  {
    type: "shorts",
    url: "https://www.youtube.com/embed/9it2BZq2lZI",
    orientation: "portrait",
  },
  {
    type: "shorts",
    url: "https://www.youtube.com/embed/lSj7s5P900I",
    orientation: "portrait",
  },
  {
    type: "shorts",
    url: "https://www.youtube.com/embed/Ax8O9HonUwk",
    orientation: "portrait",
  },
];
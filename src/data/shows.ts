import showsContent from "@/content/shows.json";

export type Show = {
  date: string;
  city: string;
  venue: string;
  ticketUrl: string;
};

export const shows: Show[] = showsContent as Show[];

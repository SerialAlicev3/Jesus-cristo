import { redirect } from "next/navigation";

const allowedPlaylists = new Set([
  "PL31F32E21D67DE8AE",
  "PLAD3672E70ED98EB2",
  "PLthn4AlankqBUlKAYv85Tu3Aq4BTDUcVl"
]);

export default async function YoutubeWatchRedirect({
  searchParams
}: Readonly<{
  searchParams: Promise<{ list?: string; v?: string }>;
}>) {
  const params = await searchParams;
  const videoId = params.v?.trim();
  const playlistId = params.list?.trim();

  if (!videoId || !playlistId || !allowedPlaylists.has(playlistId)) {
    redirect("/");
  }

  redirect(`https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}&list=${encodeURIComponent(playlistId)}`);
}

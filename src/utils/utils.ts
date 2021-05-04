export const fetchNumber = (chapterTitle: string): number => {
  const regex = /(?<=【第)(.+)(?=話】)/g;
  const chapterNumber = chapterTitle.match(regex);
  return chapterNumber ? Number(chapterNumber[0]) : 0;
}
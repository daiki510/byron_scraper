export const fetchNumber = (chapterTitle: string): string => {
  const regex = /(?<=【第)(.+)(?=話】)/g;
  const chapterNumber = chapterTitle.match(regex);
  return chapterNumber ? chapterNumber[0] : '';
}
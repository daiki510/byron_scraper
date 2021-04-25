export const fetchNumber = (chpaterTitle: string): string => {
  const regex = /(?<=【第)(.+)(?=話】)/g;
  const chapterNumber = chpaterTitle.match(regex);
  return chapterNumber ? chapterNumber[0] : '';
}
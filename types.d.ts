export type ScrapedData = {
  title: string,
  comicNo: number
  comicUrl: string
  chapterNo: number,
  chapterUrl: string,
  chapterTitle: string
}

export type ErrMsg = {
  msg: string;
  detail: unknown;
}

export type comicInfo = {
  title: string;
  id: number;
}

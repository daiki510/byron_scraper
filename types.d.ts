export type ScrapedData = {
  title: string,
  comicUrl: string
  chapterNum: string,
  chapterUrl: string,
  chapterOrg: string
}

export type ErrMsg = {
  msg: string;
  detail: unknown;
}

export type comicInfo = {
  title: string;
  id: string;
}

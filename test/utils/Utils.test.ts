import * as Utils from '@/utils/Utils';

describe('fetchNumber', (): void => {
  test('should return a chapter number', (): void => {
      const chapterTitle = 'テスト漫画 - Raw 【第10話】'
      const chapterNumber = Utils.fetchNumber(chapterTitle);
      expect(chapterNumber).toBe(10);
  });
  test('should return a chapter number by float', (): void => {
      const chapterTitle = 'テスト漫画 - Raw 【第10.1話】'
      const chapterNumber = Utils.fetchNumber(chapterTitle);
      expect(chapterNumber).toBe(10.1);
  });
})
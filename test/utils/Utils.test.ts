// import * as Utils from '../../src/utils/Utils';
import * as Utils from '@/utils/Utils';

describe('fetchNumber', (): void => {
  test('should return a chapter number', (): void => {
      const chapterTitle = 'テスト漫画 - Raw 【第10話】'
      const chapterNumber: string = Utils.fetchNumber(chapterTitle);
      expect(chapterNumber).toBe('10');
  });
})
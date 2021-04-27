class Info {
  static 処理開始 = (name: string): string => `処理を開始します:${name}`;
  static 処理終了 = (name: string): string => `処理を終了します:${name}`;
  static 処理中 = (name: string): string => `処理中:${name}`;
}

class Error {
  static 異常終了 = 'スクレイパーが異常終了しました';
}

export { Info, Error }
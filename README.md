# スクレイパー開発
## 概要
漫画サイトをクローリングして、最新話を取得する
最新話が更新されたらSlack/LINEにて通知する

## 処理の流れ
1. クローリング
2. API呼び出し
3. データ処理・登録
4. フロントからAPI呼び出し

***

## 開発環境
| 項目               | 内容                      |
| ------------------ | ---------------------- |
| プログラミング言語 | Typescript, PHP                |
| フレームワーク     | Node.js, React, Laravel  |
| インフラ           | AWS(ECS, CW, ), Docker  |
| DB                 | MySQL, Redis, RDS      |
| CI/CD              | CircleCI, AWS CodePipeline |
| 各種ツール | Github, Slack, LINE, CodeClimate |

***

## リポジトリ構成
- API
  - byron_api
- Scraper
  - byron_scraper
- Front
  - byron_front

***

## 機能
### スクレーパー
- 対象サイトのクローリング
  - CWEでスケジュール管理
  - 即時実行
- 収集結果のJSONファイル出力
  - S3へ保存
- 収集結果からAPI呼び出し
### API
- データ処理&登録
- 通知(Slack&LINE)
- 認証API(▲)
### フロント
- 収集した漫画一覧
- 認証機能(▲)


***

## インフラ
### デプロイ
- CodePipeline
### 運用・保守
- CodeClimate
- CloudWatch/Lambda
### アーキテクチャ
- スクレイパー
  - ECR + ECS + CWE
- API
  - ECR + ECS
- フロント
  - S3 + CloudFront  












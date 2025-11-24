# 天気アプリ

Tokyo、Berlin、Dubaiなどの都市名で検索できるシンプルな天気アプリです。

## 特徴

- 都市名で天気情報を検索
- Nominatim API（OpenStreetMap）で地理情報を取得
- Open-Meteo APIで天気情報を取得（APIキー不要）
- レスポンシブデザイン
- Tailwind CSSによる美しいUI

## 使用技術

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Nominatim Geocoding API
- Open-Meteo Weather API

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリを確認できます。

## 使い方

1. 検索フォームに都市名を入力（例: Tokyo, Berlin, Dubai）
2. 「検索」ボタンをクリック
3. 現在の天気情報が表示されます

表示される情報：
- 現在の気温
- 天気の状態
- 体感温度
- 湿度
- 風速

## API について

このアプリは以下の無料APIを使用しています：

- **Nominatim API**: OpenStreetMapの地理情報APIで、都市名から座標を取得
- **Open-Meteo API**: 無料の天気APIで、APIキー不要で使用可能

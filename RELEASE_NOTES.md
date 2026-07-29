# Release Notes

## 2026-07-29

### Added

- トップページ、Basic プランページ、リサイクルショップ向け EC ページで重複していた実績カウンターを、テーマエディタから数値・小数桁・接尾辞・ラベルを管理できる共通セクション `sections/solstar-stats.liquid` として追加しました。
- Basic プランページとリサイクルショップ向け EC ページのコンセプトセクションに、共通 CSS・表示アニメーションを提供する `sections/solstar-concept-foundation.liquid` と `snippets/solstar-concept-foundation.liquid` を追加しました。
- お問い合わせ CTA を対象のフォームへスクロールさせる共通実装として、`sections/solstar-contact-scroll.liquid` と `snippets/solstar-contact-scroll.liquid` を追加しました。
- 実績カウンターとコンセプトセクションのアニメーションに `prefers-reduced-motion` 対応を追加しました。

### Changed

- 記事の構造化データを `https://schema.org` に統一し、canonical URL を使用した `@id` / `url` / `mainEntityOfPage`、記事画像、`dateModified`、言語、著者プロフィール、共通 Organization 参照を出力する構成へ変更しました。
- Organization 構造化データの URL と `@id` をサイト単位で統一し、空の SNS URL を `sameAs` から除外しました。WebSite 構造化データも共通 Organization を参照する構成へ変更しました。
- Google のサイトリンク検索ボックス廃止に伴い、WebSite 構造化データから不要になった `SearchAction` を削除しました。
- Instagram の設定 URL から計測用クエリパラメータを削除し、正規プロフィール URL に統一しました。
- Basic プランページとリサイクルショップ向け EC ページのコンセプト用 CSS・JavaScriptを共通スニペットへ集約しました。
- Basic プランページとリサイクルショップ向け EC ページの JSON テンプレートから専用セクションを直接参照し、Theme Check がスニペットの依存関係を静的に追跡できる構成へ変更しました。
- トップページのお客様画像の代替テキストを汎用的な `Client Image` から企業名を含む内容へ変更し、スライド切り替え時にも代替テキストが更新されるようにしました。

### Fixed

- 記事構造化データの URL が記事ページではなくトップページを指す可能性がある問題を修正しました。
- 記事画像に `image_url` を適用する対象が Article オブジェクトになっていた問題を修正しました。
- 全記事に同一の ProfilePage 構造化データが重複出力される問題を解消し、対象著者の記事から Person エンティティを参照する方式へ変更しました。
- Organization 構造化データの URL が閲覧ページごとに変化する問題と、空文字の SNS URL が出力される問題を修正しました。
- Twitter Card が存在しない `social_twitter_link` 設定を参照していた問題を修正し、実際の `twitter_link` 設定からアカウント名を取得するようにしました。
- パスワードページの Shopify リンクで `rel` 属性が重複していた不正な HTML を修正しました。
- Solstar Express ページで全ての `.btn` リンクをお問い合わせフォームへ強制的に書き換えていた処理を削除しました。
- Basic プランページとリサイクルショップ向け EC ページのスクロール処理を、明示的にお問い合わせ先を指定した CTA のみに限定しました。
- JSON テンプレート内の動的な `render` が静的参照として認識されず、`solstar-concept-foundation.liquid` と `solstar-contact-scroll.liquid` に `OrphanedSnippet` 診断が表示される問題を修正しました。

### Performance

- 3ページに重複していた実績カウンターの HTML・CSS・JavaScriptを共通セクションへ移動しました。
- Basic プランページとリサイクルショップ向け EC ページに重複していたコンセプト用 CSS・JavaScriptとお問い合わせスクロール処理を共通化しました。
- JSON テンプレート内の Custom Code を 76 セクション・約 364KB から 73 セクション・約 323KB へ削減しました。
- 参照されていなかった `assets/basic-plan.css` を削除しました。

### Verification

- 通常設定の `shopify theme check`: passed with no offenses.
- 厳格設定の `theme-check:all`: `OrphanedSnippet` 0件。既存の `AssetSizeCSS` / `AssetSizeJavaScript` 16件のみ確認しました。
- Shopify Liquid validator: 変更したセクション、スニペット、JSON テンプレートがすべて passed.
- テンプレート JSON 38ファイルの parsing passed.
- 新規 JavaScript の syntax check passed.
- `git diff --check`: passed.

### Remaining Notes

- Standard プランページ固有のテンプレートと Custom Code は今回の変更対象外です。
- 厳格 Theme Check に残る CSS・JavaScript 容量16件は、Broadcast 本体のバンドル分割や import-on-interaction を含む別のパフォーマンス改修として対応します。

## 2026-06-19

### Added

- ブログ記事の `custom.audio_link` メタフィールドに音声リンクが登録されている場合、記事本文の上部に音声プレイヤーを表示する機能を追加しました。
- 音声プレイヤーにブラウザ標準の再生・シーク・音量調整機能と、独立した停止ボタンを追加しました。
- 音声カードにナレーター画像、ナレーター名「島袋隼」、「この記事を音声で聴く」の案内を追加しました。
- 記事セクションのテーマ設定に、音声プレイヤーの表示切り替えとメタフィールドの namespace / key 設定を追加しました。

### Changed

- 音声カードを記事の Color scheme に追従するデザインへ変更し、ナレーター情報と再生操作を整理しました。
- 停止ボタンの背景色を `#AB8C52` に変更しました。
- メタフィールドの `link`、`url`、`file_reference` 型から音声URLを取得できるようにしました。

### Fixed

- `link` 型メタフィールドのオブジェクト全体が音声URLとして出力され、再生ボタンが無効になる問題を修正しました。
- テーマプレビューで音声URLを書き換えた結果、メタデータを取得できなくなる問題を修正し、登録されたShopify CDN URLを直接使用するようにしました。
- 関連記事で著者表示が省略される問題と、現在の記事の著者名が誤表示される問題を修正しました。
- 記事公開日の `datetime` 属性をISO 8601形式へ修正しました。
- 旧カスタム音声UIで使用していた未使用翻訳キーと不要なHTMLコメントを削除しました。

### Performance

- ナレーター画像をShopify CDNの幅144px変換で配信し、転送量を約1.27MBから約5.3KBへ削減しました。

### Verification

- 指定MP3ファイルの `audio/mpeg` 応答、Rangeリクエスト対応、メタデータ読み込み、再生・音量調整・停止を確認しました。
- `shopify theme check`: 319 files inspected with no offenses found.
- `git diff --check`: passed.

## 2026-06-16

### Changed

- Standard プランページのファーストビュー構成を整理し、非表示の `main` セクションと FV セクションの役割が重複しないよう調整しました。
- Standard プランページ専用の共通 CSS（`assets/standard-plan.css`）を追加し、背景色、カード、見出し、本文、チェックリスト、余白、角丸、枠線のデザイントークンを統一しました。
- 「Shopify移行・リニューアルで対応する主な内容」のカードデザインを基準に、コンセプト設計、Fit / Not Fit、移行説明、実績、無料相談 CTA などのカード表現を統一しました。
- 「ブランドの魅力を伝えるECコンセプト設計」セクションの不要な外側カードと下線表現を削除し、Answer カードのテキストサイズをヒアリング側に合わせました。
- Standard プランページ内のアクセントカラーをブラウン基調に整理し、実績数値や Fit 見出しの色も統一しました。

### Fixed

- 「成長したブランドだからこそ見えてくる、いまのECサイトの課題。」の5枚カードで、下段2枚が左寄せに見える問題を修正し、デスクトップではカード群が中央に揃うようにしました。
- 同セクションのカード見出しのみ中央寄せにし、本文配置は左揃えのまま維持しました。
- モバイル画面で課題カードの幅指定が崩れる問題を修正しました。デスクトップ用のカード幅指定を `min-width: 750px` 以上に限定し、モバイルでは1列表示に変更しています。
- 「Shopify移行で大切なのは、デザインだけではありません。」と無料相談 CTA のカード上部のブラウン表現を薄め、他カードとの統一感を保ちながら主張を抑えました。

### Verification

- `templates/page.standard-plan.json` の JSON parsing passed。
- `shopify theme check`: passed with no offenses.

## 2026-06-10

### Added

- お問い合わせフォーム（Contact form）の Name ブロックに `Reverse first and last name order` 設定を追加し、姓（Last name）→ 名（First name）の順で入力欄を表示できるようにしました。設定は `Required` チェックボックスの前に配置しています。
- DOM の並び順自体を入れ替える実装としたため、タブ移動順やスクリーンリーダーの読み上げ順も表示順と一致します。送信値の `contact[first_name]` / `contact[last_name]` は従来どおり維持されます。

### Fixed (SEO)

- H1 が存在しなかった 5 ページに H1 を 1 つずつ設定しました。`page.faq`・`page.story` は main-page セクションの見出しを、`page.contact` はお問い合わせフォームの見出し（「お問い合わせ」）を、`page.lookbook` は先頭 section-double の見出しを、`page.theme-features` は先頭 rich-text の見出し（「CREAM」）をそれぞれ H1 化しました。いずれも font-size クラスは据え置きのため見た目は変わらず、文書構造（意味タグ）のみを変更しています。
- ブログ記事ページの記事タイトルを `<h2>` から `<h1>` に変更しました（`sections/article.liquid`）。`h2` クラスは維持しているため表示サイズは従来どおりです。
- `page.about` の H1 重複を解消しました。本文側の見出し「SOLSTARについて」を `h2` に降格し、ページタイトル（main-page）を唯一の H1 に統一しました。
- アコーディオン（FAQ）のグループ見出しを `<h3>` から `<h2>` に変更し、H1 → H3 の見出しレベルスキップを解消しました（`sections/section-accordion-group.liquid`）。質問項目は `<summary>` 要素で見出しタグではないため影響はありません。
- OGP 画像メタタグ `og:image` のプロトコルを `http:` から `https:` に統一しました（`snippets/social-meta.liquid`）。

### Verification

- `sections/contact-form.liquid` schema JSON parsing passed.
- 編集した 6 テンプレート（`page.about` / `page.contact` / `page.faq` / `page.lookbook` / `page.story` / `page.theme-features`）の JSON parsing passed。
- 各対象ページの H1 が 1 つずつになっていることを確認しました。

## 2026-06-04

### Added

- Blog posts セクションに `Enable mobile slider` 設定を追加し、モバイル画面で記事一覧を横スクロールスライダー表示に切り替え可能にしました。

### Verification

- `shopify theme check`: passed with no offenses.
- `sections/section-blog.liquid` schema JSON parsing passed.

## 2026-05-19

### Added

- カートページセクションに `Show quantity selector` 設定を追加し、Quantity selector の表示 / 非表示をテーマエディタから切り替え可能にしました。
- カートページセクションに `Show subtotal note` 設定を追加し、「配送料、税金、割引コードはチェックアウト時に計算されます」の表示 / 非表示を切り替え可能にしました。

### Fixed

- カートページの Quantity selector と削除リンクの重なりを解消し、Drawer と同じく数量操作と削除導線が縦に整理されるよう調整しました。
- Quantity selector の横幅と入力欄の左右余白を拡張し、数量値と増減アイコンが重ならないようにしました。
- カート Ajax の割引コード更新、数量更新、削除処理で失敗時にボタンや入力欄が無効のまま残らないよう復帰処理を追加しました。
- Cart refresh / Cart drawer event listener の解除漏れを修正し、Theme editor や section 再読み込み時の重複リスナー発生を防止しました。
- カート内 upsell / bundle 商品の重複判定を部分一致から区切り付きの完全一致に変更し、商品IDやhandleの一部一致で誤除外されるリスクを解消しました。

### Verification

- `node --check assets/theme.dev.js`: passed.
- `node --check assets/theme.js`: passed.
- `sections/cart.liquid` schema JSON parsing passed.
- `git diff --check`: passed.

## 2026-05-11

### Added

- Broadcast の Release Notes ページに Cream by Solstar の全リリースノートを掲載しました。
- Cream の `Version 3.0.1` から `Version 3.4.9` までの更新内容を日本語で確認できるようにしました。
- Release Notes ページ専用の CSS スコープを追加し、背景色、文字色、罫線、余白、フォントサイズが Broadcast テーマの CSS 変数に追従するようにしました。
- Cream manual ページの Custom code セクションに Cream の `manual.md` 全内容を掲載しました。
- Cream manual ページにカテゴリタブと機能別の「詳細を見る」展開 UI を追加しました。

### Fixed

- Resolved all standard Shopify Theme Check errors.
- Added the missing `countdown-timer` theme block used by slideshow image and video blocks.
- Removed missing product 3D model asset references for `component-model-viewer-ui.css` and `product-model.js`.
- Updated Japanese locale keys to match the default English locale structure.
- Fixed missing translation references for product tabs, cart discount removal, quantity labels, inventory labels, pricing labels, and video accessibility labels.
- Replaced the unsupported `product_option_value` filter usage with the current product option value object.
- Added missing `width` and `height` attributes to image output paths flagged by Theme Check.
- Removed duplicate render arguments in header localization and tab collection image rendering.
- Updated gift card font preloading to use Shopify's `preload_tag` filter.
- Resolved all standard Shopify Theme Check warnings by removing unused Liquid assignments, normalizing variable names, initializing captured output buffers, and limiting suppressions to dynamic Liquid markup false positives.
- Cream manual ページの Custom code を 50KB 未満に圧縮し、Shopify の `Liquid file size cannot exceed 50 kilobytes` エラーを回避しました。
- Cream manual ページ内の重複 `h1` を削除し、ページ本体の見出し構造と競合しないようにしました。
- Cream manual の「概要」項目を bullet から外し、機能名に添える説明文として表示するようにしました。
- Cream manual のタブと「詳細を見る」に、Header メニューリンクと同じ下線ホバーアニメーションを適用しました。

### Performance

- Added `fetchpriority="high"` to the first template hero image path so the mobile LCP poster image is prioritized.
- Prioritized the first image block in early Rich text sections to address the desktop LCP image that PageSpeed reported as lazy-loaded.
- Removed unnecessary high-priority image hints from lazy-loaded mobile menu images.
- Removed preload/high-priority hints from the loading-screen image and added explicit image height output to reduce layout and resource-priority noise.
- Ensured the shared image snippet always passes an explicit empty `alt` value when image alt text is blank.
- Added a loading-screen enable setting that defaults off so the decorative loader does not block LCP rendering unless explicitly enabled.
- Added explicit height and fallback empty alt output to hero images, including video posters.
- Added a high priority hint to the first video poster image path and ensured generated video fallback images include empty alt text.
- Added more responsive image candidates around common mobile and desktop render widths to reduce oversized image downloads.
- Changed `swatches.css` to preload and apply asynchronously to reduce render-blocking CSS.

### Verification

- `shopify theme check --no-color`: passed with no offenses.
- `git diff --check`: passed.
- Locale JSON parsing passed for `locales/ja.json` and `locales/en.default.json`.

### Remaining Notes

- Strict `theme-check:all` still reports asset size findings for large CSS/JavaScript files. These are performance refactor candidates and should be handled separately from this bug-fix pass.

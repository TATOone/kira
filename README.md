# Kira

Одностраничный сайт женских практик Киры: Astro, Tailwind CSS и файловая админка Keystatic.

## Локальный запуск

Требуется Node.js 22+.

```bash
npm install
npm run dev
```

- сайт: `http://localhost:4321`
- редактор (локальные файлы): `http://localhost:4321/keystatic`

Локально без `PUBLIC_KEYSTATIC_STORAGE=github` Keystatic сохраняет изменения в
`src/content/site.json`. Загруженные изображения и видео попадают в `public/uploads/`.

## Редактор на проде (GitHub)

Админка: https://resurs-materinstva.ru/keystatic

Войти может владелец/коллаборатор репозитория [TATOone/kira](https://github.com/TATOone/kira)
с правом записи. После сохранения Keystatic коммитит в GitHub, и **Cloudflare Workers Builds**
автоматически собирает сайт и деплоит Worker `kira-site`.

Нужные секреты Cloudflare Worker (runtime, уже через Wrangler):
- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `KEYSTATIC_SECRET`

Callback GitHub App:
`https://resurs-materinstva.ru/api/keystatic/github/oauth/callback`

## Проверка и сборка

```bash
npm run check
npm run build
npm run preview
npm run deploy
```

## Контент и медиа

- основной контент: `src/content/site.json`;
- оптимизированные фото: `public/media/photos/`;
- видео: `public/media/videos/`;
- обложки видео: `public/media/posters/`.

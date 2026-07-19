# Kira

Одностраничный сайт женских практик Киры: Astro, Tailwind CSS и файловая админка Keystatic.

## Локальный запуск

Требуется Node.js 22+.

```bash
npm install
npm run dev
```

- сайт: `http://localhost:4321`
- редактор: `http://localhost:4321/keystatic`

Локально Keystatic работает без авторизации и сохраняет изменения в
`src/content/site.json`. Загруженные через редактор изображения и видео попадают в
`public/uploads/`.

## Проверка и сборка

```bash
npm run check
npm run build
npm run preview
```

Статическая часть собирается в `dist/`. Маршрут `/keystatic` и его API обслуживаются
Cloudflare-адаптером.

## Бесплатная публикация на Cloudflare Workers

1. Создать GitHub-репозиторий и отправить в него проект.
2. В разделе Workers & Pages создать Worker и подключить репозиторий через Workers Builds.
3. Build command: `npm run build`.
4. Deploy command: `npx wrangler deploy`.
5. Добавить переменные из `.env.example`, включая `PUBLIC_KEYSTATIC_STORAGE=github`.
6. В Keystatic создать GitHub App и выдать ей доступ только к этому репозиторию.
7. Callback URL приложения:
   `https://ВАШ-ДОМЕН/api/keystatic/github/oauth/callback`.

После сохранения в `/keystatic` изменения коммитятся в GitHub и автоматически запускают
новую сборку Cloudflare Workers.

Для публикации из терминала после авторизации Wrangler:

```bash
npm run deploy
```

## Контент и медиа

- основной контент: `src/content/site.json`;
- оптимизированные фото: `public/media/photos/`;
- видео: `public/media/videos/`;
- обложки видео: `public/media/posters/`.

Исходники из `content/` и `feedback/` исключены из Git: на сайт попадают только
оптимизированные версии. Видео загружаются лишь после нажатия пользователем, а изображения
используют отложенную загрузку.

## Что нужно обновить перед публичным запуском

- указать реальный домен в `PUBLIC_SITE_URL`;
- добавить полные ФИО самозанятой в подвал и политику конфиденциальности;
- проверить согласие всех героинь на публикацию фото и видеоотзывов;
- заменить текстовый логотип через Keystatic, когда будет готов файл логотипа;
- проверить тексты услуг с Кирой: текущие формулировки — редакторские черновики.
# kira

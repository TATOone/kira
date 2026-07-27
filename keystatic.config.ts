import { config, fields, singleton } from '@keystatic/core';

const githubOwner =
  import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER || 'TATOone';
const githubName = import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO_NAME || 'kira';
const useGithub = import.meta.env.PUBLIC_KEYSTATIC_STORAGE === 'github';

const image = (label: string) =>
  fields.image({
    label,
    directory: 'public/uploads/images',
    publicPath: '/uploads/images/',
  });

const video = (label: string) =>
  fields.file({
    label,
    directory: 'public/uploads/videos',
    publicPath: '/uploads/videos/',
  });

export const keystaticConfig = config({
  storage: useGithub
    ? {
        kind: 'github',
        repo: {
          owner: githubOwner,
          name: githubName,
        },
      }
    : { kind: 'local' },
  ui: {
    brand: { name: 'Кира Мусаелян — редактор сайта' },
  },
  singletons: {
    site: singleton({
      label: 'Содержимое сайта',
      path: 'src/content/site',
      format: 'json',
      schema: {
        brand: fields.text({ label: 'Название бренда' }),
        siteName: fields.text({ label: 'Название сайта' }),
        logo: image('Логотип'),
        seo: fields.object(
          {
            title: fields.text({ label: 'Заголовок вкладки' }),
            description: fields.text({ label: 'Описание для поиска', multiline: true }),
          },
          { label: 'SEO' },
        ),
        hero: fields.object(
          {
            eyebrow: fields.text({ label: 'Надзаголовок' }),
            title: fields.text({ label: 'Главный заголовок (бренд)', multiline: true }),
            lead: fields.text({ label: 'Подзаголовок' }),
            description: fields.text({ label: 'Краткое описание', multiline: true }),
            cta: fields.text({ label: 'Текст кнопки' }),
            image: image('Фоновое фото'),
          },
          { label: 'Первый экран' },
        ),
        about: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            text: fields.text({ label: 'Текст', multiline: true }),
            note: fields.text({ label: 'Короткая фраза', multiline: true }),
            image: image('Фото'),
          },
          { label: 'О Кире' },
        ),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: 'Вопрос' }),
            answer: fields.text({ label: 'Ответ', multiline: true }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.question.value,
          },
        ),
        offlineServices: fields.array(
          fields.object({
            title: fields.text({ label: 'Название' }),
            description: fields.text({ label: 'Описание', multiline: true }),
            price: fields.text({ label: 'Цена в подсказке', description: 'Пусто — без подсказки' }),
            tip: fields.text({ label: 'Текст подсказки', multiline: true }),
            details: fields.array(
              fields.object({
                label: fields.text({ label: 'Пункт' }),
                price: fields.text({ label: 'Цена в подсказке' }),
                tip: fields.text({ label: 'Текст подсказки', multiline: true }),
              }),
              {
                label: 'Направления',
                itemLabel: (props) => props.fields.label.value,
              },
            ),
            image: image('Фото'),
          }),
          {
            label: 'Офлайн-услуги',
            itemLabel: (props) => props.fields.title.value,
          },
        ),
        onlineServices: fields.array(
          fields.object({
            title: fields.text({ label: 'Название' }),
            description: fields.text({ label: 'Описание', multiline: true }),
            price: fields.text({ label: 'Цена в подсказке', description: 'Пусто — без подсказки' }),
            tip: fields.text({ label: 'Текст подсказки', multiline: true }),
          }),
          {
            label: 'Онлайн-программы',
            itemLabel: (props) => props.fields.title.value,
          },
        ),
        reviews: fields.array(
          fields.object({
            title: fields.text({ label: 'Подпись' }),
            service: fields.text({ label: 'Услуга' }),
            video: video('Видео'),
            poster: image('Обложка'),
          }),
          {
            label: 'Видеоотзывы',
            itemLabel: (props) => props.fields.title.value,
          },
        ),
        contacts: fields.object(
          {
            telegram: fields.text({ label: 'Telegram' }),
            channel: fields.text({ label: 'Telegram-канал' }),
            instagram: fields.url({ label: 'Instagram' }),
            location: fields.text({ label: 'География' }),
          },
          { label: 'Контакты' },
        ),
      },
    }),
  },
});

export default keystaticConfig;

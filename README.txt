Utube Frontend
Краткое описание:
Фроненд проекта социальной сети, ориентированной на видеоконтент, на React.
Проект включает в себя такие возможности, как:
o	регистрация и авторизация пользователей;
o	поиск и просмотр загруженных пользователями видеороликов;
o	добавление и управление видеороликами зарегистрированными пользователями;
o	связи пользователей друг с другом через чаты (ЛС и групповые);
o	рассылка уведомлений по разным каналам связи.

Полное описание:
1. Фронтенд - React;
2. Progressive Web Apllication:
    - приложение создано с функционалом PWA:
      npx create-react-app pwa-react-typescript --template cra-template-pwa
    - Web-манифест приложения - public/manifest.json
3. Подключены стили (src/styles). Стили написаны самостоятельно, без шаблонов Bootstrap и т.п.
Есть адаптивная верстка под мобильное приложение.
4. Добавлены основные повторяющиеся компоненты (src/components):
    Menu - меню в хедере приложения;
    LoginForm - логин на сайт (на бэкенде реализованы возможности SessionAuthentication и BasicIdentification,
    на фронтенде используется SessionAuthentication, однако сохранена возможность возврата к BasicIdentification,
    см. AppBasicIdentification.js);
    Videos - рендер видео-контейнеров на основной странице;
    VideoCard - 1 видео-контейнер;
    VideoForm - форма загрузки видео. Добавлена проверка типа файлов (принимаются только файлы video различных форматов);
    VideoDeleteButton - кнопка удаления видео, доступна только автору;
    Likes - компонент для добавления/удаления лайков;
    SubscriptionButton - кнопка подписки/отписки на автора;
    Subscription - страница с видео авторов, на которых пользователь подписан;
    Comments - страница с комментами на конкретное видео, включает функционал добаления/удаления (автором)
    комментов;
    CommentForm - форма добавлени новых комментов к видео.
    PublicChatList - список общих чатов, доступных для всех пользователей;
    PublicChatRoom - комната конкретного публичного чата.
    PrivateChatRoom - комната двустороннего (приватного) чата.
5. Подключен Redux.
6. Подключен API (см. бэкенд часть проекта).
7. Пользовательский интерфейс:
  ВАЖНО: часть функционала(заливка видео, добавление комментариев и лайков и т.д.) доступна только
  после регистрации и авторизации пользователя на сайте.

  Добавлен функционал бана автора. При бане отключаются возможности:
    - заливать новые видео (удалять свои видео, залитые раньше, можно);
    - лайкать/дислайкать видео;
    - оставлять комментарии к видео.

  Меню: для удобной навигации по сайту предусмотрено разворачивающееся меню (правый верхний угол экрана,
  нажать на стрелку для открытия).
    - по клику на лого в левой части меню открывается стартовая страница с выдачей всех видео (localhost:3000/);
    - вкладка Recommended - видео от авторов, на которых пользователь подписан;
    - вкладка Public chats - публичные чаты, доступные для всех пользователей (фронт перенес с сервера на React);
    - вкладка Personal Page - ссылка на серверно-сгенерированную страницу личного кабинета пользователя
    (если пользователь не зарегистрирован / не авторизован, перенаправляет на страницу sign in / sign up);
    - в меню встроена форма поиска видео по названию/описанию/хэштегам;
      
  Приватные чаты: по клику на аватарку автора под видео на главной странице будет открыт приватный чат с автором (только для зарегистрированных и авторизованных пользователей, иначе ссылка на чат будет неактивна).
  
  Подписка/отписка от автора: кнопка напротив аватарки автора под видео.
  
  Лайки: зеленое сердечко - поставить лайк, черное - убрать (отдельного счетчика дислайков нет).
  
  Просмотреть/оставить комментарии к видео: нажать на ссылку Comments в форме видео для перехода на страницу комментариев.
  Кнопка удаления комментариев - напротив текста соответствующего комментария (видна только его автору).

  Загрузить видео (только для зарегистрированных пользователей): форма для загрузки видео помещена внизу страницы.
  
  Удалить видео (только для автора): кнопка в нижнем правом углу формы видео.

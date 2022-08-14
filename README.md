# О проекте

Проект написан на React JS на шаблоне Create React App --Typescript и Redux Toolkit

## Запуск проекта

Выполнить следующие команды в терминале: сперва **npm install**, затем **npm start**  
Версия node - `16.15.1`

## Библиотеки

Ant Design, Redux Toolkit, и React Router Dom v6

## Как все работает

**1.** Приложение делится на две страницы: Авторизация и Список контактов;  
**2.** После запуска проекта откроется страница с авторизацией;  
**3.** После успешной авторизации происходит переход на страницу с контактами;  
**4.** Функционал:  
&ensp;&ensp;4.1. Авторизация и обработка ошибок в случае, если пользователь не найден или в случае других ошибок при запросе;  
&ensp;&ensp;4.2. При обновлении страницы после авторизации, пользователь остается авторизованным;    
&ensp;&ensp;4.3. Получение, удаление, редактирование, добавление, и поиск контактов. Также, обработка ошибок для каждой отдельной операции;  
&ensp;&ensp;4.4. Header показывается только если пользователь авторизован. В нем есть кнопка выхода из аккаунта.  

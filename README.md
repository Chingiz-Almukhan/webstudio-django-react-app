# Настройка проекта
## Для начала делаем клон ветки

 	git clone git@github.com:Chingiz-Almukhan/webstudio-django-react-app.git
	cd webstudio-django-react-app
	
## После устанавливаем виртуальное окружение для того, чтобы установить туда зависимости проекта

	$ python -m venv venv
### Активируем его
	$. venv/bin/activate
### После устанавливаем зависимости 
	$pip install -Ur requirements.txt
## Дальше переходим в прект Django
	cd source
#### Делаем миграцию
 	./manage.py migrate
 #### После ставим дамп бд
 	./manage.py loaddata fixtures/dump.json
 ## После чего запускаем сервер на 8001 порту
 ##### (В приложении реакта указывал эндпойнты с этим портом, поменять не успел)
 
 		./manage.py runserver localhost:8001
	
## Дальше переходим в корневую папку 
	cd ..
#### После переходим в приложение с реактом
	cd frontend
	npm install --legacy-peer-deps
	npm start
		
 
 

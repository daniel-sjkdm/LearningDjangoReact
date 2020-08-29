# LearningDjangoReact

A project to integrate django as backend and react as frontend in order to create a full stack web app.

## Django 

Used as backend to create the database and a rest api to perform requests to make the following action:
+ CRUD for posts 
+ CRUD for users
+ Get/Refresh jwt token

Libraries used:
+ django rest framework 
+ django rest framework jwt
+ django cors headers


## React 

Used as frontend since it's the best framework and its approach to design by using compoents it's really useful.

Libraries used:
+ axios
+ @material-ui
+ react-router-dom
+ react-hook-form

Concepts used:
+ Functional components
+ Hooks:
  + useState
  + useReducer
  + useEffect
  + useRef
+ Context API
+ Lift state up
+ Controlled and uncontrolled components (forms)
+ Http requests with axios

 

Features:

- [x] Create a django project with: accounts and posts as apps
- [x] Create a react project called frontend 
- [x] Create serializers.py file for each app 
- [x] Configure defaults of REST_FRAMEWORK and JWT in settings.py
- [x] Create a jwt token for each registered user
- [x] Create react components: postList, post, postForm, navigation, login, register
- [ ] Create the needed routes using _react-router-dom_
- [x] Perform form validation
- [ ] Add login features

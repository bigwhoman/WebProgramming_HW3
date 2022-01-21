# WebProgramming_HW3
first of all , you should go to ./frontend folder and run this command :
<code>
  npm install
</code>
then you should run this command also in ./backend folder.
after that , you should run the command below in ./cache folder:

<code>
  go mod tidy
</code>

now , to run backend API (and connect it to cache ) , in ./cache , run this command :

<code>
  go run ./main.go
</code>

and in ./backend , run this command :

<code>
  npm start
</code>

and after all, you should run this command in ./frontend folder:

<code>
  npm start
</code>

now , frontend is running on localhost and port : 3000 . API is also connected to frontend (and also can be used standalone) and is running on localhost and on port 8000. And caching system is also running as a standalone API on localhost and on port 8080.

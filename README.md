# WebProgramming_HW3
first of all , you should go to ./frontend folder and run this command : </br>
<code>
  npm install
</code>
</br>
then you should run this command also in ./backend folder. </br>
after that , you should run the command below in ./cache folder:
</br>

<code>
  go mod tidy
</code>
</br>

now , to run backend API (and connect it to cache ) , in ./cache , run this command :
</br>

<code>
  go run ./main.go
</code>
</br>

and in ./backend , run this command :
</br>

<code>
  npm start
</code>

</br>

and after all, you should run this command in ./frontend folder:
</br>
<code>
  npm start
</code>
</br>
now , frontend is running on localhost and port : 3000 . API is also connected to frontend (and also can be used standalone) and is running on localhost and on port 8000. And caching system is also running as a standalone API on localhost and on port 8080.

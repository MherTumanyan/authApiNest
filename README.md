# Nest auth API
## Its an  session-based auth api. 
It is very easy to use

First of all we must register with our username and password using ```POST``` request(with Postman or idk...) to url ```path/users/signup```

Then we can login wih that credentials using ```POST``` request to url ```path/users/login``` (this returns our user, and in sessionId in cookie section)

Use ```path/users/logout``` url and ```GET``` request to destroy your session 

Also you can get your info using ```path/users/me``` url. This request only valid when your session is not destroyed yet.

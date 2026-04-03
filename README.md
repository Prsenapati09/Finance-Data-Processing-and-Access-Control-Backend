this ia  a project FINACE DATA PROCESSING AND ACESS CONTROL BACKEND .
this is a Backend that zorvyn give me the asignment for internship selection process .

using technlogy : - Nodejs , Express js and MongoDB

feature :-
---------

user authentication user can register and login .

token base authentication using jsonwebtoken (jwt) . when user login using there credential get a token .

all the rouete are protected middleware check the user is authenticate or not using the token .

password hashing usring bcrypt for the security perpose tha password will be store in hash format not the plain text .

role based authentication the middleware check the user role accoring the role give the acess control .

check the authenticate user if not a authenticate not give the acess .

use api :-
--------

post auth/signup (user signup or register)
post auth/login  ( user login and get the token )


post users/  ( get all user details only admin)
post users/:id ( can update only by admin )

get records/  ( all can see the records )
post records/  (admin only can create )
patch records/:id  ( admin can upadte only )
delete records/:id  ( admin can delete only )

get analytics/summary ( get the dashboard summary filter data)



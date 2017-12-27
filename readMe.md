#MarvelousBookworm

My app is called Marvelous Bookworm, my original vision was to create an app that would allow people to research their favorite
comic book characters and then find which public libraries held copies of their adventures so that users could rent comic books for free
I had originally wanted to use WorldCat's API in addition with Marvel Comics' API, which I did get to use. However the WorldCat admins would
not grant me a key, so I decided instead to make an app that would allow users to see the large cross-over events that their favorite
characters were a part of and to find them for purchase on Amazon.com.

This project utilized express, mocha, chai, bcryptjs (for password hashing), mongoose, passport, and bodyParser.
I built an API with several endpoints that allowed for user account creation, reading, updating, and deleting (CRUD).
The API's schema included a place for a hashed password to be stored, an optional first name and last name, and an array of
'marvelousData' which would hold information needed to render users' favorite characters and the pertinent information regarding their
participation in cross-over comic book events.

SCREENSHOTS

Welcome Page/Index.html
- First screen you see, gives you option of signing up or logging in.
https://imgur.com/2f3tcAW


Register Page

-what you first see upon choosing to register/signup
https://imgur.com/wDb0AUb

-When you begin filling out the registration form...
https://imgur.com/I3yYbBk

Login Page

-When there is an error logging in:
https://imgur.com/rKuBtSL

Main Page

-what you first see when successfully logging in
https://imgur.com/tn0OdLZ

-When you begin typing in the search bar, autofill kicks in with what Marvel has to offer and you hover over selections before
clicking them
https://imgur.com/t0WEcWa

-What you get when you click a suggestion from the search bar
https://imgur.com/cUKZZLB


-what you get sent to when you click a link:
https://imgur.com/ze58ePg

Account Page
-first screen you see when clicking the 'ACCOUNT' link:
https://imgur.com/iccfNdo

-what you see when you click the 'EDIT' text on the Account page. you're given the ability to edit your first and last names:
https://imgur.com/oaMOZ7A

-a prompt upon pressing 'DELETE' to confirm your choice:
https://imgur.com/74RDDc6

-when you successfully delete an account:
https://imgur.com/0xOYPCy

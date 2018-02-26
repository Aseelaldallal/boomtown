# Boomtown


## Summary

A web app that allows registered users to list items they own, and borrow items listed from others. I built this app to gain more experience using the MERN stack. 

Boomtown allows you to:
* Create an account
* List items you're willing to lend to others
* Borrow items from other users

## Technologies

* React
* Redux
* Material UI
* Node
* Express
* MongoDB
* Passport (Authentication)
* Heroku (Backend Deployment)
* Firebase (Frontend deployment)
* Amazon S3 (Image Storage)

## Challenges

* React App Structure: This was a bit of a challenge initially. My goal was to structure the app in a way that eliminated code redundancy, and allowed for scalability.
* Authentication: This was a challenge initially because I couldn't find proper documentation on how to use passport-jwt. I looked through other people's code on github and it turned out to be quite straightforward. I actually want to do a tutorial on it to fill the gap in information.

## Improvements

This app could be significantly improved in terms of features and code. Unfortunately, I am pressed on time so I'm going to leave it as is for the forseable future.

#### Features

* Add return item button (straightforward: code goes in itemCard and itemCardList)
* Borrow item should be a request that needs to be approved by the item owner (for example, when a user clicks borrow item, an email is sent to the item owner with a borrow request."
* Token Expiry: When a user's token expires, ask them to login again.
* Authentication with Facebook and Google

#### Code

* The logic dealing with registration and logging in has a lot of redundancy. Needs to be cleaned up.
* There is a pretty obvious security bug (can you find it?). It's easy to fix (ask me)
* Lack of image validation: When the user uploads an image, I don't actually check that it is an image, and I don't check it's size. This is really bad. It needs to be implemented on both the front and backend. It's pretty straightforward to do (see similar code in Maydu, eventFUL and yelpCAMP).

## Reflection

Yes, I reflect in bullet points =)

* [Indicative](https://indicative.adonisjs.com/) is awesome for validation. 
* React is amazing. I wish I used it for my [eventFUL](https://github.com/Aseelaldallal/Event-App) and [yelpCAMP](https://github.com/Aseelaldallal/yelpcamp) apps. It really allows for scalability, and is fun to code.
* I actually enjoy authentication with passport.


## What lies ahead

* I really want to write a tutorial on passport-jwt authentication. Perhaps I create a MERN app that simply deals with registration (JWT, FB, Google, Github) and write a tutorial on it. 
* I'd like to look into redux-forms. I need some practice with forms, I find that I waste a lot of time on them because I don't have a set way of doing them. 
* Create another MERN app!


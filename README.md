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

## Future Improvements

This app could be significantly improved in terms of features and code. Unfortunately, I am pressed on time so I'm going to leave it as is for the forseable future.

# Features

* Add return item button (straightforward: code goes in itemCard and itemCardList)
* Borrow item should be a request that needs to be approved by the item owner (for example, when a user clicks borrow item, an email is sent to the item owner with a borrow request."
* Token Expiry: When a user's token expires, ask them to login again.

# Code

* The logic dealing with registration and logging in has a lot of redundancy. Needs to be cleaned up.
* There is a pretty obvious security bug (can you find it?). It's easy to fix (ask me)
* Lack of image validation: When the user uploads an image, I don't actually check that it is an image, and I don't check it's size. This is really bad. It needs to be implemented on both the front and backend. It's pretty straightforward to do (see similar code in Maydu, eventFUL and yelpCAMP).



## Reflection

-- Create MERN app that simply deals with registration: JWT, Facebook, Google, Github . Become expert in this.
-- Create MERN app that deals with forms only. The backend is simple. Practice creating dynamic forms on front end. Look into redux-forms?

# Good things?

-- Indicative library is awesome for validation

# Current Status

BUG.
ItemsCardList.... ItemsCardList from Profile and from ItemsContainer.
Need to fix.

# Left to Do

* Fix UserProfile, ItemCardList bugs -- DONE
* Implement Borrow -- DONE
* Implement Item Add -- DONE
* Implement Image Upload -- DONE
* Deploy
* Make share route only available to logged in users -- DONE
* implement 404c-- DONE
* make logo clickable -- DONE
* Add fullname, email, bio to reducer -- DONE
* Login Register Buttons -- DONE


Bonus:

* Add axios interceptors ?
* Lazy loading?


# Things to do in the future (pressed for time now)

* I never check that the user actually uploads the image, and that the image size doesn't exceed a certain size. Need to do this on both client and server. Pretty straightforward. 
* Natural Addition: Ability to return item. Straightforward (Modify goes in itemCard and itemCardList.)

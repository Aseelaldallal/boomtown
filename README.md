# Boomtown (DRAFT)


**Note:  This app is still being developed!**

**To see current version, navigate to the boomtown-backend-comm branch.**

## Summary

The purpose of this app is to allow registered users to list items they own, and borrow items listed from others.

## Technologies

* React
* Redux
* Material UI

## Challenges (Draft)

-- App Structure: Need more experience in App Design
-- Authentication: This was a headache. Started with passport local strategy. Switched to jwt strategy because needed token. After I got the flow of it though, it was straightforward.
-- I made my form dynamic, but I don't like it.
-- Bad code: RegisterForm and LoginForm -- Repetitive Code. Need cleaner structure
-- Repetitive login and register code in auth reducer. Could clean it up.
-- Didn't use axios interceptors. Should use them.
-- Right now not dealing with token expiry. Should deal with it.
-- i think i like implementing backend before front end?

## Future

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
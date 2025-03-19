# DevTinder APIs
AuthRouter
- post / signup
- post /login
- post /logout

ProfileRouter
- get profile/view
- patch/profile/edit
- patch/profile/forgot password

- get/feed -gets you the profiles on home page 

status : ignore,intrested,accepted or rejected

ConnectionRequestRouter
- post /request/send/intrested/:userid
- post /request/send/ignored/:userid
- post /request/review/accepted/:requestid
- post /request/review/rejected/:rrequestid

ConnectionRecivedRouter
- get /user/connections 
- get /requests/recived  
<h2 id="section-title">OpenVidu Basics</h2>
<hr>

OpenVidu makes the integration of videoconference capabilities into your app an easy task. The process is conceptually simple:

- **Session**: these are the virtual rooms where your users will connect to see each other. Only users connected to the same Session can see each other.
- **Stream**: when connected to a Session, users can send and receive Streams of media.
- **Publisher**: allows you to publish the Stream of a user.
- **Subscriber**: allows you to receive the Stream of other user.
- **Connection**: represents the connection of one user to one Session. Custom user info can be stored in here, and will be received by every other user in the Session (a nickname, a photo URL, ...). This way broadcasting user data is really simple.
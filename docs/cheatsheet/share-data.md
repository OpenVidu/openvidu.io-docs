# Share data between users

Whatever app you are developing, chances are you will need to pass some data for each user, at least a nickname. You can do it in two different places:

- **Client-Side**: when calling `Session.connect` method in openvidu-browser:

```javascript
session.connect(token, "USER_DATA")
    .then( ... )
    .catch( ... );
```

- **Server-Side**: when generating a token

    - [API REST](/reference-docs/REST-API#post-apitokens){:target="_blank"}: add body parameter `"data"` to the POST operation
    - [openvidu-java-client](/reference-docs/openvidu-java-client#generate-a-token){:target="_blank"}: construct TokenOptions with `TokenOptions.Builder().data("USER_DATA").build()`
    - [openvidu-node-client](/reference-docs/openvidu-node-client#generate-a-token){:target="_blank"}: construct TokenOptions with `{data: "USER_DATA"}` <br><br>

The result will be that in all clients, *Connection* objects will have in their *data* property the pertinent value you have provided for each user. So, an easy way to get the data associated to any user would be:

```javascript
session.on("streamCreated", function (event) {
    session.subscribe(event.stream, "subscriber");
    console.log("USER DATA: " + event.stream.connection.data);
});
```

<br>
Some clarifications:

- Using only first option is not secure, as clients could modify the value of the second parameter. It is intended for development environments or non critical data. If you want total control over shared data, please use the server-side way.
- *Connection.data* will be a simple string if you have provided data only with one of the methods, and will be a string with the following format if you provide data both from openvidu-browser and your backend: `"CLIENT_SIDE_DATA%/%SERVER_SIDE_DATA"` (both separated by string `%/%`).
- You can choose whatever format you like for the data string, but if you are planning to share more than a simple field, maybe a standard format as JSON would be a wise choice. Method `Session.connect` in Openvidu Browser directly admits as data parameter a standard object (it will be finally stringified).

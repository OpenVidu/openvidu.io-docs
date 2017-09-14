# Share data between users

Whatever app you are developing, chances are you will need to pass some data for each user, at least a nickname. You can do it in two different places:

- **openvidu-browser**: when calling `session.connect` method

        session.connect(token, DATA, function (error) { ... });


- **API REST**: when asking for a token to */api/tokens*, you can pass data as third parameter in the BODY of the POST request 

        {“session”: “sessionId”, “role”: “role”, “data”: "DATA"}


> Java and Node clients ([openvidu-java-client](/reference-docs/openvidu-java-client#tokenoptionsbuilder) and [openvidu-node-client](/reference-docs/openvidu-node-client#tokenoptionsbuilder)) allow you to pass data when creating a Token object: </br>
> `tokenOptions = new TokenOptions.Builder().data("DATA").build();`

The result will be that in all clients, *Connection* objects will have in their *data* property the pertinent value you have provided for each user. So, an easy way to get the data associated to any user would be:

```javascript
session.on('streamCreated', function (event) {
    session.subscribe(event.stream, 'subscriber');
    console.log('USER DATA: ' + event.stream.connection.data);
});
```

Some clarifications:

- *Connection.data* will be a simple string if you have provided data only with one of the methods, and will be a string with the following format if you provide data both from openvidu-browser and your backend: "OPENVIDUBROWSER_DATA%/%APIREST_DATA" 

- Using only first option is not secure, as clients could modify the value of the second parameter. It is intended only in development environments. If you want total control over shared data, please use the second way.
- You can choose whatever format you like for the data string, but if you are planning to share more than a simple field, maybe a standard format as JSON would be a wise choice.

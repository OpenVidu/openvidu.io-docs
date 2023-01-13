## User Authentication

Authentication is a common topic in web applications. Let's briefly explain here the different alternatives to include it in your OpenVidu server application.

If your app has already implemented user authentication, you can simply check the user's credentials in your server application and use them to control who is able to initialize Session and Connection objects.

However, if your server application does not have any user authentication yet and you are thinking about adding it, there are different strategies you can follow. The most common are:

1. [Basic authentication](#basic-authentication)
2. [Cookie-based authentication](#cookie-based-authentication)
3. [Token-based authentication](#token-based-authentication)
4. [OAuth 2.0](#oauth-20)
5. [OpenID Connect](#openid-connect)
6. [SAML](#saml)

#### Basic authentication

This is a simple authentication method that uses a username and a password. The client application will send the credentials encoded with Base64 in the Authorization header with `Basic` prefix as stated below:

```bash
Authorization: 'Basic' + encodedUsingBase64('username':'password')
```

This credentials will be validated by the server, which stores the usernames and passwords in a database.

#### Cookie-based authentication

This is one of the most common ways to implement user authentication in web applications. The server application will create a session ID and store it (statefully) in a cookie and return it to the client-side via a cookie header. This cookie will be sent in every subsequent request to the server, which will be able to identify the user by reading the cookie. On logout the cookie will be deleted from both client cookie store and server.

> Note that this is a stateful authentication method, so the server will need to store the session ID in a database or in-memory cache. This is not a problem for small applications, but it can be a problem for large applications with many users.

#### Token-based authentication

This is a **more modern way** to implement user authentication in web applications. It is gaining popularity because of the **SPA** (Single Page Application) trend and **stateless REST APIs** applications.

There are many different ways to implement token-based authentication. The most popular is the [**JWT** (JSON Web Token)](https://jwt.io/introduction){:target="_blank"} authentication. Receiving the credentials from the client, the server will validate them and return a signed JWT token which contains user information.

Contrary to the Cookie-based method, this token will never be stored in the server side. The client stores the token in the browser's local storage and sends it in every request to the server. The server will simply validate the token, granting access to the user.

> Note that this authentication method is **stateless**. This means that the server will not store any information about the user. This is a good thing because it will scale better and will be more secure. However, it also means that the server will not be able to revoke the token. If the token is stolen, the only way to revoke it is to change the secret key used to sign the token.

#### OAuth 2.0

[OAuth 2.0](https://oauth.net/2/){:target="_blank"} is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service, such as Facebook, Google, GitHub, Apple, etc. It works by delegating user authentication to the service that hosts the user account, and authorizing third-party applications to access the user account. OAuth 2.0 provides authorization flows for web, mobile and desktop applications.

> Note that OAuth 2.0 is an authorization protocol that delegates user authentication to the service that hosts the user account. Your server application will be communicating with these third-party services to provide authentication.

#### OpenID Connect

[OpenID Connect](https://openid.net/connect/){:target="_blank"} is an authentication layer on top of OAuth 2.0. It is a simple identity layer on top of the OAuth 2.0 protocol, which allows Clients to verify the identity of the End-User based on the authentication performed by an Authorization Server, as well as to obtain basic profile information about the End-User in an interoperable and REST-like manner.

> Note that OpenID Connect, just as OAuth 2.0, is an authorization protocol that delegates user authentication to the service that hosts the user account. Your server application will be communicating with these third-party services to provide authentication.

#### SAML

SAML (Security Assertion Markup Language) uses the same Identity provider used by OpenID Connect and OAuth 2.0, but it is XML-based. SAML is an open standard for exchanging authentication and authorization data between security domains and it is maintained by the Organization for the Advancement of Structured Information Standards (OASIS).

Some SAML providers that can be found in the industry are:

- [Okta](https://www.okta.com/){:target="_blank"}
- [OneLogin](https://www.onelogin.com/){:target="_blank"}
- [Auth0](https://auth0.com/){:target="_blank"}
- [Azure Active Directory](https://azure.microsoft.com/en-us/services/active-directory/){:target="_blank"}
- [Google Cloud Identity](https://cloud.google.com/identity-platform/){:target="_blank"}
- [AWS Cognito](https://aws.amazon.com/cognito/){:target="_blank"}

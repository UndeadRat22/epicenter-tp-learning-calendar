# Backend 
## Setup
1. Get visual studio
2. Open the solution
3. Right click on the Epicenter.Api
4. Select Manage client secrets
5. Paste in (ofcourse with actual credentials):
```json
{
  "EmailSettings": {
    "Email": "EMAIL_GOES_HERE",
    "Password": "PASSWORD_GOES_HERE"
  }
}
```
6. Save, run, everything should work out of the box.

## Possible problem resolutions
If you encounter any problems running the project, the possible solutions might be these:
1. Update your dotnet version
2. Get the latest SQLServer installation

## Logging in
1. On the first run you will have to call POST `apiurl/api/authentication/admin` without any credentials. This creates a user:
   ```json
    {
        "email": "test@test.com",
        "password": "password"
    }
   ```
2. Using the said user, you can now log in using POST `apiurl/api/authentication/login` where the body of your request looks like 
    ```json
    {
        "email": "test@test.com",
        "password": "password"
    }
   ```
   In response to this the server returns a JSON like this (the token is a jwt token):
   ```json
   {
       "token": "token_value"
   }
   ```
3. Now you can use the said token in your request headers. For the header key use "Authorization", for the value "Bearer{this is supposed to be a new line}token_value".
4. You can test this by calling `apiurl/api/employee/`, or other endpoints that require auth. You can also see these endpoints in swagger under `apiurl`

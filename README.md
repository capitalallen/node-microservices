## Kubernetes
### app Deployment and Service 

### GCP Kuberentes &  Skaffold config 
- make GCP kuberentes show up in docker desktop 

    ```gcloud container clusters get-credentials```


## Auth Microservice 

### Middlewares 
#### requeire-auth
- reject the request if the user is not logged in 
#### current-user
- extract the JWT payload and set it on 'req.currentUser'
#### error-handler
- use custom errors 
#### validate-request

### routes 
#### current-user
#### signin
#### singout
#### signup 

### models 
#### user

### Errors 
#### not-authorized-error 
- extends CustomError 

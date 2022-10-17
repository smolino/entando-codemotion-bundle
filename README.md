# entando-codemotion-bundle
A simple CRUD application, composed of a MFE (React), a config MFE (React) and a MS (Spring-Boot)

## How to run the bundle locally
You can run the bundle locally with the following commands:

```
# Start local development dependencies
ent bundle svc start --all
# Start bundle components locally
ent bundle run --all
```

## How to publish the bundle on a Docker registry
Publish the bundle with the following command:

```
# This will include pack
ent bundle publish 
```

## How to deploy the bundle
Deploy the bundle with the following command:

```
ent bundle deploy
```

- After installing the bundle, remember to add the `user-service-role` role to the user used for the test, importing it from the `user-service` client in Keycloak
- Create a page in AppBuilder and drag `User Widget` to the page, edit widget configuration parameters and display the page
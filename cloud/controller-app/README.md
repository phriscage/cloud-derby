# Controller App - Development
This documentation provides details for how to develop, build, and deploy new versions of the Controller App.

* [Develop](#develop)
  * [Setup Backend API](#setup_backend)
  * [Setup Local Environment](#setup_local)
  * [Setup Kubernetes Environment](#setup_kubernetes)
* [Build](#build)
* [Deployment](#deployment)


## <a name="develop">develop</a>
You can develop locally via NPM/Node or in a Kubernetes environment:

### <a name="setup_backend">Setup Backend API</a>
Controller REST API setup is a dependency for the Controller App if you do not plan to use mock data or do not have an existing Controller REST API endpoint URL.

    TBD

### <a name="setup_local">Setup Local Environment</a>
These instructions are to run the application Node modules in a local NPM environment that is not optimized for production. _Node ~= 10.15 is required._

Verify Node ~= 10.15 is installed:

    node --version

Project setup:

    npm install

You can choose to use mock API data or point to a Controller REST API endpoint in the applicaiton settings page. The *VUE_APP_APICLIENT* environment variable will dynamically load between the two options.

Using API client data that is mocked:

    npm run serve

or Using API client data from an endpoint URL:

    VUE_APP_APICLIENT=server npm run serve

Point your browser to http://localhost:8080


### <a name="setup_kubernetes">Setup Kubernetes</a>
These instructions to setup a k8s environment are via the [minikube](https://kubernetes.io/docs/setup/minikube/). You can also setup via the GKE via *gcloud* SDK CLI or GCP *console*.
The k8s environment is only for development and testing using [Skaffold](https://github.com/GoogleContainerTools/skaffold)

Start minikube:

    minikube start

Run the Skaffold in dev for the Controller App:

    skaffold dev

Capture the Controller App LB service URL:

    export GATEWAY_URL=`minikube service --url=true controller-app-lb`; echo $GATEWAY_URL

Point your browser to $GATEWAY_URL


## <a name="build">Build</a>
Build the application with [Skaffold](https://github.com/GoogleContainerTools/skaffold).

export a TAG environment variable and run the `skaffold run -t <TAG>` command.

    export TAG=dev

Build the image with the TAG:

    skaffold run -t $TAG


## <a name="deployment">Deployment</a>:
Deploy the application with [Skaffold](https://github.com/GoogleContainerTools/skaffold).

Set the default GCR project repository:

    skaffold config set default-repo gcr.io/${GCP_PROJECT_NAME}


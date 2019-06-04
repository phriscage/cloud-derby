# Controller App - Development
This documentation provides details for how to develop, build, and deploy new versions of the Controller App. There are a few different deployment options for you to choose based on developer pererence and/or environment.

* [Prerequisites](#prereqs)
  * [Setup Backend API](#setup_backend)
* [Develop](#develop)
  * [Setup Node](#setup_node)
  * [Setup Minikube](#setup_minikube)
* [Build and Deploy](#build_and_deploy)
  * [Deploy Cloud Run](#deploy_cloud_run)
  * [Deploy Cloud Storage](#deploy_cloud_storage)
  * [Deploy App Engine](#deploy_app_engine)
  * [Deploy Kubernetes](#deploy_kubernetes)


## <a name="prereqs">Prerequisites</a>
These are the prerequisites for the Controller App Development


### <a name="setup_backend">Setup Backend API</a>
Controller REST API setup is a dependency for the Controller App if you do not plan to use mock data or do not have an existing Controller REST API endpoint URL.

    TBD


## <a name="develop">Develop</a>
You can develop the Controller App either locally or in the cloud. [NodeJS](https://nodejs.org/en/) can run in a stand-alone mode for development or in a [Kubernetes](https://kubernetes.io/) environment. Stand-alone [Setup Node](#setup_node) is typically frictionless and the _preferred_ method.


### <a name="setup_node">Setup Node</a>
These instructions are to run the application Node modules in a stand-alone [NPM](https://www.npmjs.com/) environment that is not optimized for production. This can be locally on your laptop or via cloud VM environment _Node ~= 10.15 is required._

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


### <a name="setup_minikube">Setup Minikube</a>
These instructions to setup a local k8s environment via the [minikube](https://kubernetes.io/docs/setup/minikube/). You can also setup a cloud k8s environment via the GKE via *gcloud* SDK CLI or GCP *console*. [Skaffold](https://github.com/GoogleContainerTools/skaffold) will reload for every file change in the directory. This can become a painful and long developer experience so is typcially not recommended.

Start minikube:

    minikube start

Run the Skaffold in dev for the Controller App:

    skaffold dev

Capture the Controller App LB service URL:

    export GATEWAY_URL=`minikube service --url=true controller-app-lb`; echo $GATEWAY_URL

Point your browser to $GATEWAY_URL


## <a name="build_and_deploy">Build and Deploy</a>
You can build and deploy via various methods below based off developer preference and/or environment. These are the options available:

  * [Google Cloud Run](https://cloud.google.com/run/) via [gcloud](https://cloud.google.com/sdk/)
  * [Google Cloud Storage](https://cloud.google.com/storage) via [gsutil](https://cloud.google.com/storage/docs/gsutil),
  * [Google Cloud App Engine](https://cloud.google.com/appengine/) via [Deployment Manager](https://cloud.google.com/deployment-manager/) and gcloud - TODO
  * [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/) via [Skaffold](https://github.com/GoogleContainerTools/skaffold).

[Deploy Cloud Run](#deploy_cloud_run) is the _preferred_ method to quickly host the Controller App content and generate a unique URL for consumption.

There are some environment variables that need to be set for all build and deployment options.

Export the GCP Project ID as *PROJECT_ID* environment variable:

    export PROJECT_ID=`gcloud config get-value project`;

Export the image/build *TAG* environment variable:

    export TAG=dev;


### <a name="deploy_cloud_run">Deploy Cloud Run</a>
Deploy with Cloud Run allows stateless HTTP containers on a fully managed environment or GKE cluster. [Cloud Build](https://cloud.google.com/run/docs/quickstarts/build-and-deploy#containerizing) packages the Docker image into your Google Container repository.
_Cloud Run and Cloud Build APIs will need to be enabled in your GCP project._

Build with Cloud Build and TAG:

    gcloud builds submit --tag gcr.io/${PROJECT_ID}/controller-app:${TAG}

Deploy with Cloud Run Beta:

    gcloud beta run deploy controller-app \
      --image gcr.io/${PROJECT_ID}/controller-app:${TAG} \
      --region=us-central1 \
      --allow-unauthenticated

Open the app URL in your browser. You can return the FQDN via:

    gcloud beta run services describe controller-app --format="value(status.domain)"


### <a name="deploy_cloud_storage">Deploy Cloud Storage</a>
Deploy the application with Google Cloud Storage via gsutil. Cloud Storage is a create service to provide geo-graphically distributed static content. You can follow [this](https://cloud.google.com/storage/docs/hosting-static-website) documentation that outlines using a custom domain, but Storage buckets are also accessible via [APIs](https://storage.googleapis.com). Below is the 2nd option if custom domain is not available:

Build the image with the `npm run build` command:

    npm run build

You will now have all the static files created in the [dist](./dist) directory.

Export an unique storage bucket name:

    export BUCKET_NAME=controller-app-demo

Create the bucket via `gsutil mb gs://${BUCKET_NAME}`:

    gsutil mb gs://${BUCKET_NAME}

Upload all the [dist](./dist) files with pulic read writes:

    gsutil cp -r -a public-read dist/* gs://${BUCKET_NAME}/

Open your browser to [https://storage.googleapis.com](https://storage.googleapis.com)

    https://storage.googleapis.com/${BUCKET_NAME}/index.html


### <a name="deploy_app_engine">Deploy App Engine</a>
TBD

### <a name="deploy_kubernetes">Deploy Kubernetes</a>
These instructions are to build and deploy in a k8s environment via Skaffold.

Set the default GCR project repository:

    skaffold config set default-repo gcr.io/${PROJECT_ID}

Build the image with the `skaffold run -t <TAG>` command:

    skaffold run -t $TAG

TBD

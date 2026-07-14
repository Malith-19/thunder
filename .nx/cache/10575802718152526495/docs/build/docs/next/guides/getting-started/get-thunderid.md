# Get started

# Get ThunderID

ThunderID is available in multiple formats to suit your deployment needs. Choose the option that works best for you.


**Release Artifact**


Get the latest release of ThunderID and run it locally on your machine.

## Prerequisites

- Your operating system and architecture (macOS, Linux, or Windows)
- Terminal or command prompt access


## Download the Distribution

Download the latest release from the <a href="/docs/next/releases/" target="_blank">releases page</a>.

## Extract the Archive

Unzip the downloaded file:

```bash
unzip thunderid-<version>-<os>-<arch>.zip
```

Navigate to the extracted directory:

```bash
cd thunderid-<version>-<os>-<arch>/
```

## Setup ThunderID

Initialize ThunderID with the default configurations and data before starting the server for the first time.


**Linux / macOS**


```bash
./setup.sh
```


**Windows**


```powershell
.\setup.ps1
```


## Start ThunderID

Launch the ThunderID server:


**Linux / macOS**


```bash
./start.sh
```


**Windows**


```powershell
.\start.ps1
```


:::tip Success
Access ThunderID on **https://localhost:8090/console**
:::


**Docker Compose**


The quickest way to get ThunderID up and running with all dependencies configured.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Terminal or command prompt access


## Start ThunderID

Run the following command to start ThunderID using Docker Compose:

```bash
docker compose -f oci://ghcr.io/thunder-id/thunderid-quick-start:latest up
```

> **Note**
>
> This command will automatically:
> - Initialize the database
> - Run the setup process
> - Start the ThunderID server


:::tip Success
Access ThunderID on **https://localhost:8090/console**
:::


**Helm**


Deploy ThunderID on Kubernetes with PostgreSQL using Helm charts.

## Prerequisites

- A running Kubernetes cluster ([minikube](https://kubernetes.io/docs/tasks/tools/#minikube) or [kind](https://kind.sigs.k8s.io/) for local development)
- [Helm](https://helm.sh/docs/intro/install/) and [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) installed
- Terminal or command prompt access


## Set Up the Database

Install PostgreSQL using the [Bitnami Helm chart](https://bitnami.com/stacks/postgresql):

```bash
helm install postgresql oci://registry-1.docker.io/bitnamicharts/postgresql \
  --set auth.username=dbuser \
  --set auth.password=dbpassword \
  --set auth.postgresPassword=dbpassword \
  --set-file primary.initdb.scripts.setup\\.sql=<(cat <<'SQL'
CREATE DATABASE configdb;
CREATE DATABASE runtimedb;
CREATE DATABASE userdb;
CREATE DATABASE consentdb;
GRANT ALL PRIVILEGES ON DATABASE configdb TO dbuser;
GRANT ALL PRIVILEGES ON DATABASE runtimedb TO dbuser;
GRANT ALL PRIVILEGES ON DATABASE userdb TO dbuser;
GRANT ALL PRIVILEGES ON DATABASE consentdb TO dbuser;
SQL
)
```

Wait for PostgreSQL to be ready:

```bash
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=postgresql --timeout=120s
```

Apply the database schemas:

```bash
kubectl run thunderid-dbinit --image=ghcr.io/thunder-id/thunderid:latest --restart=Never --command -- sleep 300
kubectl wait --for=condition=ready pod/thunderid-dbinit --timeout=60s
for db in configdb runtimedb userdb; do
  kubectl exec thunderid-dbinit -- cat /opt/thunderid/dbscripts/$db/postgres.sql | \
    kubectl exec -i postgresql-0 -- env PGPASSWORD=dbpassword psql -U dbuser -d $db
done
kubectl exec thunderid-dbinit -- cat /opt/thunderid/consent/dbscripts/db_schema_postgres.sql | \
  kubectl exec -i postgresql-0 -- env PGPASSWORD=dbpassword psql -U dbuser -d consentdb
kubectl delete pod thunderid-dbinit
```

## Install ThunderID

Install ThunderID using the [ThunderID Helm chart](https://github.com/orgs/thunder-id/packages/container/package/helm-charts%2Fthunderid):

```bash
helm install thunderid oci://ghcr.io/thunder-id/helm-charts/thunderid \
  --set configuration.database.config.postgres.hostname=postgresql \
  --set configuration.database.config.postgres.sslmode=disable \
  --set configuration.database.runtime.postgres.hostname=postgresql \
  --set configuration.database.runtime.postgres.sslmode=disable \
  --set configuration.database.user.postgres.hostname=postgresql \
  --set configuration.database.user.postgres.sslmode=disable \
  --set configuration.consent.database.host=postgresql \
  --set configuration.consent.database.sslmode=disable \
  --set configuration.server.publicUrl=https://localhost:8090 \
  --set configuration.gateClient.hostname=localhost \
  --set configuration.gateClient.port=8090
```

Wait for ThunderID to be ready:

```bash
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=thunderid --timeout=120s
```

## Access ThunderID

Forward the service port to your local machine:

```bash
kubectl port-forward svc/thunderid-service 8090:8090
```

:::tip Success
Access ThunderID on **https://localhost:8090/console**
:::


## What's Next

ThunderID is running. The next step is registering your application.


  - [Register an Application](https://thunderid.dev/docs/next/guides/getting-started/register-an-application.md) — Create your first application in ThunderID and get your Client ID.
